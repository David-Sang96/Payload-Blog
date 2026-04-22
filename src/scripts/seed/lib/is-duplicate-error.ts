import z from 'zod'

const payloadErrorSchema = z.object({
    name: z.string(),
    status: z.number(),
    data: z.object({
        collection: z.string(),
        errors: z.array(
            z.object({
                message: z.string(),
                path: z.string(),
            }),
        ),
    }),
})

type PayloadErrorLike = z.infer<typeof payloadErrorSchema>

function isPayloadError(error: unknown): error is PayloadErrorLike {
    return payloadErrorSchema.safeParse(error).success
}

export function isDuplicateError(error: unknown, field: string): boolean {
    return (
        isPayloadError(error) &&
        error.data.errors.some(
            (err) => err.path === field && /already registered/i.test(err.message),
        )
    )
}

// type PayloadErrorLike = {
//     name: string
//     status: number
//     data?: {
//         collection: string
//         errors?: {
//             message?: string
//             path?: string
//         }[]
//     }
// }

// export function isPayloadError(error: unknown): error is PayloadErrorLike {
//     return (
//         !!error &&
//         typeof error === 'object' &&
//         'name' in error &&
//         'status' in error &&
//         'data' in error
//     )
// }

/* 
  
Step by step:
!!error 
→ ensures it’s not null or undefined
typeof error === 'object'
→ makes sure it’s an object
'name' in error
→ object has a name property
'status' in error
→ has a status property
'data' in error
→ has a data property

If all are true → returns true

*/
