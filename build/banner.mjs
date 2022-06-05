import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), { encoding: 'utf8' }));
export function buildBanner() {
    const version = pkg.version;
    const author = pkg.author;
    const url = pkg.homepage;
    const getYearsRange = () => {
        return `2021 - ${new Date().getFullYear()}`;
    };

    const license = pkg.license;

    return `/** 
 * fetchify v${version} (${url})
 * Copyright ${getYearsRange()} | Author: ${author}
 * Licensed under ${license} (https://github.com/ahmedElghandour1/fetchify/blob/master/LICENSE)
 */
`;

}