import React from 'react'
import LikeButton from './LikeButton'
import formatDate from '@/utils/format'
import ButtonAction from './forms/ButtonAction'

import './post.css'

const Post = (
    {
        post
    }:{
        post: Post
    }
) => {
  const postTitle = post.title.length > 20 ? `${post.title.slice(0, 15)}...`  : post.title 
  return (
    <article className='post'>
        <div className='post-header'>
            <h2>
                { postTitle }
            </h2>
            <div className='post-image'>
                <img src={post.image_url} alt={post.title} />
            </div>
        </div>
        <div className="post-content">
                <p>
                    { post.content }
                </p>
        </div>
        <div className='post-footer'>        
            <div>                    
                <p>
                    Shared by {post.user.first_name} on{' '}
                    <time dateTime={post.created_at.toLocaleString()}>
                        {formatDate(post.created_at)}
                    </time>
                </p>
            </div>
            <div className='actions'>
                <LikeButton />
                <ButtonAction id={post.id}>
                    Eliminar
                </ButtonAction>
            </div>            
        </div>
    </article>
  )
}

export default Post