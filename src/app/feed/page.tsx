import Posts from "@/components/Posts";
import { getPosts } from "@/utils/db";

export default async function page() {
  const posts = await getPosts(100)
  return (
    <section>
      <h1>
        Los Posts de todos los usuarios
      </h1>
      <Posts posts={posts} />
    </section>
  )
}
