export type creator = {
    id: number;
    username : string;
    url : string;
}

export type comment = {
    id : number;
    creator :  creator;
    text : string;
    createdAt : string;
    likes : number;
}

export type post = {
    id : number;
    description : string;
    type : string;
    creator : creator;
    likes : number;
    comments : comment[];
    updatedAt : string;
    createdAt : string;
}