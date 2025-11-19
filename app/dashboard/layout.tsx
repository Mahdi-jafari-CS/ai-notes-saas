import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNavbar />
      <div className="pt-16">{children}</div>
    </>
  );
}
