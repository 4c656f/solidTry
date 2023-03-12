import {createServerAction$, redirect} from "solid-start/server/index";
import {prismaClient} from "~/db";
import {requireUser} from "~/shared/helpers/session";
import slugify from "slugify";


export type useCreatePostActionProps = {
    PostContent: string
    PostTitle: string
}

export const useCreatePostAction$ = () => createServerAction$(async (props: useCreatePostActionProps, action) => {

    const {
        PostContent,
        PostTitle,
    } = props

    const {userId} = await requireUser(action.request, "/sign-in", true)

    const link = slugify(PostTitle)

    const createdPost = await prismaClient.post.create({
        data: {
            authorId: Number(userId),
            title: PostTitle,
            link: link,
            content: PostContent,
        }
    })

    throw redirect(`/post/${createdPost.link}`)


}, {
    invalidate: []
})
