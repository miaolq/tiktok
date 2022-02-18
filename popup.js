async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

const checkbox = document.getElementById('autoNext')

checkbox.addEventListener('change', async e => {
  const checked = e.target.checked
  const tab = await getCurrentTab()

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: autoNext,
  })
})

function autoNext() {
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  toggleFullScreen()

  const nextArrow = document.querySelector('[data-e2e="arrow-right"]')
  console.log('nextArrow', nextArrow, window.autoNextFn, window.autoNextOpen)
  const video = document.querySelector('video')

  if (!window.autoNextFn) {
    window.autoNextFn = e => {
      console.log('next', e)
      nextArrow.click()

      if (e.target.targetName === 'VIDEO') {
        // nextArrow.click()
      }
    }
  }

  if (window.autoNextOpen) {
    document.removeEventListener('ended', window.autoNextFn, true)
    window.autoNextOpen = false
  } else {
    document.addEventListener('ended', window.autoNextFn, true)
    window.autoNextOpen = true
  }
}
