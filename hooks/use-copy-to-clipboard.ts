"use client";

import { useState, useCallback } from "react";

interface UseCopyToClipboardOptions {
  successDuration?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useCopyToClipboard({
  successDuration = 2000,
  onSuccess,
  onError,
}: UseCopyToClipboardOptions = {}) {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers
          const textArea = document.createElement("textarea");
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        }

        setIsCopied(true);
        setError(null);
        onSuccess?.();

        // Reset copied state after duration
        setTimeout(() => {
          setIsCopied(false);
        }, successDuration);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to copy text");
        setError(error);
        onError?.(error);
        setIsCopied(false);
      }
    },
    [successDuration, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setIsCopied(false);
    setError(null);
  }, []);

  return { copy, isCopied, error, reset };
}

// Convenience hook for copying email or contact info
export function useCopyEmail(email: string) {
  const { copy, isCopied, error } = useCopyToClipboard({
    successDuration: 3000,
  });

  const copyEmail = useCallback(() => {
    copy(email);
  }, [copy, email]);

  return { copyEmail, isCopied, error };
}