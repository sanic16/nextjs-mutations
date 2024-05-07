'use client'

import Link from 'next/link'
import './../createPostForm.css'
import './login.css'
import { useFormState } from 'react-dom'
import { login } from '@/actions/auth'

const Login = () => {

  const [formState, formAction] = useFormState(login, {
    message: ''
  }) 

  return (
    <div className='form__wrapper'>
        <div>
            <h1>
                Iniciar sesión
            </h1>
            <form action={formAction}>

                {
                    formState?.message && (
                        <p>
                            {formState.message}
                        </p>
                    )
                }

                <p className='form-control'>
                <label htmlFor='email'>
                    Email
                </label>
                <input
                    type='email'
                    id='email'
                    name='email'
                />
               </p>

               <p>
                <label htmlFor='password'>
                    Contraseña
                </label>
                <input
                    type='password'
                    id='password'
                    name='password'
                />
               </p>                
                <p 
                    className='form__actions'
                >
                    <button
                        type='reset'
                        className='btn danger'
                    >
                        Reset
                    </button>
                    <button
                        className='btn primary'
                    >
                        Registrarse
                    </button>
                </p>
            </form>
            <small>
                ¿No tienes cuenta? <Link href='/auth?mode=register'>Regístrate</Link>
            </small>
        </div>
    </div>
  )
}

export default Login