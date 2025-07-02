// src/demo/zustand/constants.ts

import { createContext } from "react";
import { LayoutStoreType } from "./types";

/**
 * 布局模式
 */
export enum LayoutMode {
    /** 只有顶栏导航 */
    TOP = 'top',
    /** 侧边导航,顶栏自定义 */
    SIDE = 'side',
    /** 同side,但是LOGO在顶栏 */
    CONTENT = 'content',
}
/**
 * 布局组件
 */
export enum LayoutComponent {
    /** 顶栏 */
    HEADER = 'header',
    /** 侧边栏 */
    SIDEBAR = 'sidebar',
}

export enum LayoutActionType {
    /** 更改布局模式 */
    CHANGE_MODE = 'change_mode',
    /** 更改组件主题 */
    CHANGE_THEME = 'change_theme',
}


// src/app/demo/_components/zustand/types.ts
/**
 * 主题颜色模式
 */
export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark',
}
/**
 * 布局配置
 */
export interface LayoutOptions {
    /** 布局模式 */
    mode: `${LayoutMode}`;
    /** 布局组件主题色 */
    theme: Partial<LayoutTheme>;
}

export interface LayoutActions {
    /** 更改布局模式 */
    changeMode: (value: `${LayoutMode}`) => void;
    /** 更改主题 */
    changeTheme: (value: Partial<LayoutTheme>) => void;
}

/**
 * 布局组件主题色
 */
export type LayoutTheme = { [key in `${LayoutComponent}`]: `${ThemeMode}` };

export type LayoutState = LayoutOptions & LayoutActions;

export const LayoutContext = createContext<LayoutStoreType | null>(null);