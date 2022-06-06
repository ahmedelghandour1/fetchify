const express = require('express');
const helpers = require('./helpers');
const { GET } = require('@elghandour/fetchify');
const app = express();

const PORT = 8080;

app.use("*", async (req, res) => {
    const { data, error, response } = await GET('https://jsonplaceholder.typicode.com/posts');
    if (response.status === 200 && data) {
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

        res.send(helpers.pageStyle().
            concat(`<div id="app">${posts.join('\n')}</div>`))
    }
})



app.listen(PORT, () => {
    console.log('You can navigate to', 'http://localhost:' + PORT);
});
