import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full max-w-full h-screen overflow-hidden">
        <div className="hidden md:block">
          <TopBar />
        </div>
        <main className="flex-1 p-4 mt-16 md:mt-0 md:p-6 lg:p-8 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
