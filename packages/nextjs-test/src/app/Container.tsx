import { DDLSidebar } from '@ddreamland/common'

export function Container() {
  return (
    <div className="fixed top-0 left-0">
      {/* ddreamland sidebar adptive parent size and position */}

      <DDLSidebar lang="en" />
      {/* <DDLSidebar lang="zh-CN" /> */}
    </div>
  )
}
