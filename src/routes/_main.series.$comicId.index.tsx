import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/series/$comicId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/series/$comicId/"!</div>
}
