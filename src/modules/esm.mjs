// esm.mjs

import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';

const random = Math.random();

let unknownObject;

if (random > 0.5) {
  unknownObject = import('./files/a.json').then(module => module.default);
} else {
  unknownObject = import('./files/b.json').then(module => module.default);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.url}`);
console.log(`Path to current directory is ${path.dirname(import.meta.url)}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

unknownObject.then(obj => {
  console.log(obj);
});

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
