import type {APIEvent} from "solid-start/api";

import url from 'node:url';
import axios from "axios";
import {createUserSession, requireUserId} from "~/db/session";
import {IGithubOauthResponse} from "~/types/IGithubOauthResponse";
import {db} from "~/db";

export async function GET({request}: APIEvent) {

    // const session = await requireUserId(request, '/', false)

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

    const {data} = await axios.get<IGithubOauthResponse>('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${token.data.access_token}`
        }
    })
    console.log(data)
    const user = await db.user.upsert({
        where:{
            userName: data.login
        },
        update:{},
        create:{
            email: data.email,
            userName: data.login,
            image: data.avatar_url
        }
    })

    return createUserSession(`${user.id}`, '/')
}