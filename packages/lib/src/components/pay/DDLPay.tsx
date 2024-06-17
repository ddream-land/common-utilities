import classes from './DDLPay.module.scss'

export type DDLPayProps = Readonly<{
  className?: string
  isOpen: boolean
}>

function DDLPay({ isOpen, className }: DDLPayProps) {
  return (
    <>
      {isOpen && (
        <div
          className={`${classes.pay} ${
            className ?? ''
          } fixed z-50 w-[1180px] h-[613px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#000000] rounded-[24px] border-[#333333] border-1 flex flex-col`}
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
      )}
    </>
  )
}

export { DDLPay }
