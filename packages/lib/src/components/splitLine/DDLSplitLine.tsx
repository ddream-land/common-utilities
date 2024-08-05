import classes from './DDLSplitLine.module.scss'

export type DDLSplitLineProps = Readonly<{
  className?: string
  line1Color?: string
  line2Color?: string
}>

function DDLSplitLine({ className, line1Color, line2Color }: DDLSplitLineProps) {
  const line1Style = {
    background: line1Color ?? 'rgba(10, 11, 13, 1)',
  }
  const line2Style = {
    background: line2Color ?? 'rgba(31, 32, 34, 1)',
  }

  return (
    <div className={`${classes.line} ${className ?? ''} w-full`}>
      <div className={`${classes.line1}`} style={line1Style}></div>
      <div className={`${classes.line2}`} style={line2Style}></div>
    </div>
  )
}

export { DDLSplitLine }
