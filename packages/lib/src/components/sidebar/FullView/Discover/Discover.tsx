import classes from './Discover.module.scss'
import { useState, useEffect, CSSProperties } from 'react'
import { useLanguageT } from '../../../../useLanguageT'
import { SupportLangs } from '@/types/SupportLangs'

type DiscoverItem = {
  iconUrl: string
  activeIconUrl?: string
  name: string
  redirectUrl: string
}

function getDiscoverItems(lang: SupportLangs | undefined = 'en'): DiscoverItem[] {
  return [
    {
      name: lang === 'en' ? 'Game Store' : '游戏中心',
      redirectUrl: `https://www.games.ddream.land`,
      iconUrl: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIDSURBVHgBfVRNS0JBFJ33UNCgSKEWFhjUshYuctGmn9Jf6Cf021y40IWBLQMzMsiFikIKPrBzfOfSZdIuHGbeu3fO/ZxJgmSz2ZxiIcrAHFgAkyRJVsEJ7AqyqwLcZ7L7pD6R0TWWM5GsgSJwKI4R8Kp9HTgX0VIIIh+B9CUBWQ0fN0APP8YuEkZaAa4UdSbVGzCEbRZl1wD6qdgnnmwbepLQ+0QRB0W1ViRZZDtWdtVU6f0ReGXKTenbQEuqpnSx0Fk5tc0eMuraiGChiLtK/XYHKR3PU6VVVvc82TcJfHoi7QArT4q1FPImLkg4lte6FI1dZI40c6QNnalKPU1lwNGoKzLKs5HhwAMwBQbcR6RBAXAS2KylzSFreBfyTraUmtVzgOVCnzPoKlGt7/S5PZeaTmTBrSbHbj+LdGu3kiMYIUNmVAvVxZM+hnyYSfbkomPtmjrHTOvbckhxD/SBKXArjzubIrKC7DgqHKWaCFt2UyhT1a4HHIR8LAr/kNGmpzNDkZ+S8AiYWyM4xCHvoJGW9pB1ZGtd5/nt1WOn4rtppPTKq1ZyHS16MickLKS2iZRG2tXnvcistjGZSWY35UhPUFyrmiKyDLiv+DLI9iTYq6Uf9sBOZFMOv2/gB/Cu/5eyo8ylp2P2IX9gnZeavBSVGkfoKx4d9/AeioglG9t7+gNwMwQXqkgeygAAAABJRU5ErkJggg==')`,
      activeIconUrl: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALsSURBVHgB1VVBbtNQEJ1vp5VoN16zwZVYwIpwApwTNDtKQapTDkBvQG9AOQCNkWjoMpygzgkaVmwqETaszaKwaOPhvW//5Cd2D9CRLH3/PzPvz8yb+SL3Xcz6xv5Ad0Wlj4O4FJlCY2oCyUefzC9fr59qtG1kV1US/Eb4CjWSfx2az3cCvE51iJ1U6BgGtWGXZ3CUSSjH5VwMjN4FAj1jz2f1R0moN8rMoAHwaqAHMMoUlxsNzTe3v5dqHBp5geUxvhjRFUQoVU7+inwcZ6bwo8fRGJGnLpLAHQZVqLnvnHKemdlcZYKbFfWVopLrUDLfOcXaKlJa+ZIVAK3S0ZA3h/oMShe4dYSvC7AdRiBzyV/irMWEEcYNAMMiyfLAOddSchgU1yrPv5ya73VEPep3tBUkYhRtEUzIHLLDdw7kGZz3/HQQZEOkB6OZD8J6Qb9L5jUANlEchrcFhlCxLPHf4txJhj0HEkJ3/60+MhUZREFrLzNLAU0/kKZaMwWKieP/3qE+RN6fgiE3QShX56fmN/dTRHxj5JLsYh1hlp95NA18gDloZ1FRJN85Bfx/HATS6QTyACx54kcC/T5TY+1CS2dpBajF1gCFXGHVRkc2FmEHcuuf3Zbyp142Uhms/bwXdiVYwLy6gteAP6Dwj87RB1dun/UijaXuZjOXI9+n8RXRsT+xTNlYWF8wr9fSXmQKL7BV9whTihynWB+BGDvOZtkHHgNIwzqv8TYc+JGsOw+gQ13Wa7OqoR2CjRRhVHCoTV1h2VQwTBwIadjmHOcJdbmfVbeeaduokGpqrqTCA4k4GgjCBoTzS6bFd74QtbWI2gBWDnwQOxpQLVPa2005OpjzhvOlFA0AFJWd3LUPjidMB5QOcDM2kTUESIQxkvhpo1hbRIUL5G6v/cHRhQJzHNtBiIcETXTCBycknauHSerBVj1OnEPQO2t7cBYgeHjULJ9BKWWCh2W8TtXFQ6R2uHVhw/4Zr78n91/+A9aUbEJ4eWFpAAAAAElFTkSuQmCC')`,
    },
    {
      name: lang === 'en' ? 'Asset Store' : '资源中心',
      redirectUrl: `https://www.assets.ddream.land`,
      iconUrl: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGOSURBVHgBzVVNSsNAGP0SigXxBwQLdRUQqujSC3iAegAvoAfoAcw1eoG6t+7FvS4rFBTqpgELCipCFhLf1zxlnCQkNQn44DGTb77vvcnMJCPynxBF0YFS6gCEffCGPJMqQfErvsER+9WYQKhHwY4R6zDWk7LgkpxkGefVu5KPW7ALsbYhvoXmEAykLFQMHIIXamI/59U7KYIemk0wBMeO44SccV+HwVXwDTzFWICxJvrb4Do4Rewx0wDJmrgBztiq4J1hcszUgSG+zzyt0Td6xthDwsAQHyHhwyqem1iTSYwjtszYj4nL5DU0LXCi4nPnWHAENjgzG23bnLVj1aJm4hSFKUKfko1GSqxpPrh0fkXzBO7wNe0lSDuOAc33mCus9VSLmpmbrMUtWWyTXyQ+fembbJh4Eq+vzuDeOqYr4DsFzWO6Cy6BM8QmsgjKfmhFDAa2mGHSz6sv8i9S4Wtdju8A+lM0QzD38ilicCnxz+7X71riDT+XKmBcOF1eOtr3pUpYV6YvdaDWS/+v+AKrylr/ONNP9AAAAABJRU5ErkJggg==')`,
      activeIconUrl: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKsSURBVHgBzVVPSxtREP/N7rqpVg0N1RpPgmBLPfYD6FXw3vgHI8Wakyc/QPWuJ09JadHiv54VPPsBelSwWLCXBBLQNlVL4u6+zqx5sjG1u8EWOvDIZHbm93vvzbwZ4H+S8bR6IauZGIrqOD6tFogwKrpS2NlcpcUocUYUJwE3CEPKRMZTWGR9mG1vosSGnmAirebJwKhhIfPhLX0W29RrNeA5yLoedrfWaBn3OoGBMQ/Y0uAioivCrmFcX9m9CBjoE/+MTk6qpLalUqqX8zDMaiEs3gpz4N0vmkDWa0GWSTKOAzJakeWdKbRgPiy+IQepadVntqDLq6DyrYSjvT2qpF6pXlMhq/wDoYPXDwbPrOeoMDKiYoke9HuEOFdZfvMdfb2TIJ1W/Y6NhHuFkkVIOAbU9zwONQk7j4mfaWFTg3f2YDDGfjah9JOQdKo4/bhGXxoINPhDwkEuR5dzcyp2do7BIElwM0HweBsOV1aoMjur2i4UxwRI/CRPTKjOqolu28GJgItNAh6148A0YMWfIHn7KsUWBBebH3uJI4OxBPOGQEu1irpdHh8DnFQXd4jrwhKfOgwbMV9JXP/3CTY2qGy7KHLinsoxb19BV0djOYqNk+rGe/FcfMUmsbaFPl7FjRUq1+XgJg+cXC7eguOiO3gFUvsUqyXZ5SSvUyGYJz7nmVQfF8fpWu43SdYiZcqtIQkT5ccPcKzBa7XfzqV6LuVqXHGZ1kiKF3hmmbCl+rZX6SSIF9qLAuDysPyHpt+EJvlTfGirMFuxpMGl9rffU94lZHhnxK97ISw+lICBktw19wVc24REedjhb6HDJ0qz87vmyyk1oG1TrJN0WQ9bYfGRJlptmg2xusw7LzD4EnfTfZ5qC3+FIECiR+ZuFPCmZXyGh/5Mc0P/n8svzIU40OPqBLsAAAAASUVORK5CYII=')`,
    },
  ]
}

