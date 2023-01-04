import {createServerAction$, redirect} from "solid-start/server/index";
import {IProvidersEnum} from "~/types/IProvidersEnum";
import {signInScheme} from "~/common/zodSchemes/authScheme";
import {z, ZodError} from 'zod'
import {db} from "~/db";
import {marked} from "marked";


export type useAuthActionProps$ = {
    type: 'signIn' | 'signUp'
    provider: 'credentials'
    data: z.infer<typeof signInScheme>
} | {
    type: 'signIn',
    provider: Exclude<keyof typeof IProvidersEnum, 'credentials'>
}

export const useAuthAction$ = () => createServerAction$(async (props: useAuthActionProps$) => {

    const {
        type,
        provider,
    } = props

    if (provider === 'credentials') {
        const data = signInScheme.safeParse(props.data)
        if (!data.success) {
            throw data.error.format();
        }

        const user = await db.user.findFirst({
            where: {
                email: props.data?.email,
                password: props.data?.password
            },
        })
        if (!user) {
            throw new ZodError([{
                fatal: true,
                validation: 'email',
                code: 'invalid_string',
                message: 'invalid password email pair',
                path: ['email']
            }]).format()
        }
        return true
    }
    if (provider === 'github') {
        throw redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
    }


}, {
    invalidate: []
})