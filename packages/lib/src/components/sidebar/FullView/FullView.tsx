import classes from './FullView.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { DDLSplitLine } from '../../splitLine/DDLSplitLine.tsx'
import Header from './Header/Header.tsx'
import Discover from './Discover/Discover.tsx'
import Studio from './Studio/Studio.tsx'
import Engine from './Engine/Engine.tsx'
import Recent from './Recent/Recent.tsx'
import { SupportLangs } from '@/types/SupportLangs'
import { SidebarTitle, RecentItem } from '../types.ts'

type FullViewProps = Readonly<{
  lang: SupportLangs
  title: SidebarTitle
  recordRecent?: RecentItem
}>

export default function FullView({ lang, title, recordRecent }: FullViewProps) {
  return (
    <div className={`${classes.full} w-full h-full overflow-y-auto scrollbar-override`}>
      <Header title={title}></Header>

      <DDLSplitLine className={`mt-6 px-8`}></DDLSplitLine>

      <Discover lang={lang} className="mt-6"></Discover>

      <DDLSplitLine className={`mt-6 px-8`}></DDLSplitLine>

      <Studio lang={lang} className="mt-6"></Studio>

      <DDLSplitLine className={`mt-6 px-8`}></DDLSplitLine>

      <Engine lang={lang} className="mt-6"></Engine>

      <DDLSplitLine className={`mt-6 px-8`}></DDLSplitLine>

      <Recent lang={lang} className="my-6" recordRecent={recordRecent}></Recent>
    </div>
  )
}
