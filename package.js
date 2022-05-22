const pkg = require('./package.json');

module.exports = {
    buildBanner() {
        const version = pkg.version;
        const author = pkg.author;

        return `
        /* fetchify v${version}  
        | (c) by ${author} 
        */`

    }
}