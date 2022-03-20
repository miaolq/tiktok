const onIcons = {
  16: '/images/on16.png',
  32: '/images/on32.png',
  48: '/images/on48.png',
  128: '/images/on128.png',
}
const offIcons = {
  16: '/images/off16.png',
  32: '/images/off32.png',
  48: '/images/off48.png',
  128: '/images/off128.png',
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.clear()
})

chrome.action.onClicked.addListener(async () => {
  const open = (await chrome.storage.local.get('autoNext')).autoNext

  if (open) {
    chrome.storage.local.set({ autoNext: !open })
    chrome.action.setTitle({ title: 'click to enable auto next' })
    chrome.action.setIcon({
      path: offIcons,
    })
  } else {
    chrome.storage.local.set({ autoNext: !open })
    chrome.action.setTitle({ title: 'click to disable auto next' })
    chrome.action.setIcon({
      path: onIcons,
    })
  }
})
