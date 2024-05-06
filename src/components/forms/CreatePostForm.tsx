'use client'

import { useFormState } from 'react-dom'
import FormSubmit from './FormSubmit'
import './createPostForm.css'

type Errors = {
    errors: string[]
}
const initalState: Errors = {errors: [] }

const CreatePostForm = (
    {
        createPost
    }:{
        createPost: (prevState: {
            errors: string[];
        }, formData: FormData) => Promise<{errors: string[]}>
    }
) => {

  const [state, formAction] = useFormState(createPost, initalState)  

  return (
    <div className='form__wrapper'>
        <div>
        <h1>
            Crear un nuevo post
        </h1>
        <form action={formAction}>
            {
                state.errors && (
                    <p className='form__error-message'>
                        {
                            state.errors.map(error => (
                                <>
                                    {error}{', '} 
                                </>
                            ))
                        }  
                    </p>
                )
            }
            <p className='form-control'>
                <label htmlFor="title">Título</label>
                <input type="text" id='title' name='title'/>
            </p>           
            <p className='form-control'>
                <label htmlFor="content">
                    Content
                </label>
                <textarea
                    id='content'
                    name='content'
                    rows={5}
                />
            </p>
            <p className='form-control'>
                <label htmlFor="image">Image</label>
                <input
                    type='file'
                    accept='image/*'
                    id='image'
                    name='image'
                />
            </p>
            <div className='form__actions'>
                <FormSubmit />
            </div>
        </form>
        </div>
    </div>
  )
}

export default CreatePostForm