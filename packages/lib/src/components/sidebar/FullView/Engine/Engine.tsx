import classes from './Engine.module.scss'
import { useState, useEffect, CSSProperties } from 'react'
import { useLanguageT } from '../../../../useLanguageT'
import { SupportLangs } from '@/types/SupportLangs'

type EngineItem = {
  name: string
  redirectUrl: string
}

function getEngineItems(lang: SupportLangs | undefined = 'en'): EngineItem[] {
  return [
    {
      name: lang === 'en' ? 'FuHsi Saga' : 'Saga引擎',
      redirectUrl: 'https://www.saga.ddream.land',
    },
  ]
}

type EngineProps = Readonly<{ lang: SupportLangs; className?: string }>

export default function Engine({ lang, className }: EngineProps) {
  const { translation: tEnginesLang } = useLanguageT('Engines')
  const [engineItems, setEngineItems] = useState<EngineItem[]>(getEngineItems(lang))

  useEffect(
    function () {
      setEngineItems(getEngineItems(lang))
    },
    [lang]
  )

  return (
    <div className={`${classes.engine} ${className ?? ''} w-full px-4`}>
      <div className={`${classes.title} px-4`}>{tEnginesLang}</div>
      <div className={`${classes.items} mt-4 w-full`}>
        {engineItems.map(function (item) {
          return (
            <div
              onClick={() => {
                item.redirectUrl && window.open(item.redirectUrl)
              }}
              key={item.name}
              className={`${classes.item} cursor-pointer w-full flex items-center`}
            >
              <div
                className={`${classes.content} mx-4 flex w-full flex-row justify-between items-center`}
              >
                <div className={`${classes.info} flex flex-row items-center`}>
                  <div className={`${classes.name}`}> {item.name}</div>
                </div>
                <div className={`${classes.arrow}`}>&gt;</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
