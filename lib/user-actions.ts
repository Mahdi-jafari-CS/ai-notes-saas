
import { prisma } from '@/lib/db'

export async function syncUserToDatabase(clerkUserId: string, email: string, name?: string) {
  try {
    const user = await prisma.user.upsert({
      where: { clerkUserId },
      update: {
        email,
        name,
      },
      create: {
        clerkUserId,
        email,
        name: name || '',
      },
    })
    return user
  } catch (error) {
    console.error('Error syncing user to database:', error)
    throw error
  }
}

export async function getUserFromDatabase(clerkUserId: string) {
  return await prisma.user.findUnique({
    where: { clerkUserId }
  })
}