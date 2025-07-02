import type { FC, MouseEventHandler, ReactNode, RefObject } from 'react';

import { isNil } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * 代码复制按钮
 * @param param0
 */
export const CopyButton: FC<{ wrapperEl: Element | null }> = ({ wrapperEl }) => {
    const [copied, setCopied] = useState(false);
  
    const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
      async (e) => {
        e.preventDefault();
        if (isNil(wrapperEl)) return;
  
        const contentEl = wrapperEl.querySelector('.code-content') as HTMLElement;
        if (isNil(contentEl)) return;
  
        const textToCopy = contentEl.textContent || '';
  
        try {
          // ✅ 首选 Clipboard API
          if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            await navigator.clipboard.writeText(textToCopy);
          } else {
            // ⚠️ fallback 方案
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            textarea.style.position = 'fixed'; // 防止页面滚动跳动
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
  
            const successful = document.execCommand('copy');
            if (!successful) throw new Error('Fallback: Copy failed');
  
            document.body.removeChild(textarea);
          }
  
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('复制失败:', err);
          alert('⚠️ 无法复制，请手动选择文本');
        }
      },
      [wrapperEl]
    );
  
    return (
      <button className="code-copy" type="button" onClick={handleClick}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    );
  };
  
/**
 * 代码框
 * @param ref
 * @param content
 */
export const useCodeWindow = (ref: RefObject<HTMLDivElement | null>, content: ReactNode | null) => {
    const [wrapperEls, setWrapperEls] = useState<NodeListOf<Element> | undefined>();
    const preventSummaryToggle = useCallback((e: Event) => e.preventDefault(), []);
    useEffect(() => {
        if (!wrapperEls) return;
        wrapperEls.forEach((wrapperEl) => {
            const headerEl = wrapperEl.querySelector('.code-header');
            if (isNil(headerEl)) return;
            headerEl.addEventListener('click', preventSummaryToggle);
            let toolsEl = headerEl.querySelector('div.code-tools') as HTMLElement;
            if (isNil(toolsEl)) {
                toolsEl = document.createElement('div');
                toolsEl.className = 'code-tools';
                headerEl.appendChild(toolsEl);
                const toolsNodes = createRoot(toolsEl);
                toolsNodes.render(<CopyButton wrapperEl={wrapperEl} />);
            }
        });
        return () => {
            wrapperEls.forEach((wrapperEls) => {
                const headerEl = wrapperEls.querySelector('summary');
                if (isNil(headerEl)) return;
                headerEl.removeEventListener('click', preventSummaryToggle);
            });
        };
    }, [wrapperEls]);

    useEffect(() => {
        if (!ref.current || !content) return;
        const wrapperEls = ref.current?.querySelectorAll('.code-window');
        setWrapperEls(wrapperEls);
    }, [content]);
};
