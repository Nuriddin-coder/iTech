'use client';

import { useLocale } from 'next-intl';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { store } from '@/store';
import { getQueryClient } from '@/utils';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface IProvider {
	children: ReactNode;
}

export const Providers: FC<IProvider> = ({ children }) => {
	const locale = useLocale();
	const queryClient = getQueryClient();

	const recaptchaKey = process.env.NEXT_PUBLIC_CAPTCHA_KEY;

	return (
		<GoogleReCaptchaProvider
			scriptProps={{
				defer: true,
			}}
			language={locale}
			reCaptchaKey={recaptchaKey ?? ''}>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<NextUIProvider locale={locale} className="relative">
						{children}
						<Toaster position="top-center" />
						{process.env.NODE_ENV === 'development' && (
							<ReactQueryDevtools
								buttonPosition="bottom-left"
								initialIsOpen={false}
							/>
						)}
					</NextUIProvider>
				</Provider>
			</QueryClientProvider>
		</GoogleReCaptchaProvider>
	);
};
