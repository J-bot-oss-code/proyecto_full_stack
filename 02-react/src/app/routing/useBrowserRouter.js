import { useCallback, useEffect, useState } from 'react'

function readLocation() {
  return { pathname: window.location.pathname, search: window.location.search }
}

export function useBrowserRouter() {
  const [location, setLocation] = useState(readLocation)

  useEffect(() => {
    function handlePopState() {
      setLocation(readLocation())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((eventOrPath) => {
    if (typeof eventOrPath === 'string') {
      window.history.pushState({}, '', eventOrPath)
      setLocation(readLocation())
      window.scrollTo(0, 0)
      return
    }

    if (
      eventOrPath.defaultPrevented ||
      eventOrPath.button !== 0 ||
      eventOrPath.metaKey ||
      eventOrPath.ctrlKey ||
      eventOrPath.shiftKey ||
      eventOrPath.altKey
    ) {
      return
    }

    const url = new URL(eventOrPath.currentTarget.href, window.location.href)
    if (url.origin !== window.location.origin) return

    eventOrPath.preventDefault()
    window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`)
    setLocation(readLocation())
    window.scrollTo(0, 0)
  }, [])

  return { ...location, navigate }
}
