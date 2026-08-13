import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0f1115]">
      <Sidebar />
      <main className="flex-1 p-4 mt-16 md:mt-0 md:p-8 lg:p-12 overflow-y-auto w-full max-w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
