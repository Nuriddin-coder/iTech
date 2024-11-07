import Script from "next/script";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { Providers } from "@/providers";
import { BaseLayout } from "@/components";
import { IChildren, IParams } from "@/types";
import { logoIcon, logoImg } from "@/constants";

import "@/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

interface IRootLayout extends IChildren {
  params: IParams;
}

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<IRootLayout>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <head>
        <title>Piyola Market - Tez, Oson, Qulay va Arzon Xaridlar</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          name="description"
          content="Piyola Market - So'nggi gadgetlarni qulay narxlarda bo'lib to'lash orqali oling! Tez va oson xarid qilishingiz uchun maxsus takliflar."
        />
        <meta
          name="keywords"
          content="piyola market, nasiya savdo, bo'lib to'lash, gadgetlar, smartfonlar, samsung, apple, iphone, redmi, pocco"
        />
        <meta
          property="og:title"
          content="Piyola Market - Tez, Oson, Qulay va Arzon Xaridlar"
        />
        <meta
          property="og:description"
          content="Hallollik va Qulaylik - So'nggi gadgetlarni bo'lib to'lash orqali xarid qiling! Siz uchun eng yaxshi takliflar."
        />
        <meta property="og:image" content={logoImg.src} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Piyola Market Logo" />
        <meta property="og:url" content="https://piyolamerket.uz" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="Piyola Market - Tez, Oson, Qulay va Arzon Xaridlar"
        />
        <meta
          name="twitter:description"
          content="Bo'lib to'lash imkoniyatlari bilan gadgetlarni qulay narxlarda oling. Har bir xarid siz uchun oson va foydali!"
        />
        <meta name="twitter:image" content={logoImg.src} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="Piyola Market Logo" />
        <link rel="canonical" href="https://piyolamerket.uz" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/svg+xml" href={logoIcon.src} />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <BaseLayout>
              {children}
            </BaseLayout>
          </Providers>
        </NextIntlClientProvider>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
           !function(f,b,e,v,n,t,s)
           {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
           n.callMethod.apply(n,arguments):n.queue.push(arguments)};
           if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
           n.queue=[];t=b.createElement(e);t.async=!0;
           t.src=v;s=b.getElementsByTagName(e)[0];
           s.parentNode.insertBefore(t,s)}(window, document,'script',
           'https://connect.facebook.net/en_US/fbevents.js');
           fbq('init', '1204540360819113');
           fbq('track', 'PageView');
        `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            alt="facebook-event"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1204540360819113&ev=PageView&noscript=1"
          />
        </noscript>
        <Script id="metrika-counter" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
 
              ym(98457220, "init", {
                    defer: true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
              });`}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/98457220"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
