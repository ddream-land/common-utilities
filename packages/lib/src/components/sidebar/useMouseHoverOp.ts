import { useState } from 'react'

let MINIFY_TIMER_SIGNAL: number | undefined

export function useMouseHoverOp(minifyTimeout: number) {
  const [minify, setMinify] = useState(true)

  function mouseOnPanel() {
    clearTimeout()
    setMinify(false)
  }

  function mouseOutofPanel() {
    clearTimeout()
    MINIFY_TIMER_SIGNAL = window.setTimeout(() => {
      setMinify(true)
    }, minifyTimeout)
  }

  function clearTimeout() {
    MINIFY_TIMER_SIGNAL && window.clearTimeout(MINIFY_TIMER_SIGNAL)
  }

  return {
    mouseOnPanel,
    mouseOutofPanel,

    minify,
    setMinify,

    clearTimeout,
  }
}
