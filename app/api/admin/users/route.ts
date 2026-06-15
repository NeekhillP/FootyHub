import { NextResponse } from 'next/server'
import { getAdminUser } from '@/lib/auth/get-user'

export async function GET() {
  const { user } = await getAdminUser('GET /api/admin/users')
  if (!user) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json({ success: true, message: 'Placeholder API' })
}
