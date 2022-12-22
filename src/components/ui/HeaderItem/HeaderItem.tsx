import Button from "../Button/Button";
import classes from './HeaderItem.module.scss'
import type {Component, JSX} from 'solid-js'

export type HeaderItemProps = {
    title: string;
    children: JSX.Element
}

const HeaderItem: Component<HeaderItemProps> = (props: HeaderItemProps) => {

    const {
        title,
        children
    } = props


    return (
        <li
            class={classes.container}
        >
            <section
                class={classes.section}
            >
                {children}
            </section>
            <Button
                className={classes.button}
                variant={'text'}
                size={'small'}
                colorIndex={'0'}
            >
                <span>{title}</span>
            </Button>

        </li>
    );
};

export default HeaderItem;