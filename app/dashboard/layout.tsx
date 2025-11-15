// app/dashboard/layout.tsx
// import { DashboardNavbar } from '@/components/DashboardNavbar'
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar'
import { Pointer } from '@/components/ui/pointer'
// import { Pointer } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Pointer />
      <DashboardNavbar />
      <div className="pt-16"> {/* Offset for fixed navbar */}
        {children}
      </div>
    </>
  )
}