import { baseApiHander } from "../../../utils/base.api"

const apiUrlList = {
  charaGenerate: `/nuwa/api/characters/generate/field`,
  charaCreate: `/nuwa/api/characters/create`,
  getVoicePublishList: `/ddream/api/v1/voice/publish/square`,
}

export function charaGenerate() {
  return baseApiHander({
    url: apiUrlList.charaGenerate,
    mustLogin: true,
    noLoginGotoLogin: true
  })
}

export function charaCreate() {
  return baseApiHander({
    url: apiUrlList.charaCreate,
    mustLogin: true,
    noLoginGotoLogin: true
  })
}

export function getVoicePublishList() {
  return baseApiHander({
    url: apiUrlList.getVoicePublishList,
    mustLogin: true,
    noLoginGotoLogin: true
  })
}