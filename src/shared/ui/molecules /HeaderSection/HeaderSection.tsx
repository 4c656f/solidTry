import classes from './HeaderSection.module.scss'
import type {Component, JSX} from 'solid-js'
import {For} from 'solid-js'

export type headerSectionHelper = {
    title?: string;
    [key: string | number]: any;
    elements?: {
        label?: string;
        [key: string | number]: any;
    }[]
}

type headerSectionElems = {
    title?: JSX.Element;
    elements?: JSX.Element | JSX.Element[]
}

export type HeaderSectionProps = {
    sectionTitle?: JSX.Element,
    headerSectionElems?: headerSectionElems[]
}


const HeaderSection: Component<HeaderSectionProps> =

    (props: HeaderSectionProps) => {

        const {
            sectionTitle,
            headerSectionElems
        } = props


        return (
            <menu
                class={classes.container}
            >
                <div
                    class={classes.main_title}
                >
                    {sectionTitle}
                </div>

                <div
                    class={classes.elements_container}
                >
                    <For each={headerSectionElems}>
                        {(value) => {
                            return (
                                <div
                                    class={classes.section_element}
                                >
                                    {value.title}
                                    <div
                                        class={classes.elements_button}
                                    >
                                        {value.elements}
                                    </div>
                                </div>
                            )
                        }}
                    </For>

                </div>
            </menu>
        );
    };

export default HeaderSection;