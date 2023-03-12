import {safeUserSelect} from "~/common/prisma/selectors";
import {User} from "@prisma/client";


export type IFeedPost = {
    author: { [key in keyof typeof safeUserSelect]: User[key] },
    title: string,
    link: string,
    id: number,
    _count: {
        comments: number,
        likes: number
    }
}