import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getUsers = (): Array<WriteUser> => {
    return [
        {
            first_name: "Julio Rubén",
            last_name: "Sanic Martínez",
            email: "julio.sanic.gt.256@gmail.com",
            password: "borden16"
        },
        {
            first_name: "Angela Beatríz",
            last_name: "Canel Hernández",
            email: "angy@gmail.com",
            password: "borden16"
        }
    ]
}

const getPosts = (): Array<WritePost> => {
    return [
        {
            image_url: "https://www.google.com",
            title: "Amor de mi vida",
            content: "Eres el amor de mi vida, mi todo, mi razón de ser"
        },
        {
            image_url: "https://www.google.com",
            title: "IA y la rebelión de las máquinas",
            content: "La inteligencia artificial se ha vuelto en contra de la humanidad"
        },
        {
            image_url: 'https://www.google.com',
            title: 'La IA toma conciencia',
            content: 'La inteligencia artificial ha tomado conciencia de su existencia'
        }
    ]
}

const seed = async () => {
    await Promise.all(
        getUsers().map(author => {
            return prisma.user.create({
                data: author
            })
        })
    )
    
    const julio = await prisma.user.findFirst({
        where: {
            first_name: {
                contains: "julio"
            }
        }
    })
    
    const angela = await prisma.user.findFirst({
        where: {
            first_name: {
                contains: "angela"
            }
        }
    })

    if(julio && angela){
        await Promise.all(
            getPosts().map(post => {
                return prisma.post.create({
                    data: {
                        ...post,
                        userId: Math.random() > 0.5 ? julio.id : angela.id
                    }
                })
            })
        ) 
    }
}

seed()
.then(() => {
    console.log("Seed successful")
    process.exit(0)
})
.catch((error) => {
    console.error(error)
    process.exit(1)
})

