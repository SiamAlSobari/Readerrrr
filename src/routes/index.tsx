import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'


export const Route = createFileRoute('/')({ component: App })

function App() {
  // const recomendation = useServerFn(getUpdate)
  // const {data} = useQuery({
  //   queryKey:['recomendation'],
  //   queryFn: recomendation
  // })


  return (
    <p>
      {/* {data?.data.data.map((comic) => (
        <img src={comic.cover_image_url} alt="" />
      ))} */}
    </p>
  )
}
