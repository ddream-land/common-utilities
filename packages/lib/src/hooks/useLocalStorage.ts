import { useState, useEffect } from 'react'

function getStorageValue<T = any>(key: string, defaultValue: T): T {
  const valStr = window && localStorage && localStorage.getItem(key)
  let initial: T | undefined = undefined
  if (valStr) {
    try {
      initial = JSON.parse(valStr)
    } catch {}
  }
  return initial || defaultValue
}

export function useLocalStorage<T = any>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(function () {
    return getStorageValue(key, defaultValue)
  })

  useEffect(
    function () {
      window && localStorage &&localStorage.setItem(key, JSON.stringify(value))
    },
    [key, value]
  )

  return [value, setValue]
}
