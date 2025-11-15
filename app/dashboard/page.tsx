
import DashboardClient from '@/components/dashboard/DashboardClient'

export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <UserWelcome /> */}
      <DashboardClient />
    </div>
  )
}