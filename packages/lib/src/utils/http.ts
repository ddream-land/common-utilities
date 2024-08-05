import Auth from './auth'
import Url from './url'

export async function http({
  url,
  init,
  mustLogin = true,
  onNotLogin,
}: {
  url: string
  init?: RequestInit
  mustLogin?: boolean
  onNotLogin?: () => void
}) {
  if (mustLogin && !Auth.isLogin) {
    onNotLogin && onNotLogin()
    return
  }

  const params = mustLogin
    ? new URLSearchParams({
        uid: Auth.uid ?? '',
        session: Auth.session ?? '',
      })
    : undefined

  const fullUrl = Url.getFullUrl(url, params)

  return await fetch(fullUrl, init)
}
