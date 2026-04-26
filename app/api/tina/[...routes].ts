import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import databaseClient from "../../../tina/database";

const handler = TinaNodeBackend({
  authProvider: LocalBackendAuthProvider(),
  databaseClient,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: Request, ctx: any) {
  return handler(req, ctx);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: Request, ctx: any) {
  return handler(req, ctx);
}
