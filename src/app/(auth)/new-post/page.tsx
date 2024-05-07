import CreatePostForm from '@/components/forms/CreatePostForm'
import { createPost } from '@/actions/posts'
import { verifyAuth } from '@/utils/auth'
import { redirect } from 'next/navigation'

export default async function page() {
  
  const result = await verifyAuth()
  if(!result.user){
    return redirect('/auth')
  }

  return (
    <section>
        <CreatePostForm createPost={createPost}/>
    </section>
  )
}
