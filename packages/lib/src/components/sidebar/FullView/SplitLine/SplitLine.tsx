import classes from './SplitLine.module.scss'

function SplitLine({ className }: { className: string | undefined }) {
  return (
    <div className={`${classes.line} ${className ?? ''} px-4`}>
      <div className={`${classes.line1}`}></div>
      <div className={`${classes.line2}`}></div>
    </div>
  )
}

export default SplitLine
