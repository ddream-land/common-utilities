'use client'
import classes from './DDLSidebar.module.scss'
import { useLanguageManager } from '../../useLanguageManager'
import { useMouseHoverOp } from './useMouseHoverOp.ts'
import MiniView from './MiniView/MiniView.tsx'

export type DDLSidebarProps = Readonly<{
  children?: React.ReactNode
  lang?: 'en' | 'zh-CN'
  title: {
    name: string
    color?: string
  }
  forceSize?: 'mini' | 'full'
  recordRecent?: {
    key: string
    iconUrl: string
    name: {
      en: string
      'zh-CN': string
    }
  }
  minifyTimeout?: number
}>

export function DDLSidebar(props: DDLSidebarProps) {
  const { children, lang, title, minifyTimeout = 2000, forceSize } = props

  const {} = useLanguageManager(lang)
  const { mouseOnPanel, mouseOutofPanel, minify } = useMouseHoverOp(minifyTimeout)

  const showFullPanel = (forceSize === 'full' || !minify) && forceSize !== 'mini'

  return (
    <div className={`${classes.sidebar} w-full h-full bg-transparent pointer-events-none`}>
      <div
        onMouseEnter={mouseOnPanel}
        onMouseOver={mouseOnPanel}
        onMouseLeave={mouseOutofPanel}
        className={`${classes.wrapper} ${
          showFullPanel ? 'overflow-y-auto scrollbar-override' : classes.minify
        } w-full pointer-events-auto bg-transparent`}
      >
        <div
          className={`${classes.miniPanel} ${showFullPanel ? classes.fadeInOut : ''} w-full h-full`}
        >
          <MiniView title={title}></MiniView>
        </div>
        <div className={`${classes.fullPanel} w-full h-full p-4 hidden`}></div>
      </div>
    </div>
  )
}
