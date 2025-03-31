import {
  ConnectButton,
  useAccountModal,
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import { ChevronDown, CircleUser, Wallet } from 'lucide-react';
import { type FC } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import Button from '../ui/button';
import useWalletButton, { type Props, type ReceivedProps } from './hook';

const WalletButtonLayout: FC<Props> = (props) => {
  const {} = props;

  const { isConnecting, isReconnecting } = useAccount();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    disabled={isConnecting || isReconnecting}
                    onClick={openConnectModal}
                    className="bg-[#F9CF30] hover:bg-[#BE9705]"
                  >
                    <Wallet />
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    type="button"
                    variant="ghost"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  {/* <Button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    variant="outline"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button> */}

                  <Button
                    disabled={isConnecting || isReconnecting}
                    onClick={openAccountModal}
                    variant="outline"
                  >
                    <CircleUser />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        {!!account.displayName && <p>{account.displayName}</p>}
                        {account.displayBalance ? (
                          <small>(${account.displayBalance})</small>
                        ) : (
                          ''
                        )}
                        <ChevronDown />
                      </div>
                    </div>
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );

  // return (
  //   <>
  //     {isConnected ? (
  //       <>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button disabled={isConnecting || isReconnecting}>
  //               <CircleUser />
  //               <div className="flex flex-col">
  //                 <div className="flex items-center gap-1">
  //                   {!!address && (
  //                     <p>{truncateAddress(address.toString() ?? '', 4, 4)}</p>
  //                   )}
  //                   <ChevronDown />
  //                 </div>
  //               </div>
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent className="rounded-lg" align="end">
  //             <Button
  //               disabled={isConnecting || isReconnecting}
  //               onClick={() => {
  //                 disconnect();
  //               }}
  //               variant="destructive"
  //             >
  //               <Unplug /> Disconnect
  //             </Button>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </>
  //     ) : (
  //       <>
  //         <Button
  //           disabled={isConnecting || isReconnecting}
  //           onClick={() => {
  //             if (openAccountModal) openAccountModal();
  //           }}
  //         >
  //           <Wallet />
  //           Connect Wallet
  //         </Button>
  //       </>
  //     )}
  //   </>
  // );
};

const WalletButton: FC<ReceivedProps> = (props) => (
  <WalletButtonLayout {...useWalletButton(props)} />
);

export default WalletButton;
