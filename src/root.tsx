// @refresh reload
import {Show, Suspense} from "solid-js";
import {
    Body,
    ErrorBoundary,
    ErrorMessage,
    FileRoutes,
    Head,
    Html,
    Meta,
    RouteDataArgs,
    Routes,
    Scripts,
    Title,
    useRouteData,
} from "solid-start";
import "./root.scss";
import {isDark} from "~/sharedSignals/theme";
import {useUser$} from "~/serverCallers/useUser$";
import { HttpStatusCode } from "solid-start/server";





export default function Root() {



    return (
        <Html lang="en">
            <Head>
                <Title>SolidStart - With Auth</Title>
                <Meta charset="utf-8"/>
                <Meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Body
                data-theme={isDark() ? 'dark' : 'light'}
            >

                <ErrorBoundary

                >
                    <Suspense fallback={<div>Loading</div>}>
                        <Routes>
                            <FileRoutes/>
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
                <Scripts/>
            </Body>
        </Html>
    );
}
