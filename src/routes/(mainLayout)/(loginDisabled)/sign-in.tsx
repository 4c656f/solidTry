import {Component} from "solid-js";
import {createServerAction$} from "solid-start/server/index";
import Button from "~/components/ui/Button/Button";
import {redirect} from "solid-start/server";


type SignInProps = {

}

const SignIn:Component<SignInProps> = (props:SignInProps) => {

    const {

    } = props

    const [loggingIn, { Form }] = createServerAction$(async (form:FormData) => {
        return redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
    })


    return (
        <div>
            <Form>
                <Button
                    type={'submit'}
                    name={'gitHub'}
                >
                    <span>via github</span>
                </Button>
            </Form>
        </div>
    );
};

export default SignIn;