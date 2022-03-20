function autoNext() {
  if (!window.__autoNextFn) {
    window.__autoNextFn = e => {
      const nextArrow = document.querySelector('[data-e2e="arrow-right"]')
      if (e.target.tagName === 'VIDEO' && nextArrow) {
        nextArrow.click()
      }
    }
  }

  // TODO: video ended事件不冒泡，此处使用true。捕获阶段做事件代理
  document.addEventListener('ended', window.__autoNextFn, true)
}

function cancelNext() {
  if (window.__autoNextFn) {
    document.removeEventListener('ended', window.__autoNextFn, true)
    delete window.__autoNextFn
  }
}

async function start() {
  const open = (await chrome.storage.local.get('autoNext')).autoNext
  if (open) {
    autoNext()
  } else {
    cancelNext()
  }
}

start()

chrome.storage.onChanged.addListener(data => {
  if ('autoNext' in data) {
    start()
  }
})
