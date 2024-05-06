'use server'
import { deletePost as eliminatePost, getPost, createPost as mutatePost } from "@/utils/db"
import { v4 as uuid } from 'uuid'

import { redirect } from "next/navigation"
import { uploadObject } from "@/utils/aws"
import { revalidatePath } from "next/cache"

async function createPost(prevState: {errors: string[]}, formData: FormData){
    const title = formData.get('title') as string
    const image = formData.get('image') as File
    const content = formData.get('content') as string

    console.log(title, image, content)

    let errors = []

    if(!title || title.trim().length < 3){
      errors.push('El campo de título es requerido')
    }

    if(!content || content.trim().length < 10){
      errors.push('El contenido es requerido')
    }

    if(!image || image.size === 0){
      errors.push('Debes seleccionar una imagen')
    }

    if(errors.length > 0){
      return {
        errors
      }
    }

   const fileBuffer = await image.arrayBuffer()
   const buffer = Buffer.from(fileBuffer)

   const imageName = `public/${uuid()}-${image.name}`

   const uploadImage = await uploadObject(buffer, imageName, image.type)
   
   if(!uploadImage){
        errors.push('Error al subir la imagen')
        return {
            errors
        }
   }

   const url = `https://python-bucket-gt.s3.amazonaws.com/${imageName}`

   const post = await mutatePost(
        {
            title: title,
            content: content,
            image_url: url
        },
        2
    )

    if(!post){
      errors.push('Error al crear el post.')
      return {
        errors
      }
    }else{
      revalidatePath('/feed', 'page')
      redirect('/feed')
    }
  }  

async function deletePost(id: number){
    // const postId = formData.get('postId') as string

    const post = await getPost(id)

    if(!post){
        return{
            message: 'Post no encontrado'
        }
    }

    const deletedPost = await eliminatePost(post.id)

    if(!deletedPost){
        return {
            message: 'Error al eliminar el post'
        }
    }

    revalidatePath('/feed', 'page')
    redirect('/feed')
}

export { 
    createPost,
    deletePost 
}