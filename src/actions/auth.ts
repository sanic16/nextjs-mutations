'use server'
import { redirect } from "next/navigation"
import { createUser, getUserByEmail } from "@/utils/db"
import { hashUserPassword, verifyPassword } from "@/utils/hash"
import { createAuthSession, destroyAuthSession } from "@/utils/auth"

type ValidationErrors = {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
}

const signup = async (prevState: {errors: ValidationErrors}, formData: FormData) => {
    const first_name = formData.get('firstName') as string
    const last_name = formData.get('lastName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    console.log(first_name, last_name, email, password)

    let errors: ValidationErrors = {} 

    if(!first_name.trim().length){
        errors.firstName = 'El nombre es un campo requerido'
    }
    if(!last_name.trim().length){
        errors.lastName = 'El apellido es un campo requerido'
    }
    if(!email.trim().length){
        errors.email = 'El email es un campo requerido'
    }

    if(!password.trim().length){
        errors.password = 'La contraseña es un campo requerido'
    }

    if(!email.includes('@')){
        errors.email = 'El email no es válido'
    }

    if(password.length < 6){
        errors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    if(Object.keys(errors).length > 0){
        return {
            errors
        }
    }

    const hashedPassword = hashUserPassword(password)
    let user 
    try {
        user = await createUser({
            email,
            first_name,
            last_name,
            password: hashedPassword
        })
    } catch (error: unknown) {
        if(error instanceof Error){
            errors.email = 'El email ya está en uso'
            return {
                errors
            }
        }
    }

    if(user){
        try {
            await createAuthSession(user.id)        
        } catch (error) {
            if(error instanceof Error){
                console.error(error.message)
            }
        }
        redirect('/')
    }else{
        errors.email = 'Error al crear el usuario'
        return {
            errors
        }
    }     
}

const login = async (prevState: {message: string}, formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const user = await getUserByEmail(email)

    if(!user){
        return {
            message: 'Usuario no encontrado'
        }
    }

    const isValidPassword = verifyPassword(user.password, password)

    if(!isValidPassword){
        return {
            message: 'Contraseña incorrecta'
        }
    }

    try {
        await createAuthSession(user.id)
    } catch (error: unknown) {
        if(error instanceof Error){
            return {
                message: 'Error al iniciar sesión'
            }
        } 
    }

    if(user){
        redirect('/')
    }else{
        return {
            message: 'Error al iniciar sesión'
        }
    }   

}

const logout = async () => {
    await destroyAuthSession()
    redirect('/auth')
}

export {
    signup,
    login,
    logout
}