export function loadScript (src) {
    const s = document.createElement('script')

    return new Promise((resolve, reject) => {
        s.onload = resolve
        s.onabort = reject
        s.onerror = reject

        s.src = src

        document.body.appendChild(s)
    })
}

export default { loadScript }
