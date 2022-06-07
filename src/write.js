const buildList = require('./buildList');

(async () => {
  console.log(JSON.stringify(await buildList(), null, 2));
})();