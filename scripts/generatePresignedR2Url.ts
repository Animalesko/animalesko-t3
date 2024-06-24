import { generateUploadUrl } from "~/use-cases/r2/generate-upload-url";

const main = async () => {
  const { url } = await generateUploadUrl();
  console.log(url);
};

main().catch(console.error);
