
import { NextResponse } from "next/server";
import type { PasswordInput, PasswordResponse } from "@/types/password";

export async function POST(req: Request) {
  const { password }: PasswordInput = await req.json();

  const response = await fetch("https://ems-royal-password-checker-tm02.hf.space/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "API call failed" }, { status: 500 });
  }

  const data: PasswordResponse = await response.json();
  return NextResponse.json(data);
}
