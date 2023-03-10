// @refresh reload
import {Suspense} from "solid-js";
import {Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title,} from "solid-start";
import "./root.scss";
import {isDark} from "~/shared/models/theme";


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
                    fallback={(error) => (
                        <div style={{color: 'red'}}>{error}</div>
                    )}
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
