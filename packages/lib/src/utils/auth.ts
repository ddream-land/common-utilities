import { getCookie, removeCookie } from 'typescript-cookie'
import { NUWA_SESSION, NUWA_UID } from './constant'
import { http } from './http'

const auth = {
  get isLogin() {
    if (typeof window !== 'undefined') {
      return !!(this.uid && this.session)
    }
    return false
  },

  get uid() {
    return getCookie(NUWA_UID)
  },

  get session() {
    return getCookie(NUWA_SESSION)
  },

  logout: async function () {
    if (!this.isLogin) {
      return
    }
    try {
      await http({
        url: `/ddream/api/v1/user/logout`,
        init: {
          method: 'POST',
        },
        mustLogin: true,
      })
    } catch {}

    removeCookie(NUWA_UID)
    removeCookie(NUWA_SESSION)
  },
}

export default auth
