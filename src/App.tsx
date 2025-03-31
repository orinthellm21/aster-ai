import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { LocalStorageKey } from './constants/app.constants';
import AppProvider from './contexts/app-provider';
import AuthProvider from './contexts/auth-provider';
import CommonProvider from './contexts/common-provider';
import ThemeProvider from './contexts/theme-provider';
import CommonLayout from './layouts/common';
import DashboardLayout from './layouts/dashboard';
import AuthorizePage from './pages/authorize';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ConversationProvider from './contexts/conversation-provider';
import ConversationPage from './pages/conversation';
import LandingPage from './pages/landing';
import AlertsPage from './pages/alerts';
import './app.css';
import WalletProvider from './contexts/wallet-provider';
import { bsc } from 'viem/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import EvmProvider from './contexts/evm-provider';

const HomePage = lazy(() => import('./pages/home'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 120 * (60 * 1000), // 2 hrs
    },
  },
});

const router = createBrowserRouter([
  {
    path: '',
    element: <AppProvider />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
        index: true,
      },
      {
        path: '/conversations',
        element: <CommonLayout />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                element: <ConversationProvider />,
                children: [
                  {
                    index: true,
                    element: <HomePage />,
                  },
                  {
                    path: 'c/:id',
                    element: <ConversationPage />,
                  },
                ],
              },
              {
                path: 'alerts',
                element: <AlertsPage />,
              },
            ],
          },
        ],
      },
      {
        path: '/authorize',
        element: <AuthorizePage />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider
      storageKey={LocalStorageKey.UI_THEME}
      defaultTheme="dark"
      forcedTheme="dark"
    >
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <EvmProvider>
            <WalletProvider>
              <CommonProvider>
                <AuthProvider>
                  <RouterProvider router={router} />
                </AuthProvider>
              </CommonProvider>
            </WalletProvider>
          </EvmProvider>
        </QueryClientProvider>

        <Toaster />
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
