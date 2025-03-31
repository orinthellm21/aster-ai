import React, { FC } from 'react';
import useLanding, { Props, ReceivedProps } from './hook';
import { ExternalLink } from 'lucide-react';
import XIcon from '@/assets/x.svg';
import TeleIcon from '@/assets/tele.svg';
import Logo from '@/assets/logo-type.svg';
import HeroBackdrop from '@/assets/hero-backdrop.png';
import HeroBackdropMobile from '@/assets/hero-backdrop-mobile.png';
import AlphaAlertIcon from '@/assets/alpha-alert.svg';
import TokenInsightIcon from '@/assets/token-insight.svg';
import MarketIcon from '@/assets/market.svg';
import SmoothTradingIcon from '@/assets/smooth-trading.svg';
import SocialSignalIcon from '@/assets/social-signal.svg';
import DefiFeatureIcon from '@/assets/defi-feature.svg';
import BscIcon from '@/assets/bsc.svg';
import ElizaIcon from '@/assets/eliza.svg';
import OpenAIIcon from '@/assets/openai.svg';
import GmgnIcon from '@/assets/gmgn.svg';
import ClaudeIcon from '@/assets/claude.svg';
import GeminiIcon from '@/assets/gemini.svg';
import GrokIcon from '@/assets/grok.svg';
import DeepseekIcon from '@/assets/deepseek.svg';
import DexScreenerIcon from '@/assets/dexscreener.svg';
import Agent1 from '@/assets/agent1.png';
import Agent2 from '@/assets/agent2.png';
import Agent3 from '@/assets/agent3.png';
import Agent4 from '@/assets/agent4.png';
import Enhance from '@/assets/enhance.png';
import Enhance2 from '@/assets/enhance2.png';
import Enhance3 from '@/assets/enhance3.png';
import Enhance4 from '@/assets/enhance4.png';
import Product from '@/assets/product.png';
import HeroIll1 from '@/assets/hero-ill-1.png';
import HeroIll2 from '@/assets/hero-ill-2.png';
import BSCLogoType from '@/assets/bsc-logotype.svg';
import FeatureBackdrop from '@/assets/features_backdrop.png';
import Button from '@/components/ui/button';
import { cn } from '@/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const LandingLayout: FC<Props> = ({ bgColor }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <>
      <header
        className={cn(
          'border-b-solid fixed right-0 left-0 z-100 w-full border-b border-b-[#333333]',
          bgColor,
        )}
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-3.5">
          <img src={Logo} alt="Logo" />

          <div className="hidden items-center gap-10 md:flex">
            <a
              className="flex items-center gap-1"
              target="_blank"
              href="https://asterai.gitbook.io/docs"
            >
              <p className="text-sm font-medium text-[#F9CF30]">Docs</p>
              <ExternalLink className="h-2.5 w-2.5 text-[#F9CF30]" />
            </a>
            <a href="https://x.com/asterai_xyz" target="_blank">
              <img src={XIcon} alt="XIcon" className="cursor-pointer" />
            </a>
            <a href="https://t.me/asteraichannel" target="_blank">
              <img src={TeleIcon} alt="TeleIcon" className="cursor-pointer" />
            </a>
          </div>

          <Button
            className="bg-[#F9CF30] py-1.5 hover:bg-[#BE9705]"
            onClick={() => navigate('/authorize')}
          >
            Login
          </Button>
        </div>
      </header>

      {isMobile ? (
        <img
          src={HeroBackdropMobile}
          alt="HeroBackdropMobile"
          className="fixed top-[86px] right-0 left-0 -z-1 w-full"
        />
      ) : (
        <img
          src={HeroBackdrop}
          alt="HeroBackdrop"
          className="fixed top-[86px] right-0 left-0 -z-1 w-full"
        />
      )}

      <section className="relative mx-auto w-full max-w-[1280px] px-4 pt-30 md:pt-56">
        <div className="relative flex flex-col">
          <h1 className="text-center text-2xl font-bold text-[#F2F2F2] md:text-left md:text-5xl">
            Revolutionizing Hedge Funds{!isMobile && <br />} The Premier DeFAI
            Platform
          </h1>
          <div className="relative flex items-center justify-center md:justify-start">
            <h1 className="text-center text-2xl leading-none font-bold text-[#F2F2F2] md:text-5xl">
              on
            </h1>
            &nbsp;&nbsp;
            <img
              src={BSCLogoType}
              alt="bsc-logo-type"
              className="h-8 md:h-12"
            />
          </div>
          <h4 className="font-outfit mt-3.5 mb-10 text-center text-sm text-[#979797] md:text-left md:text-xl">
            Driving Smart Decisions{isMobile && <br />} with On-Chain Data
            Mastery
          </h4>
          <Button
            className="mx-auto w-fit bg-[#F9CF30] py-1.5 hover:bg-[#BE9705] md:mx-0"
            onClick={() => navigate('/authorize')}
          >
            Getting started
          </Button>

          <div className="mt-10 flex justify-between">
            <img
              src={HeroIll2}
              alt="ill"
              className="bottom-0 -left-40 -z-1 h-12 w-auto md:absolute md:h-24"
            />
            <img
              src={HeroIll1}
              alt="ill"
              className="top-0 right-0 -z-1 h-28 w-auto md:absolute md:h-48"
            />
          </div>
        </div>
        <img
          src={Product}
          alt="Product"
          className="mt-20 h-full w-full md:mt-40"
        />
      </section>

      <section className="">
        <div className="mx-auto w-full max-w-[1280px] px-4">
          <h2
            className="py-10 text-center text-2xl font-bold text-[#F9CF30] md:mb-12 md:py-16 md:text-4xl"
            style={
              {
                // backgroundImage:
                //   'linear-gradient(90deg, #F2F2F2 0%, #8C8C8C 100%)',
              }
            }
          >
            Your all-in-one {isMobile && <br />} personalized AI Agent
          </h2>

          <div className="grid grid-cols-1 gap-28 md:grid-cols-2">
            {[
              {
                title: 'Alpha Alert',
                description:
                  'Identify top tokens and hidden gems using hedge fund activities and in-depth data analysis.',
                icon: AlphaAlertIcon,
              },
              {
                title: 'Token Insights',
                description:
                  'Top holder and developer detection help traders make smart investment decisions.',
                icon: TokenInsightIcon,
              },
              {
                title: 'Strategic Market Insights',
                description:
                  'Examine trends in the market and evaluate project outcomes.',
                icon: MarketIcon,
              },
              {
                title: 'Smooth Trading',
                description:
                  'Trade tokens quickly and accurately with the best entry prices.',
                icon: SmoothTradingIcon,
              },
              {
                title: 'Social Signal',
                description:
                  'Real-time update KOL posts on X for early, accurate potential tokens discovery.',
                icon: SocialSignalIcon,
              },
              {
                title: 'DeFi Feature',
                description:
                  'Easily create your AI Agent, launch a token and add LP in just a few minutes.',
                icon: DefiFeatureIcon,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center justify-center rounded-3xl border border-[#FFFFFF33] p-10 pt-16"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), conic-gradient(from 181.06deg at 50% 50%, rgba(71, 47, 140, 0.4) 0deg, rgba(0, 0, 0, 0) 172.66deg, #828035 281.25deg, rgba(71, 47, 140, 0.4) 360deg)',
                }}
              >
                <div
                  className="absolute top-0 flex size-20 -translate-y-1/2 items-center justify-center rounded-full"
                  style={{
                    background:
                      'linear-gradient(180deg, #F9CF30 0%, #FFF8DF 100%)',
                  }}
                >
                  {/* <div className="glowing-bar" /> */}
                  <img src={feature.icon} alt="icon" className="w-10" />
                </div>
                <h3 className="text-center text-3xl md:mb-3.5">
                  {feature.title}
                </h3>
                <p className="text-center text-[#979797]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="">
        <div className="mx-auto w-full max-w-[1280px] px-4 pt-20">
          <div className="flex flex-col items-center justify-center">
            <h2
              className="pb-2.5 text-center text-2xl font-bold text-[#F9CF30] md:text-4xl"
              style={
                {
                  // backgroundImage:
                  //   'linear-gradient(90deg, #F2F2F2 0%, #8C8C8C 100%)',
                }
              }
            >
              Innovative AI Agent designed
              {!isMobile && <br />}
              for smart trading decisions
            </h2>

            <div
              className="mb-9 w-fit rounded-full border border-solid border-[#333333] bg-[#1F1F1F] px-5 py-2.5 text-center text-xs text-[#F2F2F2] md:text-base"
              style={{
                boxShadow: '0px 0px 5px 0px #FFFFFF',
              }}
            >
              Easily automate intricate tasks using AI Agents that simplify web3
              processes
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
              {[
                {
                  title: 'Powerful Hedge Fund',
                  description:
                    'Follow smart money from top wallets, analyze charts to assess token trends and potential, and minimize portfolio risks effectively.',
                  image: Agent1,
                },
                {
                  title: 'Elevate Trading with DeFAI',
                  description:
                    'Combine onchain actions and utilize AI-powered DeFi for an unparalleled trading experience. Buy, sell, swap, and even launch your token with high speed and security.',
                  image: Agent2,
                },
                {
                  title: 'Insightful Data Analysis',
                  description:
                    'Analyze in-depth on-chain and off-chain data to provide traders with the most useful token information and identify early alpha opportunities.',
                  image: Agent3,
                },
                {
                  title: 'Agile Set-up & Automated Workflow',
                  description:
                    'Create an AI Agent in minutes with a single click, no coding required. Elevate your trading strategies with advanced, customized AI automations.',
                  image: Agent4,
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className={cn('relative', {
                    'md:row-span-2': index === 0,
                    'md:col-span-2': index === 1,
                  })}
                >
                  {/* {index === 0 ? (
                    <img
                      src={Agent1}
                      alt="Agent1"
                      className="h-[244px] w-full bg-cover md:h-full"
                    />
                  ) : (
                    <img
                      src={Agent2}
                      alt="Agent2"
                      className="h-[244px] w-full bg-cover md:h-full"
                    />
                  )} */}

                  <img src={card.image} alt="Agent" className="h-full" />

                  <div className="absolute right-8 bottom-8 left-8 z-1">
                    <div className="relative">
                      <h2 className="text-xl font-bold text-[#F9CF30]">
                        {card.title}
                      </h2>
                    </div>
                    <p className="text-gray-[#E5E7EB] mt-2 text-xs md:text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="my-10 bg-cover bg-center"
        style={{
          backgroundImage: `url('${FeatureBackdrop}')`,
        }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 py-20">
          <div className="flex flex-col items-center justify-center text-white">
            <h2
              className="pb-2.5 text-center text-2xl font-bold text-[#F9CF30] md:text-4xl"
              style={
                {
                  // backgroundImage:
                  //   'linear-gradient(90deg, #F2F2F2 0%, #8C8C8C 100%)',
                }
              }
            >
              Enhanced Intelligence
            </h2>

            <div
              className="mb-9 w-fit rounded-full border border-solid border-[#333333] bg-[#1F1F1F] px-5 py-2.5 text-center text-xs text-[#F2F2F2] md:text-base"
              style={{
                boxShadow: '0px 0px 5px 0px #FFFFFF',
              }}
            >
              Effortless integration with leading AI models for smooth, smart
              blockchain interactions
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              {
                title: 'AI-Powered Binance Smart Chain',
                description:
                  'Experience smooth Binance Smart Chain integration with easy access to its full suite of services through our AI-assisted platform, enhancing ecosystem synergy.',
              },
              {
                title: 'Decentralized and collaboratively built',
                description:
                  'Seamless blockchain transactions and customized AI Agents - build or train quickly using pre-set prompts from Aster AI.',
              },
              {
                title: 'Most advanced LLM & Framework',
                description:
                  'Leverage top AI models like AI16Z, OpenAI, Claude, and Gemini for seamless automation and smart decision-making. Data is gathered from multiple sources, filtered, and analyzed for deep insights.',
              },
              {
                title: 'Innovative AI Agents',
                description:
                  'Generate early alerts for traders on promising tokens based on social signals, smart money, market cap changes, and technical analysis indicators.',
              },
            ].map((card, index) => (
              <div key={index} className="relative w-full">
                <img
                  src={Enhance}
                  alt="Enhance"
                  className="h-60 w-full bg-cover md:h-full"
                />
                <div className={cn('absolute top-8 right-8 left-8 z-1')}>
                  <div className="relative">
                    <h2 className="text-xl font-bold">{card.title}</h2>
                  </div>
                  <p className="text-gray-[#E5E7EB] mt-10 text-xs md:text-base">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="">
        <div className="mx-auto w-full max-w-[1280px] px-4">
          <h2
            className="py-16 text-center text-2xl font-bold text-[#F9CF30] md:text-4xl"
            style={
              {
                // backgroundImage:
                //   'linear-gradient(90deg, #F2F2F2 0%, #8C8C8C 100%)',
              }
            }
          >
            Integrated with
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: BscIcon,
              },
              {
                icon: ElizaIcon,
              },
              {
                icon: OpenAIIcon,
              },
              {
                icon: GmgnIcon,
              },
              {
                icon: ClaudeIcon,
              },
              {
                icon: GeminiIcon,
              },
              {
                icon: GrokIcon,
              },
              {
                icon: DeepseekIcon,
              },
              {
                icon: DexScreenerIcon,
              },
            ].map((item, index, arr) => (
              <div
                key={index}
                className={cn(
                  'relative flex items-center justify-center border border-solid border-[#F9CF3080] p-10 sm:p-18',
                  {
                    'border-r-0': index % 3 === 0,
                    'border-l-0': index % 3 === 2,
                    'border-b-0': index < 3,
                    'border-t-0': index >= (arr.length / 3 - 1) * 3,
                    // 'border-r-0': [0, 1, 3, 4, 6, 7].includes(index),
                    // 'border-b-0': [0, 1, 2, 3, 4, 5].includes(index),
                  },
                )}
              >
                <img src={item.icon} alt="icon" className="" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t-solid mt-24 border-t border-t-[#333333]">
        <div className="flex items-center justify-between gap-3 px-4 py-12">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex gap-3">
              <a href="https://x.com/asterai_xyz" target="_blank">
                <img src={XIcon} alt="XIcon" className="cursor-pointer" />
              </a>
              <a href="https://t.me/asteraichannel" target="_blank">
                <img src={TeleIcon} alt="TeleIcon" className="cursor-pointer" />
              </a>
            </div>
            <p className="text-sm text-[#F9CF30] sm:text-base">
              © 2025 Aster AI
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center text-sm text-[#F9CF30] sm:text-base">
              Powered by Binance Smart Chain
            </p>
            <p className="text-center text-sm text-[#F9CF30] sm:text-base">
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

const Landing: FC<ReceivedProps> = (props) => (
  <LandingLayout {...useLanding(props)} />
);

export default Landing;
