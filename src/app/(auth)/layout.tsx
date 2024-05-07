import { Metadata } from 'next'
import '../globals.css'
import { logout } from '@/actions/auth'

const metadata: Metadata = {
    title: 'Iniciar sesión',
    description: 'Inicia sesión en la aplicación',
}

export default function AuthLayout(
    {
        children
    }: {
        children: React.ReactNode
    
    }
) {
  return (
    <>
        <header style={{
            top: '5rem',
            position: 'fixed',
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            paddingInline: '1rem',
            backgroundColor: 'hsl(40, 88%, 42%)',
            paddingBlock: '1rem',
        }}>
            <p>
                Bienvenido a la aplicación
            </p>
            <form action={logout}>
                <button className='btn danger'>
                    Cerrar sesión
                </button>
            </form>
        </header>
            {children}
    </>
  )
}
