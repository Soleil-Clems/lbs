// app/api/register/route.ts

import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()
  const { email, name, password } = body

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  const hashedPassword = await hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })

  return NextResponse.json({ message: 'User created' }, { status: 201 })
}
