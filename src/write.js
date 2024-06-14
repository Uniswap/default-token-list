const buildList = require("./buildList");

async function fetchDataAndLog() {
  try {
    const data = await buildList();
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Failed to build list:", error);
  }
}

fetchDataAndLog();
