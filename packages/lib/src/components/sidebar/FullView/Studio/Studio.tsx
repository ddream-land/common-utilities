import classes from './Studio.module.scss'
import { useState, useEffect, CSSProperties } from 'react'
import { useLanguageT } from '../../../../useLanguageT'
import { SupportLangs } from '@/types/SupportLangs'

type StudioItem = {
  name: string
  redirectUrl: string
}

function getStudioItems(lang: SupportLangs | undefined = 'en'): StudioItem[] {
  return [
    {
      name: lang === 'en' ? '2D Avatar' : '2D头像',
      redirectUrl: 'https://www.2avatar.ddream.land',
    },
    {
      name: lang === 'en' ? '3D Avatar' : '3D头像',
      redirectUrl: 'https://www.3avatar.ddream.land',
    },
    { name: lang === 'en' ? 'Voice' : '声音', redirectUrl: 'https://www.voice.ddream.land' },
    {
      name: lang === 'en' ? 'Digital Life' : '数字生命',
      redirectUrl: 'https://www.dl.ddream.land',
    },
    { name: lang === 'en' ? 'World' : '世界书', redirectUrl: 'https://www.world.ddream.land' },
    { name: lang === 'en' ? 'Charactor' : '角色卡', redirectUrl: '' },
  ]
}

type StudioProps = Readonly<{ lang: SupportLangs; className?: string }>

export default function Studio({ lang, className }: StudioProps) {
  const { translation: tStudiosLang } = useLanguageT('Studios')
  const [studioItems, setStudioItems] = useState<StudioItem[]>(getStudioItems(lang))

  useEffect(
    function () {
      setStudioItems(getStudioItems(lang))
    },
    [lang]
  )

  return (
    <div className={`${classes.studio} ${className ?? ''} w-full px-4`}>
      <div className={`${classes.title} px-4`}>{tStudiosLang}</div>
      <div className={`${classes.items} mt-4 w-full`}>
        {studioItems.map(function (item) {
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
