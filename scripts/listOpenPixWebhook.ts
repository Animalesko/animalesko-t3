import { OpenPixService } from "~/utils/openpix/openpix-service";

const main = async () => {
  const webhooks = await OpenPixService.listWebhooks();

  console.log(JSON.stringify(webhooks, null, 2));
};

main().catch(console.error);
