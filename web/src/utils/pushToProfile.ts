import { NextRouter } from "next/router";

export const pushToProfile = (router : NextRouter, id : number) => {
    router.push({
        pathname : "/profile/[id]",
        query : {id}
    })
}