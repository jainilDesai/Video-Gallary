import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const authParas = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
    });

    return Response.json({
      ...authParas,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });
  } catch {
    // error handling

    return Response.json(
      {
        error: "Authentication for imagekit failed",
      },
      {
        status: 500,
      }
    );
  }
}
