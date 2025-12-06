import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = "http://202.65.116.9:1337/api/";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await context.params;
  const { path } = resolvedParams;
  const { search } = request.nextUrl;

  try {
    const response = await fetch(`${STRAPI_URL}${path.join("/")}${search}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
