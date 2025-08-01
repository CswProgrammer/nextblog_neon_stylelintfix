// src/app/(pages)/layout.tsx
import type { Metadata } from "next";
import type { FC, PropsWithChildren, ReactNode } from "react";

import { Auth } from "../_components/auth/provider";
import { Header } from "../_components/header";
import "./global.css";
import { Toaster } from "../_components/shadcn/ui/toaster";
import Theme from "../_components/theme";
import $styles from "./layout.module.css";
export const metadata: Metadata = {
  title: "编程突围",
  description: "这里是编程突围官网",
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
