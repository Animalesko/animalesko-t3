import { env } from "~/env";
import { OpenPixService } from "~/utils/openpix/openpix-service";

const main = async ({ url }: { url: string }) => {
  const webhook = await OpenPixService.createWebhook({
    url,
    authorization: env.OPEN_PIX_WEBHOOK_AUTHORIZATION_TOKEN,
    event: "OPENPIX:CHARGE_COMPLETED",
    isActive: true,
    name: "charge completed webhook",
  });

  const webhooks = await OpenPixService.listWebhooks();

  console.log(JSON.stringify(webhooks, null, 2));
};

main({ url: String(process.argv[2]) }).catch(console.error);
