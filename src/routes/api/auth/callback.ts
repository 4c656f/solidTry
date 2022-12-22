import type {APIEvent} from "solid-start/api";

import url from 'node:url';
import axios from "axios";

export async function GET({request}: APIEvent) {

    console.log(url.parse(request.url, true).query.code)
    const token = await axios.post("https://github.com/login/oauth/access_token", {

        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: url.parse(request.url, true).query.code
    },{headers:{
            Accept: "application/json"
        }})


    const userData = await axios.get('https://api.github.com/user',{
        headers:{
            Authorization: `Bearer ${token.data.access_token}`
        }
    })
    console.log(userData.data)


    return new Response("Hello World");
}