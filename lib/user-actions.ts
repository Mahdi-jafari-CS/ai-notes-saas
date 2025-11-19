import { prisma } from '@/lib/db'

export async function syncUserToDatabase(clerkUserId: string, email: string, name?: string) {
  try {
    const user = await prisma.user.upsert({
      where: { clerkUserId },
      update: {
        email,
        name: name || '', // Ensure name is never null
      },
      create: {
        clerkUserId,
        email,
        name: name || '',
      },
    })
    return user
  } catch (error) {
  
    throw new Error('Failed to sync user to database')
  }
}

export async function getUserFromDatabase(clerkUserId: string) {
  try {
    return await prisma.user.findUnique({
      where: { clerkUserId }
    })
  } catch (error) {

    throw new Error('Failed to fetch user from database')
  }
}

// Optional: Add this function for getting user with notes
export async function getUserWithNotes(clerkUserId: string) {
  try {
    return await prisma.user.findUnique({
      where: { clerkUserId },
      include: {
        notes: {
          orderBy: { createdAt: 'desc' },
          take: 10 // Limit to recent notes
        }
      }
    })
  } catch (error) {
  
    throw new Error('Failed to fetch user notes')
  }
}