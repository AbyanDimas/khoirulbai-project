import { NextRequest, NextResponse } from "next/server";

const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;
const STRAPI_API_URL = process.env.STRAPI_API_URL;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const { search } = request.nextUrl;

  const strapiPath = path.join("/");

  const isUpload = strapiPath.startsWith("uploads/");
  const fetchUrl = isUpload
    ? `${STRAPI_BASE_URL}${strapiPath}`
    : `${STRAPI_API_URL}${strapiPath}`;

  try {
    const response = await fetch(`${fetchUrl}${search}`, {
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    const buffer = await response.arrayBuffer();
    const headers = new Headers(response.headers);
    headers.set("Content-Type", contentType || "application/octet-stream");

    return new NextResponse(buffer, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in proxy route:", error.message);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
