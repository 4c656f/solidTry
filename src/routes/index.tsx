import {A, refetchRouteData, RouteDataArgs, useRouteData} from "solid-start";
import server$, {createServerAction$, createServerData$} from "solid-start/server";
import {logout} from "~/db/session";
import {useUser} from "../db/useUser";
import {Component, createEffect, createSignal, For, Show, Suspense} from "solid-js";
import {db} from "~/db";
import {createStore} from "solid-js/store";
import {isServer} from "solid-js/web";
import {setIsDark} from "~/sharedSignals/theme";
import Button from "~/components/ui/Button/Button";
import ServerHeader from "~/components/ServerHeader/ServerHeader";

export function routeData(prop: RouteDataArgs) {


    const listOfUsers = createServerData$(async (_, {request}) => {
        // console.log(request,'-----')
        return await db.user.findMany()
    });


    return {
        user: useUser(),
        users: listOfUsers
    };
}

const serverFunction = server$(async ()=>{
    return 'helloFromServer'
})

const Home: Component = () => {


    const [state, setState] = createStore({
        user: [{
            firstName: "John",
            lastName: "Smith",
            get fullName() {
                return `${this.firstName} ${this.lastName}`;
            }
        }]

    });

    const {user, users} = useRouteData<typeof routeData>();


    const [, {Form}] = createServerAction$((f: FormData, {request}) =>
        logout(request)
    );

    createEffect(()=>{
        console.log(state.user, '----')
    })

    const [isDisabled, setIsDisabled] = createSignal(true)


    createEffect(()=>{
        console.log(isDisabled())
    })

    return (
        <main>
            <ServerHeader/>
            <A
                href={'/some'}
            ><h1>home</h1></A>

            <Button
                onClick={()=>setIsDisabled(prev => !prev)}
            >

                <h1>some btn</h1>
            </Button>
            <Show
                when={user.state === 'ready' || isServer}
                fallback={<h1>loading...</h1>}
            >
                <h1 class="font-bold text-3xl">Hello {user()?.username}</h1>
            </Show>

            <h3 class="font-bold text-xl">Message board</h3>
            <button
                onClick={() => {
                    refetchRouteData()
                    setIsDark(prev => !prev)
                    serverFunction().then(data=>console.log(data))
                }}
            >Refresh</button>
            <button onClick={()=>setState('user',(prev)=>([...prev]))}>update store</button>
            <Form>
                <button name="logout" type="submit">
                    Logout
                </button>
            </Form>

            <Show
                when={user.state === 'ready' || isServer}
                fallback={<h1>loading...</h1>}
            >
                <For each={users()}>
                    {(student) => <h1>{student.username}</h1>}
                </For>
            </Show>


        </main>
    );
}
export default Home