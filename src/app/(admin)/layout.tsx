import Sidebar from "./_components/AppSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Sidebar />
        <main className="md:ml-[260px] transition-all duration-300">
          {children}
        </main>
      </body>
    </html>
  );
}