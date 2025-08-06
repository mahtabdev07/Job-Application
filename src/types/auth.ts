export type AuthPayload = {
  id: string;
  email?: string;
  role?: "EMPLOYER" | "CANDIDATE";
};
