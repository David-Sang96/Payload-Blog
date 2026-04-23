import { faker } from '@faker-js/faker'
import { Payload } from 'payload'

export async function createMediaFromImageUrl(payload: Payload, imageUrl: string) {
    try {
        const res = await fetch(imageUrl)
        const arrBuffer = await res.arrayBuffer()
        const buffer = Buffer.from(arrBuffer)

        const mimetype = res.headers.get('content-type') || 'image/jpeg'
        const filesize = buffer.length
        const filename = res.url.split('/').pop()?.split('?')[0]

        if (!filename) throw new Error('failed to extract filename')

        const media = await payload.create({
            collection: 'media',
            data: {
                alt: faker.lorem.words(3),
            },
            draft: true,
            file: {
                data: buffer,
                name: filename,
                mimetype,
                size: filesize,
            },
        })

        return media
    } catch (error) {
        console.warn('Failed to seed media file:', error)
    }
}

/*
    Fetch response
      ↓
    ReadableStream
      ↓
    arrayBuffer()
      ↓
    ArrayBuffer (raw bytes)
      ↓
    Buffer.from()
      ↓
    Buffer (Node format)
    ArrayBuffer = raw ingredients
    Buffer = cooked meal ready for Node.js tools

    It creates a Buffer from something
    Buffer = Node.js version of binary data
    const buf = Buffer.from('hello') 
    console.log(buf)

    console.log(Object.getPrototypeOf(res))

     ArrayBuffer is a raw chunk of binary memory
     ArrayBuffer = raw binary data (browser standard)
    console.log(typeof res.arrayBuffer) 

    console.log('res', res)
    console.log('arrBuffer', arrBuffer)
    console.log('buffer', buffer)
    console.log('mimetype', mimetype)
    console.log('filesize', filesize)
    console.log('filename', filename)
    */
