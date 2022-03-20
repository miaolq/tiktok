const keys = {
  autoNext: 'autoNext',
}

chrome.runtime.onInstalled.addListener(async details => {
  console.log('extension installed', details)
  // 默认disable
  chrome.action.disable()

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: '.tiktok.com' },
            css: ['[data-e2e="arrow-right"]'],
          }),
        ],
        // 作用类似enable
        actions: [new chrome.declarativeContent.ShowAction()],
      },
    ])
  })

  const autoNext = await chrome.storage.local.get(keys.autoNext)
  if (autoNext) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: autoNext,
        // args:[]
        // files:[] // only support one file
      },
      results => {}
    )
  }
})

// chrome.tabs.onUpdated.addListener(async (...rest) => {
//   log('tab update', rest)
//   const [tabId, changeInfo, tab] = rest
//   if (/https:\/\/www.tiktok.com\/.+\/video\//.test(tab.url)) {
//     log('onUpdate match')

//   }
// })

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
