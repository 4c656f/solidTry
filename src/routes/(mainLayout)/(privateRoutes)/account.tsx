import type {Component} from "solid-js";
import Button from "~/shared/ui/atoms/Button/Button";
import {logout} from "~/db/session";
import {createServerAction$} from "solid-start/server/index";
import {refetchRouteData} from "solid-start";

type AccountProps = {}

const Account: Component<AccountProps> = (props: AccountProps) => {

    const {} = props

    const [, {Form}] = createServerAction$(async (form: FormData, {request}) => logout(request))
    return (
        <>
            <Form>
                <Button
                    type={'submit'}
                >
                    <h1>logout</h1>
                </Button>
            </Form>
            <Button
                onClick={() => {
                    refetchRouteData()
                }}
            >
                refresh
            </Button>
        </>
    );
};

export default Account;
