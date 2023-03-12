import {z} from "zod"


export const SchemaPost = z.object({
    PostTitle: z.string(),
    PostContent: z.string(),
})
