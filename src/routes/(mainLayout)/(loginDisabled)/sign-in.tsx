import {Component, createEffect, createSignal} from "solid-js";
import {useAuthAction$} from "../../../serverCallers/useAuthAction$";
import Button from "~/components/ui/Button/Button";
import classes from './signIn.module.scss'
import ArrowIcon from "~/materials/arrow-left.svg?component-solid"
import FormInput from "~/components/ui/FormInput/FormInput";

type SignInProps = {}

const SignIn: Component<SignInProps> = (props: SignInProps) => {

    const {} = props


    const [email, setEmail] = createSignal('')

    const [password, setPassword] = createSignal('')

    const [status, auth] = useAuthAction$()


    createEffect(() => {
        console.log(status.error)
    })


    return (
        <div
            class={classes.container}
        >
            <div
                class={classes.providers_container}
            >
                <label>
                    Credentials
                </label>
                <form
                    class={classes.credentials_form}
                >

                    <FormInput
                        value={email()}
                        onKeyUp={(e) => {
                            setEmail(e.currentTarget.value)
                        }}
                        required={true}
                        type={'email'}
                        errorMessage={status.error?.email ? status.error.email._errors[0] : 'This field required'}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        placeholder={'email'}
                        isErrorOnServer={!!status.error?.email}

                    />
                    <FormInput
                        value={password()}
                        onKeyUp={(e) => {
                            setPassword(e.currentTarget.value)
                        }}
                        type={'password'}

                        placeholder={'password'}
                        errorMessage={status.error?.password ? status.error.password._errors[0] : 'This field required'}

                        required={true}

                        isErrorOnServer={!!status.error?.password}
                    />
                    <Button
                        onClick={() => {
                            auth({
                                type: 'signIn',
                                provider: 'credentials',
                                data: {
                                    email: email(),
                                    password: password()
                                }
                            })
                        }}
                        variant={'link'}
                        size={'medium'}
                        icon={<ArrowIcon/>}
                        className={classes.credentials_submit_btn}
                    >
                        <span>sign In</span>
                    </Button>

                </form>
                <label>
                    OAuth
                </label>
                <Button
                    onClick={() => {
                        auth({
                            type: 'signIn',
                            provider: 'github',
                        })
                    }}
                    variant={'link'}
                    icon={<ArrowIcon/>}
                    size={'medium'}
                >
                    <span>via github</span>
                </Button>
            </div>
        </div>
    );
};

export default SignIn;