'use client'

import { useFormStatus } from "react-dom"

const FormSubmit = () => {
  const status = useFormStatus()  

  if(status.pending){
    return <p>Creando Post...</p>
  }  

  return (
    <>  
        <button
            type='reset'
            className='btn danger'
        >   
            Reset
        </button>
        <button 
            className='btn action'
        >
            Crear Post
        </button>
    </>
  )
}

export default FormSubmit