import { NextRouter } from "next/router";

export const pushToProfile = (router : NextRouter, username : string) => {
    router.push({
        pathname : "/[username]",
        query : {username}
    })
}