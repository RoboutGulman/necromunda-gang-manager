import { useState, useEffect } from "react";

export const useProgressiveImage = (src: string) => {
  const [sourceLoaded, setSourceLoaded] = useState<null | string>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
  }, [src]);

  return sourceLoaded;
};
