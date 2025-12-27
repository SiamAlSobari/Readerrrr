import { ThemeProvider } from '@/common/providers/ThemeProvider'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ThemeProvider>
    <Outlet/>
  </ThemeProvider>
}
