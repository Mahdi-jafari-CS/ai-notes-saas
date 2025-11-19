import { currentUser } from '@clerk/nextjs/server'
import { syncUserToDatabase } from '@/lib/user-actions'

export default async function UserWelcome() {
  const clerkUser = await currentUser()
  
  if (!clerkUser) {
    return null
  }

  const dbUser = await syncUserToDatabase(
    clerkUser.id,
    clerkUser.emailAddresses[0].emailAddress,
    `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim()
  )

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b dark:border-gray-800">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome to AI Notes Generator!</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">Hello, {dbUser.name || dbUser.email}!</p>
      <p className="text-gray-500 dark:text-gray-400">Your account is ready. Start creating AI-powered notes!</p>
    </div>
  )
}