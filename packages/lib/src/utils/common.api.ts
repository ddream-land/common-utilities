import { baseApiHander } from "./base.api";

const commonUrlList = {
  uploadFile: `/ddream/api/v1/common/upload_file`
}

export function uploadFileToServer(onUploadProgress: any) {
  return baseApiHander({
    url: commonUrlList.uploadFile,
    isBody: true,
    isUpload: true,
    mustLogin: true,
    noLoginGotoLogin: true,
    onUploadProgress: onUploadProgress
  })
}
