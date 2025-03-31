import { useAuthContext } from '@/contexts/auth-provider/hook';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useProtectRouter() {
  const { user, reAuthLoading } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!reAuthLoading && !user) {
      navigate('/authorize');
    }
  }, [navigate, reAuthLoading, user]);
}

export default useProtectRouter;
