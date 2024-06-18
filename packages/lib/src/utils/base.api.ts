import { getCookie } from 'typescript-cookie'

export const NUWAUID = 'nuwa_uid'
export const NUWASESSION = 'nuwa_session'

const baseUrl = 'https://roleai-server.nuwalabs.org'

export function getIsLogin() {
  if (typeof document !== 'undefined') {
    const uid = getCookie(NUWAUID)
    const session = getCookie(NUWASESSION)
    return !!(uid && session)
  }
  return false
}

export async function baseApiHander({
  url,
  init,
  mustLogin = true,
  onNotLogin,
}: {
  url: string | URL | globalThis.Request
  init?: RequestInit
  mustLogin?: boolean
  onNotLogin?: () => void
}) {
  const isLogin = getIsLogin()
  if (mustLogin && !isLogin) {
    onNotLogin && onNotLogin()
    return
  }

  const fullUrl =
    `${baseUrl}${url}` +
    (mustLogin
      ? `?${new URLSearchParams({
          uid: getCookie(NUWAUID) ?? '',
          session: getCookie(NUWASESSION) ?? '',
        }).toString()}`
      : '')

  return await fetch(fullUrl, init)
}
