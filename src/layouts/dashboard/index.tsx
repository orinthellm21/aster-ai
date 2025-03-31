import EarlyAccessModal from '@/components/early-access-modal';
import SettingsModal from '@/components/settings-modal';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import WalletButton from '@/components/wallet-button';
import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useCommonContext } from '@/contexts/common-provider/hook';
import { type FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppSidebar } from './_components/app-sidebar';
import useDashboardLayout, { type Props, type ReceivedProps } from './hook';
import { SquarePen } from 'lucide-react';
import { cn } from '@/utils';

const DashboardLayoutLayout: FC<Props> = (props) => {
  const {} = props;

  const { user } = useAuthContext();

  const { settingsModalRef, earlyAccessModalRef } = useCommonContext();

  const navigate = useNavigate();

  return (
    <SidebarProvider className="flex-1 overflow-y-hidden">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            {user && (
              <>
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                {/* <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Task 1</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Task 1.1</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb> */}
              </>
            )}

            <div
              className="flex cursor-pointer items-center gap-1"
              onClick={() => {
                navigate('/conversations');
              }}
            >
              <SquarePen
                strokeWidth={1}
                className={cn('cursor-pointer', !open && 'mx-auto mt-[7px]')}
                size={18}
              />
              <span className="text-xs text-[#A3A3A3]">New chat</span>
            </div>
          </div>
          <div className="px-4">
            <WalletButton />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 overflow-y-hidden px-4">
          <Outlet />
        </div>
      </SidebarInset>
      <SettingsModal ref={settingsModalRef} />
      {/* <EarlyAccessModal ref={earlyAccessModalRef} /> */}
    </SidebarProvider>
  );
};

const DashboardLayout: FC<ReceivedProps> = (props) => (
  <DashboardLayoutLayout {...useDashboardLayout(props)} />
);

export default DashboardLayout;
