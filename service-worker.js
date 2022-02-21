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

chrome.tabs.onUpdated.addListener(async (...rest) => {
  log('tab update', rest)
  const [tabId, changeInfo, tab] = rest
  if (/https:\/\/www.tiktok.com\/.+\/video\//.test(tab.url)) {
    log('onUpdate match')
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: autoNext,
    })
  }
})

function autoNext() {
  if (!window.autoNextFn) {
    window.autoNextFn = e => {
      const nextArrow = document.querySelector('[data-e2e="arrow-right"]')
      console.log('next', nextArrow, e)
      if (e.target.tagName === 'VIDEO' && nextArrow) {
        nextArrow.click()
      }
    }
  }

  document.addEventListener('ended', window.autoNextFn, true)
}
