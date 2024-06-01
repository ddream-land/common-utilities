import classes from './MiniView.module.scss'
import { DDLMiniIcon } from '../DDLIcon'

type MiniViewProps = {
  title: {
    name: string
    color?: string
  }
}

function MiniView({ title }: MiniViewProps) {
  const { name, color = 'rgba(181, 255, 58, 1)' } = title

  return (
    <div className={`${classes.mini} flex flex-row w-full h-full`}>
      <div className={`${classes.icon} h-full flex mt-1`}>
        <DDLMiniIcon></DDLMiniIcon>
      </div>
      <div className={`${classes.title} ml-[16px] w-[96px] flex flex-col pt-2`}>
        <div className={`${classes.logo} h-[32px] w-full bg-no-repeat bg-cover`}></div>
        <div className={`${classes.name} h-[14px] w-full text-center`} style={{ color: color }}>
          {name}
        </div>
      </div>
    </div>
  )
}

export default MiniView
