import { Suspense, type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useCommonContext } from '../../contexts/common-provider/hook';
import useCommonLayout, { type Props, type ReceivedProps } from './hook';
import { useAuthContext } from '@/contexts/auth-provider/hook';
import CommonLoading from '@/components/common-loading';

const CommonLayoutLayout: FC<Props> = (props) => {
  const {} = props;

  // const { walletModalRef } = useWalletContext();

  const { setRootContainer } = useCommonContext();

  const { reAuthLoading } = useAuthContext();

  return (
    <div className="full-webkit-container flex flex-col" ref={setRootContainer}>
      {reAuthLoading ? (
        <CommonLoading />
      ) : (
        <main className={`relative flex flex-1 flex-col overflow-y-hidden`}>
          <Suspense fallback={<></>}>
            <Outlet />
          </Suspense>
        </main>
      )}
    </div>
  );
};

const CommonLayout: FC<ReceivedProps> = (props) => (
  <CommonLayoutLayout {...useCommonLayout(props)} />
);

export default CommonLayout;
