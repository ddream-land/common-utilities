# DDreamland common lib

> npm i @ddreamland/common -S

or

> pnpm i @ddreamland/common -S

```
import React from "react";
import '@ddreamland/common/style.css'
import { DDLSidebar } from '@ddreamland/common'

export default function App() {
  return (
    <div style={{ height: '600px', width: '280px' }}>
      {/* ddreamland sidebar adptive parent size */}
      <DDLSidebar></DDLSidebar>

      {/* <DDLSidebar lang="en" />
      <DDLSidebar lang="zh-CN" /> */}
    </div>
  );
}
```
