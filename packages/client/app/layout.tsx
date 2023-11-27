import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { WebSocketProvider } from '@/context/ws';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Doppelkopf - 🦊 am  📌',
	description: 'Spiele das beliebte Kneipenkartenspiel Doppelkopf online am PC!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<WebSocketProvider>{children}</WebSocketProvider>
			</body>
		</html>
	);
}
