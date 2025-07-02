import type { FC } from 'react';

import $styles from './page.module.css';
import { ZustandDemo } from './_components/zustand';
import ThemeDemo from '../_components/theme/demo';

const DemoPage: FC = () => (
    <div className={$styles.demo}>
        {/* <ContextDemo />
        <ReducerDemo />
        <CustomDemo /> */}
        {/* <ZustandDemo /> */}
        <ThemeDemo />
    </div>
);

export default DemoPage;
