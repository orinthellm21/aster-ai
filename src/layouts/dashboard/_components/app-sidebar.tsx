'use client';

import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { NavConversations } from './nav-conversations';
import { NavAlerts } from './nav-alerts';
import { SquarePen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils';
import LogoIcon from '@/assets/logo.svg';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader
        className={cn(
          'h-16 justify-center bg-[#18181B]',
          open ? 'flex' : 'block',
        )}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between">
              <img
                src={LogoIcon}
                alt="icon"
                className="cursor-pointer"
                onClick={() => {
                  navigate('/');
                }}
              />

              {open && (
                <div className="flex items-center justify-end gap-1">
                  <Badge className="bg-[#E3E3E4] font-light">BETA</Badge>
                  <Badge
                    variant="secondary"
                    className="bg-[#262626] font-light text-[#A3A3A3]"
                  >
                    0.3.4
                  </Badge>
                </div>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-[#18181B]">
        <NavMain items={[]} />
        <NavAlerts />
        <NavConversations />
      </SidebarContent>
      <SidebarFooter className="bg-[#18181B]">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
