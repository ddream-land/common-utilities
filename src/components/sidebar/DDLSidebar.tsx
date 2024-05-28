import classes from './DDLSidebar.module.scss'

export function DDLSidebar() {
  return (
    <div className={`${classes.sidebar} w-full h-full bg-transparent`}>
      <div className={`${classes.wrapper} w-full h-full`}>
        <div className={`${classes.minify} w-full h-full hidden`}></div>
        <div className={`${classes.content} w-full h-full hidden`}></div>
      </div>
    </div>
  )
}
