'use client';

import { Folder, Forward, Loader2, MoreHorizontal, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAppContext } from '@/contexts/app-provider/hook';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/utils';
import { Link, matchPath, useLocation } from 'react-router-dom';

export function NavAlerts() {
  const { isMobile } = useSidebar();

  const { conversations } = useAppContext();

  const { toast } = useToast();

  const { pathname } = useLocation();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex justify-between">
        Alert Channels
        {/* {(conversations?.isFetching ||
          conversations?.isLoading ||
          conversations?.isPending) && <Loader2 className="animate-spin" />} */}
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              to={`/conversations/alerts`}
              className={cn('transition-all', {
                'bg-[#27272A]': !!matchPath(`/alert`, pathname),
              })}
            >
              {/* <item.icon /> */}
              <span>AI Alert</span>
            </Link>
          </SidebarMenuButton>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction showOnHover className="cursor-pointer">
                <MoreHorizontal />
                <span className="sr-only">More</span>
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align={isMobile ? 'end' : 'start'}
            >
              <DropdownMenuItem className="cursor-pointer">
                <Folder className="text-muted-foreground" />
                <span>Rename</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Forward className="text-muted-foreground" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Trash2 className="text-muted-foreground" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
