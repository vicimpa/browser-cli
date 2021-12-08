import { useEffect } from "react";

export const useEvent = <T extends keyof DocumentEventMap>(
  event: T,
  listener: (event: DocumentEventMap[T]) => void
) => {
  useEffect(() => {
    document.addEventListener(event, listener);
    return () => document.removeEventListener(event, listener);
  });
};