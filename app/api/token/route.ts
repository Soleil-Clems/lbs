// app/api/token/route.ts

import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const token = await getToken({ req, raw: true })

  return NextResponse.json({ token })
}
