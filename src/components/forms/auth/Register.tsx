'use client'
import { signup } from '@/actions/auth'
import './../createPostForm.css'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import './register.css'

const Register = () => {
  const [formState, formAction] = useFormState(signup, {
    errors: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''   
    }
  })  
  return (
    <div className='form__wrapper'>
        <div>
            <h1>
                Registrarse
            </h1>
            <form
                action={formAction}
            >
                {
                    formState?.errors && (
                        <ul>
                           {Object.keys(formState.errors).map((error) => (
                                <li key={error}>
                                    {(formState.errors as { [key: string]: any })[error]}
                                </li>
                            ))}

                        </ul>
                    )
                }
               <p className='form-control'>
                <label htmlFor='firstName'>
                    Nombre
                </label>  
                <input
                    type='text'
                    id='firstName'
                    name='firstName'
                />      
               </p>

               <p className="form-control">
                <label htmlFor="lastName">
                    Apellido
                </label>
                <input 
                    type="text" 
                    id='lastName'
                    name='lastName'
                />
               </p>

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

                {/* <p>
                 <label htmlFor='confirmPassword'>
                      Confirmar contraseña
                 </label>
                 <input
                      type='password'
                      id='confirmPassword'
                      name='confirmPassword'
                 />
                </p> */}

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
                ¿Ya tienes una cuenta? <Link href='/auth?mode=login'>Inicia sesión</Link>
            </small>
        </div>
    </div>
  )
}

export default Register