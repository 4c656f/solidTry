import classes from './Input.module.css'
import {IColorIndex} from "~/shared/helpers/types/IColorIndex";
import {IElementsSize} from "~/shared/helpers/types/IElementsSize";
import {Component, ComponentProps, createSignal} from "solid-js";

type InputOwnProps = {
    colorIndex?: IColorIndex;
    icon?: Element;
    isErrorOnServer?: boolean;
    size?: IElementsSize;
    errorMessage?: string;
    defaultIconStyles?: boolean;
    className?: string;
}


type ButtonProps = InputOwnProps & Omit<ComponentProps<'input'>, keyof InputOwnProps>

const defaultClasses = [classes['input']]

const Input: Component<ButtonProps> = (props) => {

    const {
        icon,
        className,
        isErrorOnServer,
        colorIndex = '0',
        errorMessage,
        defaultIconStyles,
        size = 'medium',
        ...rest
    } = props

    const [left, setLeft] = createSignal(false)


    const inputClasses = [
        classes.input,
        `${classes[`color_${colorIndex}_index`]}`,
        `${className ? className : ""}`,
        classes[size]
    ]

    return (

        <div class={classes.main_container}>
            <input
                class={inputClasses.join(" ")}
                type={'text'}
                data-left={left() ? 'true' : 'false'}
                onBlur={() => setLeft(true)}
                {...rest}
            />
            {icon}
            <span
                class={classes.error_message}
                style={props.isErrorOnServer ? {display: 'block'} : {}}
            >
                {props.errorMessage}
            </span>
        </div>

    );
};

export default Input;
