import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks.repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    if (!comment) {
      throw new Error("Comment is required");
    }

    if (!type) {
      throw new Error("Type is required.");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "New feedback",
      body: [
        `<div style="font-family:sans-serif; font-size: 16px; color: #111">`,
        `<p>Feedback type: ${type}</p>`,
        `<p>Comment: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" style="width:500px; height:auto; object-fit:cover;" alt="" />` : null,
        `</div>`,
      ].join("\n"),
    });
  }
}
