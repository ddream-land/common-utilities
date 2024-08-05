import { Button } from '@nextui-org/react';
import { LoginContextProvider, useLoginDispatch } from './components/nuwa-login-ui/LoginContextProvider';

function LoginPage() {

  const loginDispatch = useLoginDispatch();
  

  return (
      <Button color="primary" size="lg" onClick={() => {
        loginDispatch({
          type: "open",
          payload: {
            onClose: () => {
              // 登录框关闭后的回调
              console.log("登录框关闭后的回调");
            },
            onLogin: () => {
              loginDispatch({
                type: "close",
              })
              console.log("登录成功后的回调");
            }
          },
        })
      }}>
        Login
      </Button>
  )
}

export { LoginPage }
