import { useState } from "react";
import { proxy, useSnapshot } from "valtio";

export const useProxyState = <T extends object>(
  initial: T | (() => T)
) => {
  const [proxyState] = useState(() => proxy(
    typeof initial == 'function' ? initial() : initial
  ));
  useSnapshot(proxyState);
  return proxyState;
};