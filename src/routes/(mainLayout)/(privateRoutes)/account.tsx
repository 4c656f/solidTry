import type {Component} from "solid-js";
import Button from "~/components/ui/Button/Button";
import {logout} from "~/db/session";
import {createServerAction$} from "solid-start/server/index";

type AccountProps = {

}

const Account:Component<AccountProps> = (props:AccountProps) => {

    const {

    } = props

    const [, { Form }] = createServerAction$(async (form:FormData,{request}) => logout(request))
    return (
        <>
            <Form>
                <Button
                    type={'submit'}
                >
                    <h1>logout</h1>
                </Button>
            </Form>

        </>
    );
};

export default Account;