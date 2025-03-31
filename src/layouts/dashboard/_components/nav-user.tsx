'use client';

import AccountModal from '@/components/account-modal';
import CopyButton from '@/components/copy-button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useCommonContext } from '@/contexts/common-provider/hook';
import { truncateAddress } from '@/utils';
import { ChevronRight } from 'lucide-react';

export function NavUser() {
  const { user } = useAuthContext();

  const { accountModalRef } = useCommonContext();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-auto cursor-pointer"
          onClick={() => accountModalRef?.current?.handleOpen()}
        >
          <Avatar className="h-8 w-8 rounded-full">
            {/* <AvatarImage src={user?.id} alt={user?.id} /> */}
            <AvatarFallback className="rounded-lg">
              {user?.identifier?.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-[#F4F4F5]">
              {user?.identifier ?? ''}
            </span>
            <div className="flex items-center gap-1">
              <span className="truncate text-xs font-light text-[#A3A3A3]">
                {truncateAddress(user?.agent_address ?? '')}
              </span>
              <CopyButton text={user?.agent_address ?? ''} />
            </div>
          </div>
          <ChevronRight className="ml-auto size-4" />
        </SidebarMenuButton>
      </SidebarMenuItem>
      <AccountModal ref={accountModalRef} />
    </SidebarMenu>
  );
}
