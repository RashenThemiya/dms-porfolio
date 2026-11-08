import { useEffect } from 'react';

// Only accept messages from the specific same-origin animation frame.
export default function useFrameMessage(frameRef, type, onMessage) {
  useEffect(() => {
    function receive(event) {
      if (
        event.origin !== window.location.origin ||
        event.source !== frameRef.current?.contentWindow ||
        event.data?.type !== type
      )
        return;
      onMessage(event.data);
    }
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [frameRef, type, onMessage]);
}
