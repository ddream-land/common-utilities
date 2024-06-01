import classes from './FullView.module.scss'
import { useLanguageManager } from '../../../useLanguageManager'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLanguageT } from '../../../useLanguageT'
import DDLIcon from '../DDLIcon.tsx'

type DiscoverItem = {
  iconUrl: string
  name: string
}

type StudioItem = {
  name: string
}

type EngineItem = {
  name: string
}

export default function FullView() {
  const { translation: tCurrentLang } = useLanguageT('Current Language')
  const { translation: tDiscoverLang } = useLanguageT('Discover')
  const { translation: tStudiosLang } = useLanguageT('Studios')
  const { translation: tEnginesLang } = useLanguageT('Engines')
  const { translation: tRecentLang } = useLanguageT('Recent')

  const [discoverItems] = useState<DiscoverItem[]>([
    { iconUrl: '', name: 'Game Store' },
    { iconUrl: '', name: 'Asset Store' },
    { iconUrl: '', name: 'CCCC Store' },
    { iconUrl: '', name: 'DDDD Store' },
  ])
  const [studioItems] = useState<StudioItem[]>([
    { name: '2D Avatar' },
    { name: '3D Avatar' },
    { name: 'Voice' },
    { name: 'Digital Life' },
    { name: 'World' },
    { name: 'Charactor' },
    { name: 'AAAA' },
    { name: 'BBBB' },
    { name: 'CCCC' },
    { name: 'DDDD' },
  ])
  const [engineItems] = useState<EngineItem[]>([
    { name: 'FuHsi Saga' },
    { name: 'BBBB' },
    { name: 'CCCC' },
    { name: 'DDDD' },
  ])

  useEffect(function () {
    ;(async function () {
      const ret = await axios.get('https://catfact.ninja/fact')
      console.log(ret)
    })()
  }, [])

  return (
    <div className={`${classes.full} w-full h-full p-4 hidden`}>
      <div className={`${classes.header}`}>
        <DDLIcon />
        <p>Welcom to ddream land</p>
        <p> Logo Icon</p>
        {tCurrentLang}
      </div>
      <div className={`${classes.line}`}></div>
      <div className={`${classes.panels}`}>
        <div className={`${classes.panel}`}>
          <div className={`${classes.title}`}>{tDiscoverLang}</div>
          <div className={`${classes.items}`}>
            {discoverItems.map(function (item) {
              return (
                <div
                  key={item.name}
                  className={`${classes.item} flex flex-row justify-between items-center`}
                >
                  <div className={`${classes.info} flex flex-row justify-between items-center`}>
                    <div className={`${classes.icon}`}> {item.iconUrl}</div>
                    <div className={`${classes.name}`}> {item.name}</div>
                  </div>
                  <div className={`${classes.arrow}`}>&gt;</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={`${classes.line}`}></div>

        <div className={`${classes.panel}`}>
          <div className={`${classes.title}`}>{tStudiosLang}</div>
          <div className={`${classes.items}`}>
            {studioItems.map(function (item) {
              return (
                <div
                  key={item.name}
                  className={`${classes.item} flex flex-row justify-between items-center`}
                >
                  <div className={`${classes.info} flex flex-row justify-between items-center`}>
                    {/* <div className={`${classes.icon}`}> {item.iconUrl}</div> */}
                    <div className={`${classes.name}`}> {item.name}</div>
                  </div>
                  <div className={`${classes.arrow}`}>&gt;</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={`${classes.line}`}></div>

        <div className={`${classes.panel}`}>
          <div className={`${classes.title}`}>{tEnginesLang}</div>
          <div className={`${classes.items}`}>
            {engineItems.map(function (item) {
              return (
                <div
                  key={item.name}
                  className={`${classes.item} flex flex-row justify-between items-center`}
                >
                  <div className={`${classes.info} flex flex-row justify-between items-center`}>
                    {/* <div className={`${classes.icon}`}> {item.iconUrl}</div> */}
                    <div className={`${classes.name}`}> {item.name}</div>
                  </div>
                  <div className={`${classes.arrow}`}>&gt;</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className={`${classes.line}`}></div>
      <div className={`${classes.recent}`}></div>
    </div>
  )
}
