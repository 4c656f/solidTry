import {Component} from "solid-js";
import {useParams} from "@solidjs/router";
import {RouteDataArgs} from "solid-start/index";
import {useUser$} from "~/serverCallers/useUser$";
import {useRouteData} from "solid-start";
import {createServerData$, redirect, ServerError} from "solid-start/server";
import {db} from "~/db";
import {safeUserSelect} from "~/common/prisma/selectors";

type PostProps = {

}
export function routeData(prop: RouteDataArgs) {
    
    
    const post = createServerData$(async ([link],{request})=>{
        const postFromDb = await db.post.findUnique({
            where:{
                link: link
            },
            include: {
                author:{
                    select: safeUserSelect
                },
                _count: {
                    select: {
                        comments: true,
                        likes: true
                    }
                },
            },
        })
        if(!postFromDb)throw redirect('/')

        return postFromDb
    }, {
        key: [prop.params.link]
    })
    
    return post
}
const Post:Component<PostProps> = (props:PostProps) => {

    const {

    } = props

    const data = useRouteData<typeof routeData>()

    const params = useParams();

    return (
        <div>
            <h1>{data()?.title}</h1>
            <article>
                <div
                    innerHTML={data()?.content}
                />
            </article>

        </div>
    );
};

export default Post;