const { resolve, join } = require('path');
const express = require('express');
const { GET } = require('./../dist/esm/build.esm');
const app = express();
const PORT = 8000;

app.listen(PORT, () => {
    console.log('You can navigate to', 'http://localhost:' + PORT);
});



app.get('*', async (request, response) => {
    console.log(request, response);
    const { data } = await GET('https://www.google.com', { responseType: 'text' });
    response.send(data)
})






