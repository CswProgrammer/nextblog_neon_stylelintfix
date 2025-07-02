// src/app/(pages)/layout.tsx
import type { Metadata } from 'next';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import { Header } from '../_components/header';
import $styles from './layout.module.css';
import './global.css';
import Theme from '../_components/theme';
import { Auth } from '../_components/auth/provider';
import { Toaster } from '../_components/shadcn/ui/toaster';
export const metadata: Metadata = {
    title: '编程突围',
    description:
        '这里是编程突围官网',
};

const AppLayout: FC<PropsWithChildren<{ modal: ReactNode }>> = ({ children, modal }) => (
    <Auth>
        <Theme>
            <div className={$styles.layout}>
                <Header />
                {children}
            </div>
            {modal}
            <Toaster />
        </Theme>
    </Auth>
);
export default AppLayout;