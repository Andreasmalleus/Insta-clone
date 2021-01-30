import { RefObject } from "react";


export const getUrlFromFileReader = (file : File) => {
    const reader  : FileReader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.onerror = () => {
            reject(new Error("Something went wrong with reading the file"))
        }
    })
}