export type VoiceModelType = {
  id: number;
  src: string,
  name: string,
  count: number,
  star: boolean,
  publish_id: string,
  model_id: string,
  publish_info: {
    name: string,
  },
  tone: Array<VoiceModelToneType>,
};


export type VoiceModelToneType = {
  tone_type: string
  audio_url: string
  text: string
}


export type VoiceModelFilterType = {
  type: "gril" | "boy" | "male" | "female" | "collection" | "browse" | ""
  name: string
  language: 'en' | 'zh' | 'ja' | ''
};