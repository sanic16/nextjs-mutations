'use client'

export default function FeedError(
    {
        error
    }: {
        error: Error
    }
){
    return (
        <>
            <h2>
                Ha ocurrido un error
            </h2>
            <p>
                Por favor intenta de nuevo
            </p>
            <p>
                { error.message }
            </p>
        </>
    )
}