import { NextResponse } from 'next/server';
import { signupSchema } from '@/lib/schemas-server';
import { createUser } from '@/auth'; // You'll need to implement this function

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = signupSchema.parse(body);

    // Create the user (implement this function based on your auth setup)
    await createUser(validatedData.email, validatedData.password);

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 400 });
  }
}