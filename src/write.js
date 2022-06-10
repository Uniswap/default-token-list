const buildList = require('./buildList');

buildList().then(data => console.log(JSON.stringify(data, null, 2)));