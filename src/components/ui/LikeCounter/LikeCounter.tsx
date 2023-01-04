import {Component, createSignal} from "solid-js";
import {createServerAction$} from "solid-start/server/index";
import {requireUser} from "~/db/session";
import {db} from "~/db";
import Button from "~/components/ui/Button/Button";
import ArrowIcon from "~/materials/like.svg?component-solid"
import classes from './LikeCounter.module.scss'


type LikeCounterProps = {
    postId: number;
    likeInitial: number;
    likesCount: number
}

const LikeCounter: Component<LikeCounterProps> = (props: LikeCounterProps) => {

    const {
        postId,
        likeInitial,
        likesCount
    } = props

    const [likes, setLikes] = createSignal(likesCount - likeInitial)
    const [likeType, setLikeType] = createSignal<number>(likeInitial)


    const [likeEnrolling, likeEnroll] = createServerAction$(async (data: { postId: number; likeType: -1 | 1 | 0 }, {request}) => {

        const {
            postId,
            likeType
        } = data

        const user = await requireUser(request, '/sign-in', true);
        await db.postLike.upsert({
            where: {
                authorId_postId: {
                    postId: postId,
                    authorId: Number(user.userId)
                }
            },
            update: {
                likeType: likeType
            },
            create: {
                authorId: Number(user.userId),
                postId: data.postId,
                likeType: likeType
            }
        });

        return true;
    }, {
        invalidate: []
    });


    const handleEnroll = async (type: 1 | -1) => {


        const curType = type === likeType() ? 0 : type

        await likeEnroll({
            postId,
            likeType: curType
        })
        setLikeType(curType)
    }

    return (
        <div
            class={classes.container}
        >

            <Button
                icon={<ArrowIcon/>}
                disabled={likeEnrolling.pending}
                // active={likeType() === -1}
                onClick={() => handleEnroll(-1)}
            />
            <span
                classList={{
                    [classes.positive]: (likes() + likeType()) > 0,
                    [classes.negative]: (likes() + likeType()) < 0,
                }}
            >{likes() + likeType()}</span>
            <Button
                disabled={likeEnrolling.pending}
                icon={<ArrowIcon class={classes.like_icon}/>}
                // active={likeType() === 1}
                onClick={() => handleEnroll(1)}
            />


        </div>
    );
};

export default LikeCounter;