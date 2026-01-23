import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { MockDashboardService } from "@/infrastructure/services/MockDashboardService";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, we would verify the session here too, or via middleware (which we have)
  // For the UI mock, we fetch the user data from our mock service to populate the Header
  const service = new MockDashboardService();
  const data = await service.getDashboardData();

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <Header user={data.user} />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
