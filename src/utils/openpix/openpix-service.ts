import axios from "axios";
import { CreateChargeInput, CreateChargeOutput } from "./create-charge";
import { env } from "~/env";
import { CreateWebhookInput, CreateWebhookOutput } from "./create-webhook";
import { DeleteWebhookInput, DeleteWebhookOutput } from "./delete-webhook";
import { ListWebhooksOutput } from "./listWebhooks";

export class OpenPixService {
  static async createCharge(data: CreateChargeInput) {
    const response = await axios.post<CreateChargeOutput>(
      "https://api.openpix.com.br/api/v1/charge",
      {
        ...data,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: env.OPEN_PIX_TOKEN,
        },
      },
    );

    return response.data;
  }

  static async createWebhook(data: CreateWebhookInput) {
    const response = await axios.post<CreateWebhookOutput>(
      "https://api.openpix.com.br/api/v1/webhook",
      {
        ...data,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: env.OPEN_PIX_TOKEN,
        },
      },
    );

    return response.data;
  }

  static async deleteWebhook(data: DeleteWebhookInput) {
    const response = await axios.delete<DeleteWebhookOutput>(
      `https://api.openpix.com.br/api/v1/webhook/${data.id}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: env.OPEN_PIX_TOKEN,
        },
      },
    );

    return response.data;
  }

  static async listWebhooks() {
    const response = await axios.get<ListWebhooksOutput>(
      `https://api.openpix.com.br/api/v1/webhook`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: env.OPEN_PIX_TOKEN,
        },
      },
    );

    return response.data;
  }
}
