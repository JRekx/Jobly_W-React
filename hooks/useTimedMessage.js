/**
 * A React hook that displays a message for a specified duration.
 * Returns an array with a boolean indicating if the message is active,
 * and a function to activate the message. Uses a ref and state to handle
 * the message timing and visibility.
 */
import { useRef, useState, useEffect } from "react";

function useTimedMessage(timeInMsec = 3000) {
  const [active, setActive] = useState(false);

  const messageShownRef = useRef(false);

  useEffect(
    function showSavedMessage() {
      console.debug(
        "useTimedMessage useEffect showSavedMesssage",
        "active=",
        active
      );

      if (active && !messageShownRef.current) {
        messageShownRef.current = true;
        setTimeout(function removeMessage() {
          setActive(false);
          messageShownRef.current = false;
        }, timeInMsec);
      }
    },
    [active, timeInMsec]
  );
  return [active, setActive];
}

export default useTimedMessage;
