import { useEffect, useLayoutEffect, useState } from "react";

export const useViewport = () => {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    setViewport((currentViewport) => {
      currentViewport.width = window.innerWidth;
      currentViewport.height = window.innerHeight;
      return { ...currentViewport };
    });
    window.addEventListener("resize", () =>
      setViewport((currentViewport) => {
        currentViewport.width = window.innerWidth;
        currentViewport.height = window.innerHeight;
        return { ...currentViewport };
      })
    );
  }, []);

  return viewport;
};
