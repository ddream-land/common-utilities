'use client'
import classes from './DDLSidebar.module.scss'
import { useLanguageManager } from '../../useLanguageManager'
import { useMouseHoverOp } from './useMouseHoverOp.ts'
import MiniView from './MiniView/MiniView.tsx'
import FullView from './FullView/FullView.tsx'
import { RecentItem, SidebarSize, SidebarTitle } from './types.ts'
import { useEffect } from 'react'
import { SupportLangs } from '../../types/SupportLangs.ts'

export type DDLSidebarProps = Readonly<{
  children?: React.ReactNode
  lang?: SupportLangs
  title: SidebarTitle
  forceSize?: SidebarSize
  recordRecent?: RecentItem
  minifyTimeout?: number
  onPanelSizeChange?: (toFull: boolean) => void
}>

export function DDLSidebar(props: DDLSidebarProps) {
  const {
    children,
    lang = 'en',
    title,
    minifyTimeout = 2000,
    forceSize,
    recordRecent,
    onPanelSizeChange,
  } = props

  const {} = useLanguageManager(lang)
  const { mouseOnPanel, mouseOutofPanel, minify, setMinify, clearTimeout } =
    useMouseHoverOp(minifyTimeout)

  const showFullPanel = (forceSize === 'full' || !minify) && forceSize !== 'mini'

  useEffect(
    function () {
      onPanelSizeChange && onPanelSizeChange(showFullPanel)
    },
    [showFullPanel]
  )

  useEffect(
    function () {
      clearTimeout()
      if (forceSize === 'mini' || forceSize === undefined) {
        setMinify(true)
      } else if (forceSize === 'full') {
        setMinify(false)
      }
    },
    [forceSize]
  )

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
          <FullView lang={lang} title={title} recordRecent={recordRecent}></FullView>
        </div>
      </div>
    </div>
  )
}
