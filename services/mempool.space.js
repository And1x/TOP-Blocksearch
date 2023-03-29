const hostname = "https://mempool.space";

export async function getCurrentBlockHeight() {
  let url = `${hostname}/api/blocks/tip/height`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    // todo: dont use console.log for err handling
    console.log(error);
  }
}

export async function getBlockByHeight(height) {
  // 1. get the block hash of the given height
  let hash = await getBlockHashByHeigth(height);
  // 2. then get the block infos
  return await getBlockByHash(hash);
}

export async function getBlockByHash(hash) {
  try {
    let url = `${hostname}/api/block/${hash}`;
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getBlockHashByHeigth(height) {
  let url = `${hostname}/api/block-height/${height}`;
  try {
    let res = await fetch(url);
    return await res.text();
  } catch (error) {
    console.log(error);
  }
}

export async function getTxByTxid(txid) {
  let url = `${hostname}/api/tx/${txid}`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
