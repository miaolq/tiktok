// document.body.addEventListener('keydown', e => {
// console.log(e)
// })

    //   const timeout = setInterval(() => {

    //     document.body.dispatchEvent(
    //       new KeyboardEvent('keydown', {
    //         isTrusted: true,
    //         key: 'ArrowDown',
    //         code: 'ArrowDown',
    //         keyCode: 40,
    //         which: 40,
    //       })
    //     )
    //     console.log('run')
    //   }, [2000])

1. keydown isTrust 是 false ，不起作用

## readed

1. https://developer.chrome.com/blog/mv3-actions/
2. Rules are persistent across browsing sessions. Therefore, you should install rules during extension installation time using the runtime.onInstalled event. Note that this event is also triggered when an extension is updated. Therefore, you should first clear previously installed rules and then register new rules.

