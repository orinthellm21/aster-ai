import { SearchParamKey } from '@/constants/app.constants';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { localAuthService } from '@/apis/auth.apis';
import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export type ReceivedProps = Record<string, any>;

const formSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must have at least eight characters, one uppercase letter, one lowercase letter, one number, and one special character.',
    ),
});

const useAuthForm = (props: ReceivedProps) => {
  const [_, setSearchParams] = useSearchParams();

  const { toast } = useToast();

  const navigate = useNavigate();

  const { setUser, setAccessToken } = useAuthContext();

  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleGoToRegisterScreen = () => {
    setSearchParams((prevParams) => {
      prevParams.set(SearchParamKey.SCREEN_HINT, 'register');

      return prevParams;
    });
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!setUser || !setAccessToken) return;

      setSubmitting(true);

      const { user, jwt } = await localAuthService({
        email: values.email,
        password: values.password,
      });

      setUser(user);
      setAccessToken(jwt);

      navigate('/conversations');
    } catch (error: any) {
      const message =
        typeof error?.response?.data?.message === 'string'
          ? `${error?.response?.data?.message}`
          : typeof error === 'string'
            ? `${error}`
            : 'Please try again later.';

      toast({ title: 'Login failed!', description: message });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    handleGoToRegisterScreen,
    form,
    handleSubmit,
    submitting,
    ...props,
  };
};

export type Props = ReturnType<typeof useAuthForm>;

export default useAuthForm;
