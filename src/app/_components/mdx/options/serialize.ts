// src/app/_components/mdx/options/serialize.ts
import type { MDXRemoteProps } from 'next-mdx-remote-client/rsc';

import rehypePrism from 'rehype-prism-plus';
import { rehypeCodeWindow } from '../plugins/rehype-code-window';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkDirective from 'remark-directive';
import remarkAdmonitions from '../plugins/remark-admonitions';
import remarkGfm from 'remark-gfm';
import rehypeExternalLinks from 'rehype-external-links';
import remarkFlexibleToc from 'remark-flexible-toc';

/**
 * 默认mdx配置
 */
export const defaultMdxSerializeOptions: Omit<MDXRemoteProps, 'source'> = {
    options: {
        disableImports: true,
        parseFrontmatter: true,
        vfileDataIntoScope: 'toc',
        mdxOptions: {
            remarkPlugins: [remarkDirective, remarkAdmonitions, remarkGfm, remarkFlexibleToc],
            rehypePlugins: [
                [rehypeExternalLinks, { target: '_blank' }],
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'append' }],
                [rehypePrism, { showLineNumbers: true, ignoreMissing: true }],
                rehypeCodeWindow,
            ],
        },
    },
};