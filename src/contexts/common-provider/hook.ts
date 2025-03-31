import { AccountModalHandler } from '@/components/account-modal/hook';
import { EarlyAccessModalHandler } from '@/components/early-access-modal/hook';
import { SettingsModalHandler } from '@/components/settings-modal/hook';
import React, {
  createContext,
  ForwardedRef,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from 'react';

export type ReceivedProps = PropsWithChildren;

type CommonProviderState = {
  rootContainer?: HTMLDivElement | null;
  setRootContainer?: React.LegacyRef<HTMLDivElement>;
  settingsModalRef?: React.MutableRefObject<SettingsModalHandler | null>;
  earlyAccessModalRef?: React.MutableRefObject<EarlyAccessModalHandler | null>;
  accountModalRef?: React.MutableRefObject<AccountModalHandler | null>;
};

const initialState: CommonProviderState = {};

export const CommonProviderContext =
  createContext<CommonProviderState>(initialState);

const useCommonProvider = (props: ReceivedProps) => {
  const [rootContainer, setRootContainer] = useState<HTMLDivElement | null>();

  const settingsModalRef: ForwardedRef<SettingsModalHandler> = useRef(null);
  const earlyAccessModalRef: ForwardedRef<EarlyAccessModalHandler> =
    useRef(null);
  const accountModalRef: ForwardedRef<AccountModalHandler> = useRef(null);

  const value = {
    rootContainer,
    setRootContainer,
    settingsModalRef,
    earlyAccessModalRef,
    accountModalRef,
  };

  return {
    value,
    ...props,
  };
};

export type Props = ReturnType<typeof useCommonProvider>;

export default useCommonProvider;

export const useCommonContext = () => {
  const context = useContext(CommonProviderContext);

  if (context === undefined)
    throw new Error('useCommonContext must be used within a CommonProvider.');

  return context;
};
