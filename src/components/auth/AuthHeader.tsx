
const AuthHeader = (
    {
        logout,
        user
    }: {
        logout: () => Promise<never>
        user: {
            first_name: string,
            last_name: string,
            email: string
            id: number
        } | null
    }
) => {
  return (
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
            Bienvenido a la aplicación { user?.first_name }
        </p>
        <form action={logout}>
            <button className='btn danger'>
                Cerrar sesión
            </button>
        </form>
    </header>
  )
}

export default AuthHeader