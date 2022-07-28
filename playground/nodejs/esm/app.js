import express from 'express';
import { pageStyle } from './helpers.js';
import fetchify from '@elghandour/fetchify';
const app = express();

const PORT = 8081;

app.use("*", async (req, res) => {
    const { data, error, response } = await fetchify.GET('https://jsonplaceholder.typicode.com/posts', {}, (controller) => {
        // controller.abort();
        // console.log("aborted");
    });
    console.log(data, error, response);
    if (response?.status === 200 && data) {
        console.log(data);
        const setPost = (post) => (
            /* html */`
            <div class="post">
                <div class="item post-id"><strong>ID:</strong> ${post.id}</div>
                <div class="item post-title"><strong>Title:</strong> ${post.title}</div>
                <div class="item post-body"><strong>Body:</strong> ${post.body}</div>
            </div>
        `)

        const posts = data.map(post => {
            return setPost(post);
        });

        res.send(pageStyle().concat(`<div id="app">${posts.join('\n')}</div>`))
    }
})



app.listen(PORT, () => {
    console.log('You can navigate to', 'http://localhost:' + PORT);
});
