import {redirect} from "solid-start/server";
import {createCookieSessionStorage} from "solid-start/session";
import {db} from ".";

type LoginForm = {
    username: string;
    password: string;
};

export async function register({username, password}: LoginForm) {
    return db.user.create({
        data: {
            userName: username,
            password: password
        },
    });
}

export async function login({username, password}: LoginForm) {
    const user = await db.user.findUnique({where: {userName: username}});
    if (!user) return null;
    const isCorrectPassword = password === user.password;
    if (!isCorrectPassword) return null;
    return user;
}

const sessionSecret = import.meta.env.SESSION_SECRET;

export const storage = createCookieSessionStorage({
    cookie: {
        name: "RJ_session",
        // secure doesn't work on localhost for Safari
        // https://web.dev/when-to-use-local-https/
        secure: true,
        secrets: ["hello"],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    },
});

export function getUserSession(request: Request) {
    return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserFromSession(request: Request) {
    const session = await getUserSession(request);
    const userId = session.get("userId");
    const userName = session.get("userName") as string;
    const userImage = session.get("userImage") as string;

    if (!userId || !userName || !userImage || typeof userId !== "string") return null;

    return {userId, userName, userImage};
}
export async function requireUser(
    request: Request,
    redirectTo: string,
    isRequired: true
):Promise<{userId: string, userName: string, userImage: string}>
export async function requireUser(
    request: Request,
    redirectTo: string = new URL(request.url).pathname,
    isRequired: boolean
) {

    const userId = await getUserFromSession(request);

    if (!userId) {
        if (isRequired) {
            // const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
            throw redirect(redirectTo);
        } else {
            return null
        }
    }
    if (!isRequired) {
        throw redirect(redirectTo);
    }
    return userId;
}

export async function getUserFromDb(request: Request) {
    const userFromSession = await getUserFromSession(request);

    try {
        const user = await db.user.findUnique({where: {id: Number(userFromSession?.userId)}});
        return user;
    } catch {
        throw logout(request);
    }
}

export async function logout(request: Request) {
    const session = await storage.getSession(request.headers.get("Cookie"));
    return redirect("/", {
        headers: {
            "Set-Cookie": await storage.destroySession(session),
        },
    });
}

export async function createUserSession(userId: string, userName: string, userImage: string, redirectTo: string) {
    const session = await storage.getSession();
    session.set("userId", userId);
    session.set("userName", userName);
    session.set("userImage", userImage);
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session),
        },
    });
}
