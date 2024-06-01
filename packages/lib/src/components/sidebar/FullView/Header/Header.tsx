import classes from './Header.module.scss'
import DDLIcon from '../../DDLIcon'

type HeaderProps = Readonly<{
  title: {
    name: string
    color?: string
  }
}>

export default function Header({ title }: HeaderProps) {
  const { name, color = 'rgba(181, 255, 58, 1)' } = title

  return (
    <div className={`${classes.header} w-full h-14 mt-8 flex flex-row px-8`}>
      <div className={`${classes.icon} h-[59px] w-[46px] flex mt-2`}>
        <DDLIcon></DDLIcon>
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
