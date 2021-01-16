import express from "express";

const main = () => {
    const app = express();

    app.listen(4000, () => {
        console.log("Listening at port 4000");
    })
}

main();