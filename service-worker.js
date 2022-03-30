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

chrome.runtime.onInstalled.addListener(async detail => {
  chrome.storage.local.clear()
  chrome.storage.local.set({ autoNext: true })
  chrome.action.setTitle({ title: 'Click to disable autoplay' })
  chrome.action.setIcon({
    path: onIcons,
  })

  if (detail.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: 'onboarding.html',
    })
  }
})

chrome.action.onClicked.addListener(async () => {
  const open = (await chrome.storage.local.get('autoNext')).autoNext

  if (open) {
    chrome.storage.local.set({ autoNext: !open })
    chrome.action.setTitle({ title: 'Click to enable autoplay' })
    chrome.action.setIcon({
      path: offIcons,
    })
  } else {
    chrome.storage.local.set({ autoNext: !open })
    chrome.action.setTitle({ title: 'Click to disable autoplay' })
    chrome.action.setIcon({
      path: onIcons,
    })
  }
})
