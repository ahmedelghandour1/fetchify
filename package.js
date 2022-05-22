const pkg = require('./package.json');

module.exports = {
    buildBanner() {
        const version = pkg.version;
        const author = pkg.author;
        const url = pkg.homepage;
        const getYearsRange = () => {
            return `2021 - ${new Date().getFullYear()}`;
        };

        const license = pkg.license

        return `/** 
 * fetchify v${version} (${url})
 * Copyright ${getYearsRange()} | Author ${author}
 * Licensed under ${license} (https://github.com/ahmedElghandour1/fetchify/blob/Mmaster/LICENSE)
 */`

    }
}