type Post = {
    id: number
    image_url: string    
    title: string
    content: string
    user: {
        first_name: string
    }
    created_at: Date
}

type WriteUser = {
    first_name: string
    last_name: string
    email: string
    password: string    
}  

type WritePost = {
    image_url: string
    title: string
    content: string
}