const fs = require('fs');
const moment = require('moment');

let weddings = JSON.parse(fs.readFileSync('./data/wedding.json'));


let casamentos15a50 = weddings.filter(wedding => (wedding.BUDGET >= 15000) && (wedding.BUDGET < 50000));
console.log(casamentos15a50.length);

let casamentos50a100 = weddings.filter(wedding => (wedding.BUDGET >= 50000) && (wedding.BUDGET < 100000));
console.log(casamentos50a100.length);

let casamentos100a150 = weddings.filter(wedding => (wedding.BUDGET >= 100000) && (wedding.BUDGET < 150000));
console.log(casamentos100a150.length);

let casamentos150a200 = weddings.filter(wedding => (wedding.BUDGET >= 150000) && (wedding.BUDGET < 200000));
console.log(casamentos150a200.length);

let casamentos200a250 = weddings.filter(wedding => (wedding.BUDGET >= 200000) && (wedding.BUDGET < 250000));
console.log(casamentos200a250.length);

let casamentos250a300 = weddings.filter(wedding => (wedding.BUDGET >= 250000) && (wedding.BUDGET < 300000));
console.log(casamentos250a300.length);

let casamentos300mais = weddings.filter(wedding => (wedding.BUDGET >= 300000));
console.log(casamentos300mais.length);