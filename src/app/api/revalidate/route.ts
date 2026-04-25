import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body?.tag) {
    return Response.json({ error: "Missing tag" }, { status: 400 });
  }

  revalidateTag(body.tag, "default");

  return Response.json({ revalidated: true });
}
