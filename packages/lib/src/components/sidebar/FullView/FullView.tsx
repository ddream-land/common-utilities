import classes from './FullView.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SplitLine from './SplitLine/SplitLine.tsx'
import Header from './Header/Header.tsx'
import Discover from './Discover/Discover.tsx'
import Studio from './Studio/Studio.tsx'
import Engine from './Engine/Engine.tsx'
import Recent from './Recent/Recent.tsx'
import { SidebarTitle, SupportLangs, RecentItem } from '../types.ts'

type FullViewProps = Readonly<{
  lang: SupportLangs
  title: SidebarTitle
  recordRecent?: RecentItem
}>

export default function FullView({ lang, title, recordRecent }: FullViewProps) {
  return (
    <div className={`${classes.full} w-full h-full overflow-y-auto scrollbar-override`}>
      <Header title={title}></Header>

      <SplitLine className={`mt-6`}></SplitLine>

      <Discover lang={lang} className="mt-6"></Discover>

      <SplitLine className={`mt-6`}></SplitLine>

      <Studio lang={lang} className="mt-6"></Studio>

      <SplitLine className={`mt-6`}></SplitLine>

      <Engine lang={lang} className="mt-6"></Engine>

      <SplitLine className={`mt-6`}></SplitLine>

      <Recent lang={lang} className="my-6" recordRecent={recordRecent}></Recent>
    </div>
  )
}
