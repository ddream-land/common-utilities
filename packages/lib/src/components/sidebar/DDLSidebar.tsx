'use client'
import classes from './DDLSidebar.module.scss'
import { useLanguageManager } from '../../useLanguageManager'
import { useMouseHoverOp } from './useMouseHoverOp.ts'
import MiniView from './MiniView/MiniView.tsx'
import FullView from './FullView/FullView.tsx'

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
    openUrl: string
  }
  minifyTimeout?: number
}>

export function DDLSidebar(props: DDLSidebarProps) {
  const { children, lang = 'en', title, minifyTimeout = 2000, forceSize } = props

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
          showFullPanel ? '' : classes.minify
        } w-full pointer-events-auto bg-transparent`}
      >
        <div className={`${classes.miniPanel} ${showFullPanel ? 'hidden' : ''} w-full h-full`}>
          <MiniView title={title}></MiniView>
        </div>
        <div className={`${classes.fullPanel} ${showFullPanel ? '' : 'hidden'} w-full h-full`}>
          <FullView lang={lang} title={title}></FullView>
        </div>
      </div>
    </div>
  )
}
