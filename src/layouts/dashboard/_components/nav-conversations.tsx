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
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { deleteConversion, updateConversion } from '@/apis/conversation.apis';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NavConversations() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [conversationId, setConversationId] = useState<string>('');

  const [title, setTitle] = useState<string>('');

  const [openType, setOpentype] = useState<'update' | 'delete' | null>(null);

  const { isMobile } = useSidebar();

  const { conversations } = useAppContext();

  const { toast } = useToast();

  const { pathname } = useLocation();

  const { mutate: handleDelete, isPending: isDeletePending } = useMutation({
    mutationFn: async () => {
      try {
        await deleteConversion({ conversationId });
      } catch (error) {
        console.log('🚀 ~ mutationFn: ~ error:', error);
      }
    },
    onSuccess() {
      setOpentype(null);
      navigate('/conversations');
      setConversationId('');
      queryClient.invalidateQueries({
        queryKey: ['conversations'],
      });
    },
  });

  const onDelete = async () => handleDelete();

  const { mutate: handleUpdate, isPending: isUpdatePending } = useMutation({
    mutationFn: async () => {
      try {
        await updateConversion({ conversationId, newTitle: title });
      } catch (error) {
        console.log('🚀 ~ mutationFn: ~ error:', error);
      }
    },
    onSuccess() {
      setOpentype(null);
      setConversationId('');
      setTitle('');
      queryClient.invalidateQueries({
        queryKey: ['conversations'],
      });
    },
  });

  const onUpdate = async () => handleUpdate();

  const getConversation = useMemo(() => {
    return (conversations?.data || []).find(
      (item) => item.id === conversationId,
    );
  }, [conversationId, conversations?.data]);

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="flex justify-between">
          Conversations
          {(conversations?.isFetching ||
            conversations?.isLoading ||
            conversations?.isPending) && <Loader2 className="animate-spin" />}
        </SidebarGroupLabel>
        <SidebarMenu>
          {(conversations?.data ?? []).map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                {openType === 'update' && item.id === conversationId ? (
                  <Input
                    defaultValue={item.title || item.id}
                    onBlur={onUpdate}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                ) : (
                  <Link
                    to={`/conversations/c/${item.id}`}
                    className={cn('transition-all', {
                      'bg-[#27272A]': !!matchPath(`/c/${item.id}`, pathname),
                    })}
                  >
                    {/* <item.icon /> */}
                    <span>{item.title || item.id}</span>
                  </Link>
                )}
              </SidebarMenuButton>
              <DropdownMenu>
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
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      setOpentype('update');
                      setConversationId(item.id);
                    }}
                  >
                    <Folder className="text-muted-foreground" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem className="cursor-pointer">
                    <Forward className="text-muted-foreground" />
                    <span>Share</span>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      setConversationId(item.id);
                      setOpentype('delete');
                    }}
                  >
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
          {/* <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <MoreHorizontal className="text-sidebar-foreground/70" />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarGroup>

      <Dialog
        open={openType === 'delete'}
        onOpenChange={() => {
          setOpentype(null);
          setConversationId('');
        }}
      >
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          className="block max-w-[30%]"
          closeable
        >
          <DialogHeader>
            <DialogTitle>Delete chat?</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <p className="mt-3 text-sm font-bold break-words whitespace-normal text-[#A3A3A3]">
            This will delete{' '}
            <span className="text-sm text-white">
              {getConversation?.title || ''}
            </span>
            .
          </p>

          <div className="mt-3 flex items-end justify-end">
            <Button onClick={onDelete}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
