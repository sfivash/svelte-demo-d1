import { binding } from "cf-bindings-proxy";
import type { D1Database } from "@cloudflare/workers-types";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async function ({ request, platform }) {
  const db = binding<D1Database>("DB", { fallback: platform?.env! });
  let result = await db.prepare("SELECT * FROM users LIMIT 5").run();
  return new Response(JSON.stringify(result));
};
