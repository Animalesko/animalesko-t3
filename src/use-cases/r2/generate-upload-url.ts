import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 } from "uuid";
import { env } from "~/env";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const generateUploadUrl = async () => {
  const fileId = v4();

  const client = new S3Client({
    region: env.CLOUDFLARE_R2_REGION,
    credentials: {
      accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID,
      secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
    endpoint: `https://${env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  });

  const command = new PutObjectCommand({
    Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: fileId,
    ACL: "public-read-write",
  });

  const preSignedUrl = await getSignedUrl(client, command, { expiresIn: 600 });

  return { url: preSignedUrl, id: fileId };
};
