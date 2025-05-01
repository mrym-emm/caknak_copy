import { NextResponse } from "next/server";
import type { PasswordInput, PasswordResponse } from "@/types/password";

export async function POST(req: Request) {
  const { password }: PasswordInput = await req.json();

  try {
    const res = await fetch("https://ems-royal-password-checker-tm02.hf.space/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "API request failed" }, { status: 500 });
    }

    const json: PasswordResponse = await res.json();
    return NextResponse.json(json);
  } catch (_err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
