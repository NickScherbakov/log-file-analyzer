import { useEffect } from 'react'

// Lightweight analytics injector.
// Supports: Plausible (privacy friendly), Google Analytics (gtag), Yandex Metrica.
// Env vars (set via repo variables or secrets):
//  - VITE_PLAUSIBLE_DOMAIN
//  - VITE_GA_ID (e.g. G-XXXXXXXXXX)
//  - VITE_YM_ID (numeric counter id)
// Scripts are added only if corresponding env var provided.

export function Analytics() {
  useEffect(() => {
    const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN
    const gaId = import.meta.env.VITE_GA_ID
    const ymId = import.meta.env.VITE_YM_ID

    if (plausibleDomain) {
      const script = document.createElement('script')
      script.defer = true
      script.setAttribute('data-domain', plausibleDomain)
      script.src = 'https://plausible.io/js/script.js'
      document.head.appendChild(script)
    }

    if (gaId) {
      const gaScript = document.createElement('script')
      gaScript.async = true
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      document.head.appendChild(gaScript)

      const inline = document.createElement('script')
      inline.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`
      document.head.appendChild(inline)
    }

    if (ymId) {
      const ymScript = document.createElement('script')
      ymScript.type = 'text/javascript'
      ymScript.innerHTML = `
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].q=m[i].q||[]).push(arguments)};m[i].l=1*new Date();
        k=e.createElement(t),a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})
        (window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
        ym(${ymId}, 'init', { clickmap:true, trackLinks:true, accurateTrackBounce:true });
      `
      document.head.appendChild(ymScript)
      const noscript = document.createElement('noscript')
      noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${ymId}" style="position:absolute; left:-9999px;" alt="" /></div>`
      document.body.appendChild(noscript)
    }
  }, [])
  return null
}
