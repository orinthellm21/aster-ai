import React, { forwardRef, type FC } from 'react';
import useSettingsModal, {
  SettingsModalHandler,
  type Props,
  type ReceivedProps,
} from './hook';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Button from '../ui/button';
import { Separator } from '../ui/separator';
import { useAuthContext } from '@/contexts/auth-provider/hook';
import { LogOut } from 'lucide-react';
import { useThemeContext } from '@/contexts/theme-provider/hook';
import { Slider } from '../ui/slider';
import { useCommonContext } from '@/contexts/common-provider/hook';

const SettingsModalLayout: FC<Props> = (props) => {
  const { open, openChangeHandler } = props;

  const { user, setAccessToken, setUser } = useAuthContext();

  const { theme, setTheme } = useThemeContext();

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        className="block min-h-[80%]"
        closeable
      >
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="general" className="mt-2">
          <TabsList>
            <TabsTrigger value="general" className="cursor-pointer">
              General
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="flex flex-col gap-2 p-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-light">Theme</p>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-fit cursor-pointer gap-2">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light" className="cursor-pointer">
                    Light
                  </SelectItem>
                  <SelectItem value="dark" className="cursor-pointer">
                    Dark
                  </SelectItem>
                  <SelectItem value="system" className="cursor-pointer">
                    System
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <p className="text-sm font-light">Log out on this device</p>
              <Button
                variant="link"
                onClick={() => {
                  if (setAccessToken) setAccessToken(null);
                  if (setUser) setUser(undefined);

                  openChangeHandler(false);
                }}
                className="text-foreground"
              >
                <LogOut />
                Log out
              </Button>
            </div>
          </TabsContent>
          <TabsContent
            value="personalization"
            className="flex flex-col gap-2 p-2"
          ></TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

const SettingsModal = forwardRef<SettingsModalHandler, ReceivedProps>(
  (props, ref) => (
    <SettingsModalLayout {...useSettingsModal({ ...props, innerRef: ref })} />
  ),
);

SettingsModal.displayName = 'SettingsModal';

export default SettingsModal;
