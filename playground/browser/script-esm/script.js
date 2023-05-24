import { GET, setInterceptors, globalConfigs } from '../../../packages/fetchify/dist/browser/build.esm.js';
/** @type {import('../../../packages/fetchify/dist/types/main')} */

setInterceptors({
    response: (result,
        requestInit,
        fetchifyParams) => {
        console.log(fetchifyParams);
        return result;
    }
});
console.log(globalConfigs.set({ TEST: "" }));
globalConfigs.set({
    baseURL: "https://jsonplaceholder.typicode.com"
});

(async function () {
    const { data, error, response, meta } = await GET('posts', { params: { test: "1", test2: { test_child: "hello", hi: [1, 3, "fdgdsgdsgds"], test4: null, test44: undefined, testeg44: "undefined" } } });
    console.log(meta);
    if (response.status === 200 && data) {
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