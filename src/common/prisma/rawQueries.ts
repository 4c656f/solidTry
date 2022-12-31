import {Post} from "@prisma/client";
import {db} from "~/db";
import {Prisma} from "@prisma/client";

type IGetPostsProps = {
    userId?: number;
    skip: number;
    take: number;
}


export const getPosts = ({
                             userId,
                             skip,
                             take
                         }: IGetPostsProps) => `SELECT Post.*,
                CAST(IFNULL(l.count, 0) AS FLOAT) as likesCount,
                CAST(IFNULL(c.comment_count, 0) AS FLOAT) as commentsCount,
                CAST(${userId? 'IFNULL(PostLike.likeType, 0)' : 0} AS FLOAT) as likeInitial
                FROM Post
                LEFT JOIN (
                    SELECT SUM(PostLike.likeType) as count, PostLike.postId FROM PostLike GROUP BY PostLike.postId)
                    l on l.postId = Post.id
                LEFT JOIN (
                    SELECT COUNT(*) as comment_count, PostComment.postId FROM PostComment GROUP BY PostComment.postId)
                    c on c.postId = Post.id
                ${userId?`LEFT JOIN PostLike on PostLike.postId = Post.id AND PostLike.authorId = ${userId}`:""}
                ORDER BY Post.createdAt DESC, Post.id ASC LIMIT ${skip}, ${take};
                `
export type IGetPosts = {
    likeInitial: number;
    likesCount: number;
    commentsCount: string;
} & Post

`SELECT Post.*, IFNULL(l.count, 0) as likes, IFNULL(c.comment_count, 0) as comments, IFNULL(PostLike.likeType, 0) as like_initial FROM Post LEFT JOIN ( SELECT SUM(PostLike.likeType) as count, PostLike.postId FROM PostLike GROUP BY PostLike.postId) l on l.postId = Post.id LEFT JOIN ( SELECT COUNT(*) as comment_count, PostComment.postId FROM PostComment GROUP BY PostComment.postId) c on c.postId = Post.id LEFT JOIN PostLike on PostLike.postId = Post.id AND PostLike.authorId = 1 ORDER BY Post.createdAt DESC, Post.id ASC LIMIT 0, 10;`