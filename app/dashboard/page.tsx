// app/dashboard/page.tsx
import { currentUser } from '@clerk/nextjs/server'
import { syncUserToDatabase, getUserFromDatabase } from '@/lib/user-actions'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const clerkUser = await currentUser()
  
  if (!clerkUser) {
    redirect('/sign-in')
  }

  // Sync user to our database
  const dbUser = await syncUserToDatabase(
    clerkUser.id,
    clerkUser.emailAddresses[0].emailAddress,
    `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim()
  )

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome to AI Notes Generator!</h1>
      <p>Hello, {dbUser.name || dbUser.email}!</p>
      <p>Your account is ready. Start creating AI-powered notes!</p>
    </div>
  )
}