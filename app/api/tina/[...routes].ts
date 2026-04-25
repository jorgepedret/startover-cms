import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import databaseClient from "../../../tina/database";

const handler = TinaNodeBackend({
  authProvider: LocalBackendAuthProvider(),
  databaseClient,
});

export async function GET(req: Request) {
  return handler(req);
}

export async function POST(req: Request) {
  return handler(req);
}
