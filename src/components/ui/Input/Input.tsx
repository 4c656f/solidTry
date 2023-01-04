import classes from './Input.module.scss'
import {IColorIndex} from "../../../types/IColorIndex";
import {IElementsSize} from "../../../types/IElementsSize";
import type {JSX} from "solid-js";
import {Component, ComponentProps} from "solid-js";

type InputOwnProps = {
    colorIndex?: IColorIndex;
    icon?: JSX.Element;
    size?: IElementsSize;
    defaultIconStyles?: boolean;
    className?: string
}


type ButtonProps = InputOwnProps & Omit<ComponentProps<'input'>, keyof InputOwnProps>


const Input: Component<ButtonProps> = (props) => {

    const {
        icon,
        className,
        colorIndex = "0",
        size = "medium",
        defaultIconStyles,
        value,
        ...rest
    } = props


    const inputClasses = [
        classes.container,
        classes[`color_${colorIndex}_index`],
        className ? className : "",
        classes[size]
    ]

    return (
        <div class={classes.main_container}>
            <input
                // class={classes.container}
                class={inputClasses.join(" ")}
                value={props.value}
                {...rest}
            />
            {icon}
        </div>

    );
};

export default Input;