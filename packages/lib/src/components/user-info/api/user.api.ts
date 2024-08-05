import { useLabels } from "../context/LabelsContext";
import { baseApiHander } from "../../../utils/base.api";


const apiUrlList = {
  editUserInfo: `/ddream/api/v1/user/info/edit`,
  getUserInfo: `/ddream/api/v1/user/info/get`,
}

export function getUserInfo() {
  const labels = useLabels();
  return baseApiHander({
    url: apiUrlList.getUserInfo,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function editUserInfo() {
  const labels = useLabels();
  return baseApiHander({
    url: apiUrlList.editUserInfo,
    mustLogin: true,
    noLoginGotoLogin: true,
    successMsg: labels.User.edituserinfosuccess
  })
}
