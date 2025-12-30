import Footer from "@/common/components/Footer";
import Header from "@/common/components/Header";
import { ThemeProvider } from "@/common/providers/theme-provider";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <ThemeProvider>
        <Header />
        <Outlet />
        <Footer />
      </ThemeProvider>
    </main>
  );
}
