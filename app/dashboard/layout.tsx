import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { MockDashboardService } from "@/infrastructure/services/MockDashboardService";
import { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <Suspense fallback={<div className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-background-dark/50" />}>
          <DashboardHeader />
        </Suspense>
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

async function DashboardHeader() {
  const service = new MockDashboardService();
  const data = await service.getDashboardData();
  return <Header user={data.user} />;
}
