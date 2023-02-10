// html-els
const containerEl = document.querySelector(".container");
const blockHeightEl = document.querySelector("#blockHeight");

const hostname = "https://mempool.space";

// fetch it baby

async function getCurrentBlockHeight() {
  let url = `${hostname}/api/blocks/tip/height`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    // todo: dont use console.log for err handling
    console.log(error);
  }
}

async function getBlockByHeight(height) {
  // 1. get the block hash of the given height
  let hash = await getBlockHashByHeigth(height);
  // 2. then get the block infos
  try {
    let url = `${hostname}/api/block/${hash}`;
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getBlockHashByHeigth(height) {
  let url = `${hostname}/api/block-height/${height}`;
  try {
    let res = await fetch(url);
    return await res.text();
  } catch (error) {
    console.log(error);
  }
}

// could use a async function aswell to await getCurrentBlock in there
getCurrentBlockHeight().then(function (res) {
  const blocktimeMsg = `Current Blocktime: ${res}`;
  blockHeightEl.innerText = blocktimeMsg;
});

getBlockByHeight(775769).then(function (res) {
  containerEl.appendChild(createBlockInfoTable(res));
});

// ####################
// create HTML elements
function createBlockInfoTable(tableData) {
  let table = document.createElement("table");
  let thead = table.createTHead();
  let tRow = thead.insertRow();

  let tDesc = document.createElement("th");
  tDesc.innerText = "Desc.";
  let tVal = document.createElement("th");
  tVal.innerText = "Value";

  tRow.appendChild(tDesc);
  tRow.appendChild(tVal);

  // tableBody
  let tbody = document.createElement("tbody");

  for (const [key, value] of Object.entries(tableData)) {
    let tempRow = tbody.insertRow();
    let tempCellKey = tempRow.insertCell();
    let tempCellValue = tempRow.insertCell();
    tempCellKey.appendChild(document.createTextNode(key));
    tempCellValue.appendChild(document.createTextNode(value));
  }
  table.appendChild(tbody);

  return table;
}
