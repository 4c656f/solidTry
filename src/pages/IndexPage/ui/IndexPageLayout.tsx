import type {Component} from "solid-js";
import {LayoutIndexFeed} from "~/widgets/IndexFeed";

type IndexPageLayoutProps = {}

export const IndexPageLayout: Component<IndexPageLayoutProps> = (props) => {

    const {} = props


    return (
        <div>
            <LayoutIndexFeed/>
        </div>
    );
};
