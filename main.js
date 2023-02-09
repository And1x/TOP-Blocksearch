// html-els
const blockHeight = document.querySelector("#blockHeight");

// fetch it baby

async function getCurrentBlock() {
  let url = "https://mempool.space/api/blocks/tip/height";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    // todo: dont use console.log for err handling
    console.log(error);
  }
}

// could use a async function aswell to await getCurrentBlock in there
getCurrentBlock().then(function (res) {
  blockHeight.innerText = res;
});
