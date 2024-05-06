'use client'
import React from 'react'
// import { useFormState } from 'react-dom'
import { deletePost } from '@/actions/posts'

const ButtonAction = (
    {
        children,
        id
    }:{
        children: React.ReactNode,        
        id: number
    }

) => {

  return (
    <button 
        className='btn danger'
        onClick={async () => {
            await deletePost(id)
        }}
    >
        { children }
    </button>
  )
}

export default ButtonAction