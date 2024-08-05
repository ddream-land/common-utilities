import { baseApiHander } from "./base.api";

const DigitalLifeUrlList = {
  getDigitalLifeSqure: `/nuwa/api/characters/public/all`,
  getDigitalLifeInfo: `/nuwa/api/characters/get`,
  getDigitalLifeInfoPublic: `/nuwa/api/characters/public_info/get`,
  getDigitalLifeMyPublished: `/nuwa/api/characters/public/my_published`,
  getDigitalLifeCollectList: `/nuwa/api/characters/collect/list`,
  collectCancelDigitalLife: `/nuwa/api/characters/collect`,
  runDigitalLife: `/nuwa/api/characters/add/run`,
  exportDigitalLifeCard: `/nuwa/api/characters/export`,
};

export function getDigitalLifeSqure() {
  return baseApiHander({
    url: DigitalLifeUrlList.getDigitalLifeSqure,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}

export function getDigitalLifeInfo() {
  return baseApiHander({
    url: DigitalLifeUrlList.getDigitalLifeInfo,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}

export function getDigitalLifeInfoPublic() {
  return baseApiHander({
    url: DigitalLifeUrlList.getDigitalLifeInfoPublic,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}

export function getDigitalLifeMyPublished() {
  return baseApiHander({
    url: DigitalLifeUrlList.getDigitalLifeMyPublished,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}

export function getDigitalLifeCollectList() {
  return baseApiHander({
    url: DigitalLifeUrlList.getDigitalLifeCollectList,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}

export function collectCancelDigitalLife() {
  return baseApiHander({
    url: DigitalLifeUrlList.collectCancelDigitalLife,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}

export function runDigitalLife() {
  return baseApiHander({
    url: DigitalLifeUrlList.runDigitalLife,
    mustLogin: true,
    noLoginGotoLogin: true,
  });
}

export function exportDigitalLifeCard() {
  return baseApiHander({
    url: DigitalLifeUrlList.exportDigitalLifeCard,
    mustLogin: true,
    noLoginGotoLogin: true,
    isBlob: true,
  });
}
