const os = require('os');

let totalMemorty = os.totalmem();
let freeMemory = os.freemem();

console.log(`${freeMemory} memory free of ${totalMemorty}`);