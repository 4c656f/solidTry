import {IColorIndex} from "../../../types/IColorIndex";
import classes from './textArea.module.scss'
import type {ComponentProps} from 'solid-js'

type TextAreaProps = {
    colorIndex?: IColorIndex;
    className?: string;
} & ComponentProps<'textarea'>


const TextArea = ((props: TextAreaProps) => {

    const {
        colorIndex = "0",
        className,
        ...rest
    } = props


    const classArr = [
        classes.text_area,
        `${classes[`color_${colorIndex}_index`]}`,
        className ? className : ""
    ]


    return (

        <textarea
            class={classArr.join(' ')}
            ref={props.ref}
            {...rest}
        />

    );
})

export default TextArea