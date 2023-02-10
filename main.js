import {
  getCurrentBlockHeight,
  getBlockByHeight,
  getBlockByHash,
  getBlockHashByHeigth,
} from "./services/mempool.space.js";

// html-els
const containerEl = document.querySelector(".container");
const blockHeightEl = document.querySelector("#blockHeight");
const searchEl = document.querySelector("#search");
const searchBtnEl = document.querySelector("#search-btn");

// global vars
let currentBlockHeight;

// validator function
const isHexadecimal = (str) => /^[A-F0-9]+$/i.test(str);

searchBtnEl.addEventListener("click", (e) => {
  e.preventDefault();
  let searchInput = searchEl.value;
  // todo: filter if input is blockheight, block-id and evtl. txid
  searchInputSwitch(searchInput);

  // if (!isNaN(searchInput) && searchInput <= currentBlockHeight) {
  //   getBlockByHeight(Number(searchInput)).then(function (res) {
  //     removeBlockInfoTable();
  //     containerEl.appendChild(createBlockInfoTable(res));
  //   });
  // } else {
  //   console.log("wrong input yoo");
  // }
});

// ####################
// app logic block - or init()??
getCurrentBlockHeight().then(function (height) {
  const blocktimeMsg = `Current Blocktime: ${height}`;
  blockHeightEl.innerText = blocktimeMsg;

  currentBlockHeight = height;

  getBlockByHeight(height).then(function (res) {
    containerEl.appendChild(createBlockInfoTable(res));
  });
});

// note: see n1 in README
function searchInputSwitch(searchInput) {
  if (isHexadecimal(searchInput) && searchInput.length === 64) {
    // find block by Hash -> if no result use hash to search TX
    getBlockByHash(searchInput).then(function (block) {
      removeBlockInfoTable();
      containerEl.appendChild(createBlockInfoTable(block));
    });
  } else if (
    Number(searchInput) <= Number(currentBlockHeight) &&
    Number(searchInput) >= 0
  ) {
    getBlockByHeight(Number(searchInput)).then(function (heigth) {
      removeBlockInfoTable();
      containerEl.appendChild(createBlockInfoTable(heigth));
    });
  }
}

// ####################
// create HTML elements
function createBlockInfoTable(tableData) {
  let table = document.createElement("table");
  table.setAttribute("id", "blockinfo-table");
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

function removeBlockInfoTable() {
  const table = document.getElementById("blockinfo-table");
  if (table) {
    table.remove();
  }
}

// npub1752z39hdxwsx9xte0pjr8pmehg3f53mxj09qx7362le9gs8ef5gs6y6uhs
