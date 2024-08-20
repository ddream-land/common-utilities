import { useLabels } from "../context/LabelsContext";
import { baseApiHander } from "../../../utils/base.api";;


const apiUrlList = {
  register: `/ddream/api/v1/user/registered`,
  mailCode: `/ddream/api/v1/user/code`,
  login: `/ddream/api/v1/user/passwd_login`,
  codeLogin: `/ddream/api/v1/user/code/login`,
  logout: `/ddream/api/v1/user/logout`,
  resetPassword: `/ddream/api/v1/user/reset_passwd`,
  deleteUser: `/ddream/api/v1/user/delete`,
  phoneCodeVerify: `/ddream/api/v1/user/phone/code/verify`
}

export function mailCode() {
  const labels = useLabels();
  return baseApiHander({
    url: apiUrlList.mailCode,
    successMsg: labels.User.mailcodesuccess
  })
}

export function register() {
  const labels = useLabels();
  return baseApiHander({
    url: apiUrlList.register,
    successMsg: labels.UserRegister.success
  })
}

export function resetPassword() {
  const labels = useLabels();
  return baseApiHander({
    url: apiUrlList.resetPassword,
    successMsg: labels.UserResetPassword.success
  })
}

export function deleteUser() {
  const labels = useLabels();
  return baseApiHander({
    url: apiUrlList.deleteUser,
    mustLogin: true,
    successMsg: labels.UserDeleteUser.success
  })
}

export function login() {
  return baseApiHander({
    url: apiUrlList.login
  })
}

export function codeLogin() {
  return baseApiHander({
    url: apiUrlList.codeLogin
  })
}

export function logout() {
  return baseApiHander({
    url: apiUrlList.logout
  })
}

export function phoneCodeVerify() {
  return baseApiHander({
    url: apiUrlList.phoneCodeVerify
  })
}