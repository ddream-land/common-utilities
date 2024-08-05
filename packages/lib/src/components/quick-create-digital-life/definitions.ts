export type personalityDataType = {
  name: string
  isCustomer: boolean
  list: Array<{
    name: string
    isCustomer: boolean
    list: Array<{
      name: string
      selected: boolean
    }>
  }>
}

export type charaGenerateDataType = {
  description: string
  greeting_message: string
  name: string
  speech_style: string
  tag: string
}

export type charaCreateFormType = {
  ch_name: string
  description: string
  avatar: string
  personality: string
  scenario: string
  download_permission: boolean
  type: string
  first_mes: string
  mes_example: string
  creator_notes: string
  system_prompt: string
  post_history_instructions: string
  tags: Array<string>
  creator: string
  character_version: string
  alternate_greetings: Array<string>
  extensions: {
    nuwa_voices: nuwaVoicesType
    nuwa_avatars: nuwaAvatarsType
  }
}

export type nuwaVoicesType = {
  version: string
  list: Array<nuwaVoiceType>,
}

export type nuwaVoiceType = {
  publish_id: string,
  audio_url: string,
  name: string
}

export type nuwaAvatarsType = {
  version: string
  list: Array<nuwaAvatarType>
}

export type nuwaAvatarType = {
  type: string,
  url: string,
  name: string
}

export const charaCreateFormDefault: charaCreateFormType = {
  ch_name: '',
  description: '',
  avatar: '',
  personality: '',
  scenario: '',
  download_permission: true,
  type: 'public',
  first_mes: '',
  mes_example: '',
  creator_notes: '',
  system_prompt: '',
  post_history_instructions: '',
  tags: [],
  creator: '',
  character_version: '',
  alternate_greetings: [],
  extensions: {
    nuwa_voices: {
      version: '1.0',
      list: [],
    },
    nuwa_avatars: {
      version: '1.0',
      list: [],
    }
  }
}