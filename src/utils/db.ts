import prisma from "./prisma"

const getPosts = async (num: number) => {
    const posts = await prisma.post.findMany({
        take: num,
        select: {
            id: true,
            image_url: true,
            title: true,
            content: true,
            created_at: true,
            user: {
                select: {
                    first_name: true
                }
            }
        }

    })
    return posts
}

const getPost = async (id: number) => {
    const post = await prisma.post.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            image_url: true,
            title: true,
            content: true,
            created_at: true,
            user: {
                select: {
                    first_name: true
                }
            }
        }
    })
    return post
}

const createPost = async (post: WritePost, userId: number) => {
    const newPost = await prisma.post.create({
        data: {
            ...post,
            userId
        }
    })

    return newPost
}

const deletePost = async(id: number) => {
    return await prisma.post.delete({
        where: {
            id
        }
    })
}

// ########################## USER OPERATIONS ##########################

const getUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            first_name: true,
            last_name: true,
        }
    })
    return users
}

const getUser = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true
        }
    })

    return user
}

const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        },
    })

    return user
}

const createUser = async (user: WriteUser) => {
    const newUser = await prisma.user.create({
        data: user,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true
        }
    })

    return newUser
}

const getUserPosts = async (id: number) => {
    const posts = await prisma.post.findMany({
        where: {
            userId: id
        },
        select: {
            id: true,
            image_url: true,
            title: true,
            content: true,
            created_at: true
        }
    })
}

// ########################## LIKE OPERATIONS ##########################
const likePost = async (postId: number, userId: number) => {
    const like = await prisma.like.create({
        data: {
            post_id: postId,
            user_id: userId
        }
    })

    return like
}

const unlikePost = async (postId: number, userId: number) => {
    const unlike = await prisma.like.delete({
        where: {
            user_id_post_id: {
                post_id: postId,
                user_id: userId
            }
        }
    })

    return unlike
}

export {
    getPosts,
    getPost,
    createPost,
    deletePost,
    getUsers,
    getUser,
    getUserByEmail,
    createUser,
    getUserPosts,
    likePost,
    unlikePost
}