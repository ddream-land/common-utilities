import classes from './MiniView.module.scss'
import { DDLMiniIcon, DDLMiniIcon2 } from '../DDLIcon'

type MiniViewProps = Readonly<{
  title: {
    name: string
    color?: string
  }
}>

function MiniView({ title }: MiniViewProps) {
  const { name, color = 'rgba(181, 255, 58, 1)' } = title

  return (
    <div className={`${classes.mini} flex flex-row w-full h-full`}>
      <div className={`${classes.icon} h-full flex mt-1`}>
        <DDLMiniIcon2></DDLMiniIcon2>
      </div>
      <div className={`${classes.title} ml-[16px] w-[96px] flex flex-col gap-2 justify-center`}>
        <div className={`${classes.logo} w-[84px] h-[20px] bg-no-repeat bg-cover`}></div>
        <div className={`${classes.name} h-[14px] w-full text-center`} style={{ color: color }}>
          {name}
        </div>
      </div>
    </div>
  )
}

export default MiniView
