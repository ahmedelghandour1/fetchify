const { resolve, join } = require('path');
const express = require('express');
const { GET } = require('./../dist/build.common');
const app = express();
const PORT = 8000;

app.listen(PORT, () => {
    console.log('You can navigate to', 'http://localhost:' + PORT);
});



app.get('*', async (request, response) => {
    const { data, response: tt, error } = await GET('https://www.google.com', { responseType: 'text', timeout: 1 });
    console.log(data, error);
    response.send(data || error)
})






