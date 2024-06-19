import classes from './Recent.module.scss'
import { useEffect } from 'react'
import { useLanguageT } from '../../../../useLanguageT'
import { useLocalStorage } from '../../../../hooks/useLocalStorage'
import { RecentItem } from '../../types'
import { SupportLangs } from '@/types/SupportLangs'

const LOCALSTORAGE_KEY = 'ddreamland-sidebar-recent'

type RecentProps = Readonly<{ lang: SupportLangs; recordRecent?: RecentItem; className?: string }>

export default function Recent({ lang, className, recordRecent }: RecentProps) {
  const { translation: tRecentLang } = useLanguageT('Recent')
  const [recents, setRecents] = useLocalStorage<RecentItem[]>(LOCALSTORAGE_KEY, [])

  useEffect(function () {
    if (recordRecent) {
      const key = recordRecent.key
      const val = [recordRecent, ...recents.filter((x) => x.key !== key).map((x) => x)]
      setRecents(val.slice(0, 10))
    }
  }, [])

  function onClose(key: string) {
    setRecents(recents.filter((x) => x.key !== key).map((x) => x))
  }

  return (
    <div className={`${classes.recent} ${className ?? ''} w-full px-4`}>
      <div className={`${classes.title} px-4`}>{tRecentLang}</div>
      <div className={`${classes.items} mt-4 w-full`}>
        {recents.map(function (item) {
          return (
            <div
              onClick={() => {
                item.key === recordRecent?.key && item.openUrl && window.open(item.openUrl)
              }}
              key={item.key}
              className={`${classes.item} ${
                item.key === recordRecent?.key ? classes.current : ''
              } cursor-pointer w-full flex items-center relative`}
            >
              {item.key === recordRecent?.key && (
                <div className={`${classes.currentFlag} absolute -left-4`}></div>
              )}
              <div
                className={`${classes.content} mx-4 flex w-full flex-row justify-between items-center`}
              >
                <div className={`${classes.info} flex flex-row items-center`}>
                  {item.iconUrlOrBase64 && (
                    <div
                      className={`${classes.icon} w-6 h-6 bg-no-repeat bg-cover mr-3`}
                      style={{ backgroundImage: `url(${item.iconUrlOrBase64})` }}
                    ></div>
                  )}
                  <div className={`${classes.name}`}> {item.name[lang]}</div>
                </div>
                <div
                  onClick={() => {
                    onClose(item.key)
                  }}
                  className={`${classes.close} ${item.key === recordRecent?.key ? 'hidden' : ''}`}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
