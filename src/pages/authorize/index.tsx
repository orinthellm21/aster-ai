import { type FC } from 'react';
import useAuthorizePage, { type Props, type ReceivedProps } from './hook';
import AuthForm from './_components/auth-form';
import RegisterForm from './_components/register-form';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/button';
import { cn } from '@/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Product from '@/assets/product.png';

const AuthorizePageLayout: FC<Props> = (props) => {
  const { currentScreen, handleChangeScreen } = props;

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center sm:p-6 md:p-10">
      <div className="flex w-full flex-1 flex-col justify-center overflow-hidden bg-[#181818] p-6 sm:max-w-sm sm:flex-none sm:rounded-4xl md:max-w-7xl">
        <div className="grid gap-5 overflow-y-auto p-0 md:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-5 rounded-4xl bg-[#262626] px-8 py-10">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold text-[#F9CF30]">Create Your Account</h1>
              <p className="text-balance text-[#C3CDDB]">
                Setting up an account takes less than 1 minute.
              </p>
            </div>
            <Tabs
              defaultValue="login"
              value={currentScreen === 'register' ? 'register' : 'login'}
              className="w-full"
              onValueChange={handleChangeScreen}
            >
              <TabsList className="text-foreground h-12 gap-1 rounded-2xl bg-[#181818] px-1.5">
                <TabsTrigger
                  value="login"
                  className="h-8 cursor-pointer rounded-xl px-5 data-[state=active]:bg-[#515151]"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="h-8 cursor-pointer rounded-xl px-5 data-[state=active]:bg-[#515151]"
                >
                  Sign up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="mt-7">
                <AuthForm />
              </TabsContent>
              <TabsContent value="register" className="mt-7">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </div>
          <div className="col-span-3 hidden flex-col items-center justify-center md:flex">
            <img src={Product} alt="Product" className="w-full max-w-[850px]" />
            <p className="btn-shine mt-5 inline-block bg-gradient-to-r from-[#FFFFFF] to-[#999999] bg-clip-text text-center text-xl font-medium text-transparent">
              Transform deep insights into <br /> intelligent trading decisions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthorizePage: FC<ReceivedProps> = (props) => (
  <AuthorizePageLayout {...useAuthorizePage(props)} />
);

export default AuthorizePage;
