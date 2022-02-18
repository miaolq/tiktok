function log(...rest) {
  return console.log(...rest)
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

chrome.runtime.onInstalled.addListener(async () => {
  log('extension installed')
  //   const tab = await getCurrentTab()
  //   log(tab)
})
