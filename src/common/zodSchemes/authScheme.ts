import {z} from 'zod'

export const signInScheme = z.object({
    email: z.string().email({
        message:
            'invalidEmail'
    }),
    password: z.string().min(5, {
        message: 'Password to short'
    }).max(30, {
        message: 'Password to long'
    })
})

