/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_TWITTER_CLIENT_ID: string;
  readonly VITE_MAGIC_API_KEY: string;
  readonly VITE_NETWORK: 'testnet' | 'mainnet' | 'devnet';
  readonly VITE_WAGMI_PROJECT_ID: string;

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
