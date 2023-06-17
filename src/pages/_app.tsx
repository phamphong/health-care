import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { wrapper } from '../store'
import { Provider } from "react-redux";
import { Footer } from '../components/common/footer';
import { Header } from '../components/common/header';
import Head from 'next/head';
import ScrollTop from '../image/component_scroll.png';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const onScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setShowScrollTop(true)
    }
    else if (scrolled <= 300) {
      setShowScrollTop(false)
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, [showScrollTop])

  const onScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Provider store={store} >
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>Healthy</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta name="description" content="A web application for health care." />
        </Head>
        <Header />
        <Component {...props} />
        <Footer />
      </SessionProvider>
      {showScrollTop &&
        <img onClick={onScrollToTop} className='fixed right-4 bottom-8 cursor-pointer'
          {...ScrollTop} width={48} height={48} alt="scroll top" />
      }
    </Provider>
  )
}