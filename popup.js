async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

const checkbox = document.getElementById('autoNext')

checkbox.addEventListener('change', async e => {
  const checked = e.target.checked
  const tab = await getCurrentTab()
  console.log(tab)

  if (checked) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: autoNext,
    })
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: cancelAutoNext,
    })
  }
})

/**
 *
 */
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

function cancelAutoNext() {
  document.removeEventListener('ended', window.autoNextFn, true)
}