type DiscoverProps = Readonly<{ lang: SupportLangs; className?: string }>

export default function Discover({ lang, className }: DiscoverProps) {
  const { translation: tDiscoverLang } = useLanguageT('Discover')
  const [discoverItems, setDiscoverItems] = useState<DiscoverItem[]>(getDiscoverItems(lang))

  useEffect(
    function () {
      setDiscoverItems(getDiscoverItems(lang))
    },
    [lang]
  )

  return (
    <div className={`${classes.discover} ${className ?? ''} w-full px-4`}>
      <div className={`${classes.title} px-4`}>{tDiscoverLang}</div>
      <div className={`${classes.items} mt-4 w-full`}>
        {discoverItems.map(function (item) {
          return (
            <div
              onClick={() => {
                item.redirectUrl && window.open(item.redirectUrl)
              }}
              key={item.name}
              className={`${classes.item} cursor-pointer w-full flex items-center`}
              style={
                {
                  '--iconUrl': item.iconUrl,
                  '--activeIconUrl': item.activeIconUrl ?? item.iconUrl,
                } as CSSProperties
              }
            >
              <div
                className={`${classes.content} mx-4 flex w-full flex-row justify-between items-center`}
              >
                <div className={`${classes.info} flex flex-row items-center`}>
                  <div className={`${classes.icon} w-6 h-6 bg-no-repeat bg-cover`}></div>
                  <div className={`${classes.name} ml-3`}> {item.name}</div>
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
