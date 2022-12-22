import classes from './Header.module.scss'
import type {Component, JSX} from "solid-js";


type HeaderProps = {
    logoSection?: JSX.Element,
    mainSection?: JSX.Element,
    rightSection?: JSX.Element,
}

const Header: Component<HeaderProps> = (props: HeaderProps) => {

    const {
        logoSection,
        mainSection,
        rightSection,
    } = props


    return (
        <header
            class={classes.container}
        >
            <nav
                class={classes.nav}
            >
                <ul
                    class={classes.sections}
                >
                    {logoSection}
                </ul>
                <ul
                    class={classes.sections}
                >
                    {
                        mainSection
                    }
                </ul>
                <ul
                    class={classes.sections}
                >
                    {rightSection}
                </ul>
            </nav>
        </header>
    );
};

export default Header;