import { S3Client, DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const bucketName = process.env.BUCKET
const accessKeyId = process.env.KEY_ID
const secretAccessKey = process.env.ACCESS_KEY
const region = process.env.REGION


if(!bucketName || !accessKeyId || !secretAccessKey || !region) {
    throw new Error('AWS S3 config is missing')
}

const s3 = new S3Client({   
        region: region,
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        }
})

export const uploadObject = (fileBuffer: Buffer, fileName: string, mimetype: string) => {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype
    }

    return s3.send(new PutObjectCommand(uploadParams))
}

export const deleteObject = (fileName: string) => {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName
    }

    return s3.send(new DeleteObjectCommand(deleteParams))
}

// export const getObjectSignedUrl = async(filename: string) => {
//     const params = {
//         Bucket: bucketName,
//         Key: filename
//     }

//     const command = new GetObjectCommand(params)
//     const seconds = 3000
//     const url = await getSignedUrl(s3, command, { expiresIn: seconds })
//     return url
// } 
