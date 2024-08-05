'use client';

import { createContext, useContext, useReducer } from 'react';
import { useImmerReducer } from 'use-immer';
import { LoginModal, LoginModalProps } from './LoginModal';

export const LoginContext = createContext({} as LoginModalProps);
export const LoginDispatchContext = createContext(null as any);

const initialState : LoginModalProps = { isOpen: false };

export function LoginContextProvider({ children }: {children: React.ReactNode}) {
  const [props , dispatch] = useImmerReducer(
    loginReducer,
    initialState
  );

  return (
    <LoginContext.Provider value={props}>
      <LoginDispatchContext.Provider value={dispatch}>
        <LoginModal {...props} onClose={() => {
          props.onClose?.();
          dispatch({
            type: "close"
          })
        }} />
        {children}
      </LoginDispatchContext.Provider>
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}

export function useLoginDispatch() {
  return useContext(LoginDispatchContext);
}

function loginReducer(draft: LoginModalProps, action: any) {
  switch (action.type) {
    case 'open': {
      draft.isOpen = true;
      action.payload.openPage !== undefined && (draft.openPage = action.payload.openPage);
      action.payload.locale !== undefined && (draft.locale = action.payload.locale);
      action.payload.isCloseable !== undefined && (draft.isCloseable = action.payload.isCloseable);
      action.payload.onClose !== undefined && (draft.onClose = action.payload.onClose);
      action.payload.onLogin !== undefined && (draft.onLogin = action.payload.onLogin);
      action.payload.onRegister !== undefined && (draft.onRegister = action.payload.onRegister);
      action.payload.onResetPassword !== undefined && (draft.onResetPassword = action.payload.onResetPassword);
      action.payload.onDeleteUser !== undefined && (draft.onDeleteUser = action.payload.onDeleteUser);
      action.payload.onMouseEnter !== undefined && (draft.onMouseEnter = action.payload.onMouseEnter);
      action.payload.onMouseOver !== undefined && (draft.onMouseOver = action.payload.onMouseOver);
      action.payload.onMouseLeave !== undefined && (draft.onMouseLeave = action.payload.onMouseLeave);

      return draft
    }
    case 'close': {
      draft.isOpen = false;
      return draft
    }
    case 'clear': {
      return draft
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

