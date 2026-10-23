import Footer from "@/common/components/Footer";
import Header from "@/common/components/Header";
import { ThemeProvider } from "@/common/providers/theme-provider";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f1ea] flex flex-col selection:bg-[#be123c] selection:text-[#f4f1ea]">
      <ThemeProvider>
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </ThemeProvider>
    </div>
  );
}
