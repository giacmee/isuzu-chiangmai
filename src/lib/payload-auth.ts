import { headers as getNextHeaders } from "next/headers";
import config from "@payload-config";
import { getPayload } from "payload";

export async function getPayloadClient() {
  return getPayload({ config });
}

export async function getCurrentAdminUser(reqHeaders?: Headers) {
  const payload = await getPayloadClient();
  const resolvedHeaders = reqHeaders ?? (await getNextHeaders());
  const { user } = await payload.auth({ headers: resolvedHeaders });
  return user ?? null;
}
