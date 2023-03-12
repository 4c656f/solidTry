import classes from "./Button.module.scss"
import {IColorIndex} from "../../../helpers/types/IColorIndex";
import {ButtonType} from "../../../helpers/types/IElementType";
import {IElementsSize} from "../../../helpers/types/IElementsSize";
import {Dynamic} from "solid-js/web";
import {ElementType} from "~/shared/helpers/types/IElemntTypeEnum";
import {ComponentProps, createEffect, JSX} from "solid-js";


type ButtonCustomProps<E extends ElementType = ElementType> = {
    variant?: ButtonType;
    colorIndex?: IColorIndex;
    icon?: JSX.Element;
    defaultIconStyles?: boolean;
    size?: IElementsSize;
    children?: JSX.Element;
    className?: string;
    disabled?: boolean;
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
        disabled,
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
            class={`${classNames.join(' ')} ${props.className}`}
            classList={{
                [classes.active]: props.disabled,

            }}
            {...rest}
        >
            {children}
            {icon}
        </Dynamic>
    );
};


export default Button;
