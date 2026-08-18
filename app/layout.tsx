import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import type { Metadata } from 'next';
import 'modern-normalize';
import './globals.css';
import css from './layout.module.css';

export const metadata: Metadata = {
    title: 'Note Hub',
    description: 'A hub for your notes',
};

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <TanStackProvider>
                    <Header />
                    <div className={css.main}>{children}</div>
                    {modal}
                    <Footer />
                </TanStackProvider>
            </body>
        </html>
    );
}
