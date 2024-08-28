import { Button } from '@nextui-org/react';
import { LoginContextProvider, useLoginDispatch } from './components/nuwa-login-ui/LoginContextProvider';
import { getI18n } from './utils/base.api';

function LoginPage() {

  const loginDispatch = useLoginDispatch();
  

  return (
    <div className='w-full flex-wrap flex flex-row gap-4'>
      <Button color="primary" size="lg" onClick={() => {
        loginDispatch({
          type: "open",
          payload: {
            isCloseable: true,
            openPage: "login",
            loginType: "phone",
            locale: 'zh-CN',
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
      <Button color="primary" size="lg" onClick={() => {
        loginDispatch({
          type: "open",
          payload: {
            isCloseable: true,
            openPage: "register",
            loginType: "phone",
            locale: 'zh-CN',
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
        Register
      </Button>
      <Button color="primary" size="lg" onClick={() => {
        loginDispatch({
          type: "open",
          payload: {
            isCloseable: true,
            openPage: "resetPassword",
            loginType: "phone",
            locale: 'zh-CN',
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
        ResetPassword
      </Button>
      <Button color="primary" size="lg" onClick={() => {
        loginDispatch({
          type: "open",
          payload: {
            isCloseable: true,
            openPage: "deleteUser",
            loginType: "phone",
            locale: 'zh-CN',
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
        Delete User
      </Button>
    </div>
    
  )
}

export { LoginPage }
