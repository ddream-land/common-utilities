import { useState } from 'react'

let MINIFY_TIMER_SIGNAL: number | undefined

export function useMouseHoverOp(minifyTimeout: number) {
  const [minify, setMinify] = useState(true)

  function mouseOnPanel() {
    MINIFY_TIMER_SIGNAL && clearTimeout(MINIFY_TIMER_SIGNAL)
    setMinify(false)
  }

  function mouseOutofPanel() {
    MINIFY_TIMER_SIGNAL && clearTimeout(MINIFY_TIMER_SIGNAL)
    MINIFY_TIMER_SIGNAL = window.setTimeout(() => {
      setMinify(true)
    }, MINIFY_TIMER_SIGNAL)
  }

  return {
    mouseOnPanel,
    mouseOutofPanel,

    minify,
  }
}
