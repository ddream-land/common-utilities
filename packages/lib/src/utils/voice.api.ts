import { baseApiHander } from "./base.api";

const voiceUrlList = {
  getPublishSquare: `/ddream/api/v1/voice/publish/square`,
  getModelId: `/ddream/api/v1/voice/get_model_id`,
  publish: `/ddream/api/v1/voice/publish`,
  getModelList: `/ddream/api/v1/voice/model/list`,
  getMyPublish: `/ddream/api/v1/voice/publish/my_publish`,
  getVoiceTrainRecords: `/ddream/api/v1/voice/train/records`,
  createVoiceTrain: `/ddream/api/v1/voice/train`,
  getVoiceInfHistory: `/ddream/api/v1/voice/inf/history`,
  uploadModelFile: `/ddream/api/v1/voice/upload_model_file`,
  getVoicePublishInfo: `/ddream/api/v1/voice/publish/info`,
  voiceCollect: `/ddream/api/v1/voice/collect`,
  voiceCancelCollect: `/ddream/api/v1/voice/cancel_collect`,
  downloadVoiceModel: `/ddream/api/v1/voice/download_model`,
  deleteVoiceTrain: `/ddream/api/v1/voice/train/delete`,
  getRunVoiceModelList: `/ddream/api/v1/voice/run_model/list`,
  voiceBrowse: `/ddream/api/v1/voice/browse`,
  voiceInf: `/ddream/api/v1/voice/inf`,
  getVoiceModelInfo: `/ddream/api/v1/voice/model/info`,
  taskRetrain: `/ddream/api/v1/task/retrain`,
}

export function getPublishSquare() {
  return baseApiHander({
    url: voiceUrlList.getPublishSquare,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function getModelId() {
  return baseApiHander({
    url: voiceUrlList.getModelId,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function voiceModelPublish() {
  return baseApiHander({
    url: voiceUrlList.publish,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function getModelList() {
  return baseApiHander({
    url: voiceUrlList.getModelList,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function getMyPublish() {
  return baseApiHander({
    url: voiceUrlList.getMyPublish,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function getVoiceTrainRecords() {
  return baseApiHander({
    url: voiceUrlList.getVoiceTrainRecords,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function createVoiceTrain() {
  return baseApiHander({
    url: voiceUrlList.createVoiceTrain,
    mustLogin: true,
    noLoginGotoLogin: true,
    isBody: true,
    isUpload: true,
  })
}

export function getVoiceInfHistory() {
  return baseApiHander({
    url: voiceUrlList.getVoiceInfHistory,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function uploadModelFile(onUploadProgress: any) {
  return baseApiHander({
    url: voiceUrlList.uploadModelFile,
    mustLogin: true,
    noLoginGotoLogin: true,
    isBody: true,
    isUpload: true,
    onUploadProgress: onUploadProgress
  })
}

export function getVoicePublishInfo() {  
  return baseApiHander({
    url: voiceUrlList.getVoicePublishInfo,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function voiceModelCollect() {
  return baseApiHander({
    url: voiceUrlList.voiceCollect,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function voiceModelCancelCollect() {
  return baseApiHander({
    url: voiceUrlList.voiceCancelCollect,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function downloadVoiceModel() {
  return baseApiHander({
    url: voiceUrlList.downloadVoiceModel,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function deleteVoiceTrain() {
  return baseApiHander({
    url: voiceUrlList.deleteVoiceTrain,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function getRunVoiceModelList() {
  return baseApiHander({
    url: voiceUrlList.getRunVoiceModelList,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function voiceBrowse() {
  return baseApiHander({
    url: voiceUrlList.voiceBrowse,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function voiceInf() {
  return baseApiHander({
    url: voiceUrlList.voiceInf,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function getVoiceModelInfo() {
  return baseApiHander({
    url: voiceUrlList.getVoiceModelInfo,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function taskRetrain() {
  return baseApiHander({
    url: voiceUrlList.taskRetrain,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}