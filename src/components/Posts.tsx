import Post from "./Post"
import './posts.css'

const Posts = (
    {
        posts
    }: {
        posts: Post[]
    }
) => {
  if(!posts || Posts.length === 0){
    return(
        <p>
            Aún no se han publicado posts. Revisa más tarde.
        </p>
    )
  }
  return (
    <ul className="posts">
        {
            posts.map(post => (
                <li key={post.id}>
                    <Post post={post} />
                </li>
            ))
        }
    </ul>
  )
}

export default Posts