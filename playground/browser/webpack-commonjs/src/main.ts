const { GET } = require('@elghandour/fetchify');

(async function () {
    const { data, error, response } = await GET('https://jsonplaceholder.typicode.com/posts');
    console.log(data, error, response);
    if (response.status === 200 && data) {
        console.log(data);
        const appElement = document.querySelector('#app');
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

        appElement.innerHTML = posts.join('\n');
    }

})();