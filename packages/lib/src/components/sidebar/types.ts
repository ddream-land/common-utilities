export type SidebarSize = 'mini' | 'full'

export type SidebarTitle = {
  name: string
  color?: string
}

export type RecentItem = {
  key: string
  openUrl: string
  name: {
    en: string
    'zh-CN': string
  }
  iconUrlOrBase64?: string
}
