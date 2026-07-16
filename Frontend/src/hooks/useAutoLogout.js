import { useEffect } from "react";

export default function useAutoLogout() {
  useEffect(() => {
    let timer;

    const logout = () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    };

    const resetTimer = () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        alert("Session expired. Please login again.");
        logout();
      }, 10 * 60 * 1000); // 10 minutes
    };

    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearTimeout(timer);

      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, []);
}