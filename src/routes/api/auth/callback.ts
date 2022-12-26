import type {APIEvent} from "solid-start/api";

import url from 'node:url';
import axios from "axios";
import {createUserSession, requireUser} from "~/db/session";
import {IGithubOauthResponse} from "~/types/IGithubOauthResponse";
import {db} from "~/db";

export async function GET({request}: APIEvent) {

    const session = await requireUser(request, '/', false)

    const code = url.parse(request.url, true).query.code

    const token = await axios.post("https://github.com/login/oauth/access_token", {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code

        },
        {
            headers: {
                Accept: "application/json"
            }
        })
    // console.log(token.data)

    const {data} = await axios.get<IGithubOauthResponse>('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${token.data.access_token}`
        }
    })
    // console.log(data)
    const user = await db.user.upsert({
        where: {
            userName: data.login
        },
        update: {},
        create: {
            email: data.email,
            userName: data.login,
            image: data.avatar_url
        }
    })

    return createUserSession(`${user.id}`,`${user.userName}`,`${user.image}`, '/')
}