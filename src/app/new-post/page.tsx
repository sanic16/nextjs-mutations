import CreatePostForm from '@/components/forms/CreatePostForm'
import { createPost } from '@/actions/posts'

export default function page() {
  

  return (
    <section>
        <CreatePostForm createPost={createPost}/>
    </section>
  )
}
