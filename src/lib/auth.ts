import { cookies } from "next/headers";
import { verifyRefreshToken } from "./jwt";
import { AuthPayload } from "@/types/auth";

export async function getAuth(): Promise<{ id: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;

  if (!token) throw new Error("Unauthenticated");

  const payload = verifyRefreshToken(token) as AuthPayload;

  return { id: payload.id };
}
