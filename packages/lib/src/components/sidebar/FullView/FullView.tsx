import classes from './FullView.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SplitLine from './SplitLine/SplitLine.tsx'
import Header from './Header/Header.tsx'
import Discover from './Discover/Discover.tsx'
import Studio from './Studio/Studio.tsx'
import Engine from './Engine/Engine.tsx'

type FullViewProps = Readonly<{
  lang: 'en' | 'zh-CN'
  title: {
    name: string
    color?: string
  }
}>

export default function FullView({ lang, title }: FullViewProps) {
  return (
    <div className={`${classes.full} w-full h-full p-4 overflow-y-auto scrollbar-override`}>
      <Header title={title}></Header>

      <SplitLine className={`mt-6`}></SplitLine>

      <Discover lang={lang} className="mt-6"></Discover>

      <SplitLine className={`mt-6`}></SplitLine>

      <Studio lang={lang} className="mt-6"></Studio>

      <SplitLine className={`mt-6`}></SplitLine>

      <Engine lang={lang} className="mt-6"></Engine>

      <SplitLine className={`mt-6`}></SplitLine>

      <div className={`${classes.recent}`}></div>
    </div>
  )
}
