import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
import { env } from "~/env";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream } from "fs";
import formidable from "formidable";

interface uploadProps {
  prisma: PrismaClient;
  s3Client: S3Client;

  file: formidable.File;
}

export const upload = async ({ file, prisma, s3Client }: uploadProps) => {
  const fileId = v4();

  const fileStream = createReadStream(file.filepath);

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: fileId,
      Body: fileStream,
    },
  });

  await upload.done();

  return await prisma.image.create({
    data: { id: fileId },
  });
};
