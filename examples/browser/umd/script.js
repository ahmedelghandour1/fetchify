(async function () {
    /** @type {import('../../../dist/types/main')} */
    const { GET, } = window.fetchify;
    const { data, error, response } = await GET('https://jsonplaceholder.typicode.com/posts');
    console.log(data, error, response);
    if (response.status === 200 && data) {
        console.log(data);
        const appElement = document.querySelector('#app');
        const setPost = (post) => (
            /* html */`
            <div style="
            border: 1px solid black; 
            display:flex;
            align-items: center;
            jusftify-content: space-between;
            border-radius: 10px;
            margin-bottom: 10px;">
                <div style="border-right: 1px solid; width: 30px">${post.id}</div>
                <div style="border-right: 1px solid; width: 40%">${post.title}</div>
                <div>${post.body}</div>
            </div>
        `)

        const posts = data.map(post => {
            return setPost(post);
        });

        appElement.innerHTML = posts.join('\n');
    }

})();