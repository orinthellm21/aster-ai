import Button from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type FC } from 'react';
import useRegisterForm, { type Props, type ReceivedProps } from './hook';
import { ArrowRight, Loader2 } from 'lucide-react';
import GoogleOAuthButton from '@/components/google-oauth-button';
import TwitterOAuthButton from '@/components/twitter-oAuth-button';

const RegisterFormLayout: FC<Props> = (props) => {
  const { form, handleSubmit, isValidEmail, submitting } = props;

  const {
    formState: { isSubmitting, isDirty, isValid, isSubmitted },
  } = form;

  const formDisabled = !isDirty || isSubmitting || (isSubmitted && !isValid);

  const refCode = form.watch('refCode');

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-0">
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      {...field}
                      required
                      className="h-16 rounded-2xl bg-[#181818]"
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage className="px-3 text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-0">
                  <FormControl>
                    <Input
                      {...field}
                      required
                      type="password"
                      className="h-16 rounded-2xl bg-[#181818]"
                      placeholder="Password"
                    />
                  </FormControl>
                  <FormMessage className="px-3 text-red-400" />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="refCode"
              render={({ field }) => (
                <FormItem className="grid gap-0">
                  <FormControl>
                    <Input
                      placeholder="Referral code (Optional)"
                      {...field}
                      className="h-16 rounded-2xl bg-[#181818]"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage className="px-3 text-red-400" />
                </FormItem>
              )}
            /> */}
            <Button
              type="submit"
              className="relative mt-2 h-[60px] w-full rounded-2xl bg-[#F9CF30] text-black hover:bg-[#BE9705]"
              disabled={formDisabled}
            >
              {submitting && <Loader2 className="animate-spin" />}
              Continue
              <div className="absolute right-4 flex size-9 items-center justify-center rounded-xl bg-black">
                <ArrowRight strokeWidth={3} className="text-[#F9CF30]" />
              </div>
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-center text-sm font-semibold">
              <span className="font-normal text-[#303A46]">——</span>
              &nbsp;&nbsp;Or Continue with&nbsp;&nbsp;
              <span className="font-normal text-[#303A46]">——</span>
            </p>
            <div className="flex items-center justify-center gap-4">
              <GoogleOAuthButton refCode={refCode} />

              <TwitterOAuthButton refCode={refCode} />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

const RegisterForm: FC<ReceivedProps> = (props) => (
  <RegisterFormLayout {...useRegisterForm(props)} />
);

export default RegisterForm;
