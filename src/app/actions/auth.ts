'use server'

import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  if (email === 'admin@musafly.com' && password === 'admin1234') {
    const cookieStore = await cookies()
    cookieStore.set('auth_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })
    return { success: true }
  }

  return { success: false, error: 'ইমেইল অথবা পাসওয়ার্ড ভুল!' }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('auth_token')
}
