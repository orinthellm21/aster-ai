import { registerService } from '@/apis/auth.apis';
import { SearchParamKey } from '@/constants/app.constants';
import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

export type ReceivedProps = {};

const formSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must have at least eight characters, one uppercase letter, one lowercase letter, one number, and one special character.',
    ),
  refCode: z.string().optional(),
});

const useRegisterForm = (props: ReceivedProps) => {
  const { toast } = useToast();

  const { setUser, setAccessToken, magic } = useAuthContext();

  const navigate = useNavigate();

  const [isValidEmail, setIsValidEmail] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      refCode: '',
    },
  });

  const [searchParams] = useSearchParams();

  const refCodeParam = searchParams.get(SearchParamKey.REF_CODE);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!setUser || !setAccessToken) {
        throw 'Unavailable now.';
      }

      if (!magic) {
        throw 'Unavailable now.';
      }

      setSubmitting(true);

      const token = await magic.auth.loginWithEmailOTP({
        email: values.email,
      });

      if (!token) {
        throw 'Email verification failed.';
      }

      const { user, jwt } = await registerService({
        didToken: token,
        password: values.password,
        refCode: values.refCode,
      });

      setUser(user);
      setAccessToken(jwt);

      navigate('/conversations');
    } catch (error: any) {
      console.log(`🌈 ~ hook.ts:86 ~ handleSubmit ~ error:`, error);

      const message =
        typeof error?.response?.data?.message === 'string'
          ? `${error?.response?.data?.message}`
          : typeof error === 'string'
            ? `${error}`
            : 'Please try again later.';

      toast({ title: 'Register failed!', description: message });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (refCodeParam) form.setValue('refCode', refCodeParam);
  }, [form, refCodeParam]);

  return {
    form,
    handleSubmit,
    isValidEmail,
    submitting,
    ...props,
  };
};

export type Props = ReturnType<typeof useRegisterForm>;

export default useRegisterForm;
