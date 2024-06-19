import { getCookie } from 'typescript-cookie'
import { NUWA_SESSION, NUWA_UID } from './constant'

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
}

export default auth
