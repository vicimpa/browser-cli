import { useRunner } from "library/useRunner";
import { createElement, FC, useEffect, useMemo, useRef } from "react";

import styles from "./cli.module.sass";
import { Input } from "./input.component";


export const Cli: FC = () => {
  const ref = useRef<HTMLDivElement>();

  const previewData = useMemo(() => ({
    scroll: 0,
    scrollSize: 0,
    height: 0
  }), []);

  const {
    running,
    output,
    runCommand,
    context
  } = useRunner();

  useEffect(() => {
    if (!ref.current) return;
    const { scroll, scrollSize } = previewData;

    const resume = scroll >= scrollSize;

    if (resume)
      ref.current.scrollTop = ref.current.scrollHeight;


    const { offsetHeight, scrollTop, scrollHeight } = ref.current;

    previewData.scroll = scrollTop + offsetHeight;
    previewData.scrollSize = scrollHeight;
  });

  useEffect(() => {
    const listener = () => {
      if (!ref.current) return;
      const { offsetHeight, scrollTop } = ref.current;
      previewData.scroll = offsetHeight + scrollTop;
    };

    ref.current?.addEventListener('scroll', listener);
    return () => ref.current?.removeEventListener('scroll', listener);
  });

  return (
    <div ref={ref as any} className={styles.root}>
      {createElement('pre', null, ...output)}
      {running ? null : (
        <Input context={context} onSubmit={runCommand} />
      )}
    </div>
  );
};