import classes from "./Button.module.scss"
import {IColorIndex} from "../../../types/IColorIndex";
import {ButtonType} from "../../../types/IElementType";
import {IElementsSize} from "../../../types/IElementsSize";
import {Dynamic} from "solid-js/web";
import {ElementType} from "@suid/types";
import type {ComponentProps, JSX} from "solid-js";

type ButtonCustomProps<E extends ElementType = ElementType> = {
    variant?: ButtonType;
    colorIndex?: IColorIndex;
    icon?: JSX.Element;
    defaultIconStyles?: boolean;
    size?: IElementsSize;
    children?: JSX.Element;
    className?: string;
    active?: boolean;
    as?: E
}


type ButtonProps<E extends ElementType> =
    ButtonCustomProps<E> & Omit<ComponentProps<E>, keyof ButtonCustomProps>


const defaultElement = "button";


const Button = <E extends ElementType = typeof defaultElement>(props: ButtonProps<E>) => {
    const {
        variant = "text",
        colorIndex = "0",
        as,
        icon,
        className,
        defaultIconStyles,
        size = "small",
        children,
        active,
        ...rest
    } = props

    const Element = as || defaultElement;

    const classNames = [
        classes.container,
        `${classes[variant]}`,
        `${classes[size]}`,
        `${classes[`color_${colorIndex}_index`]}`,
    ]

    return (
        <Dynamic
            component={Element}
            class={`${classNames.join(' ')} ${className ? className : ""}`}
            classList={{
                [classes.active]: props.active,
            }}
            {...rest}
        >
            {children}
            {icon}
        </Dynamic>
    );
};


export default Button;
