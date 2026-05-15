"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    snap: any;
  }
}

export const useMidtrans = () => {
  const snapPay = (snapToken: string, callbacks?: {
    onSuccess?: (result: any) => void;
    onPending?: (result: any) => void;
    onError?: (result: any) => void;
    onClose?: () => void;
  }) => {
    if (window.snap) {
      window.snap.pay(snapToken, {
        onSuccess: (result: any) => {
          callbacks?.onSuccess?.(result);
        },
        onPending: (result: any) => {
          callbacks?.onPending?.(result);
        },
        onError: (result: any) => {
          callbacks?.onError?.(result);
        },
        onClose: () => {
          callbacks?.onClose?.();
        },
      });
    } else {
      console.error("Midtrans Snap is not loaded yet");
    }
  };

  return { snapPay };
};
