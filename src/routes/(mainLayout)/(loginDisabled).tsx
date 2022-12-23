import {Component} from "solid-js";
import {Outlet} from "solid-start";

type LoginDisabledProps = {}

const LoginDisabled: Component<LoginDisabledProps> = (props: LoginDisabledProps) => {

    const {} = props


    return (
        <>
            <Outlet/>
        </>
    );
};

export default LoginDisabled;