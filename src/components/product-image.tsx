import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

type ProductImageProps = ImgHTMLAttributes<HTMLImageElement> & { src: string };

// Retry transient delivery failures without replacing the user's picture.
export function ProductImage({ src, ...props }: ProductImageProps) {
  const [attempt, setAttempt] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth === 0 && attempt < 2) {
      setAttempt(attempt + 1);
    }
  }, [attempt]);
  const resolvedSrc = attempt === 0 ? src : `${src}${src.includes("?") ? "&" : "?"}retry=${attempt}`;
  return <img {...props} ref={imageRef} src={resolvedSrc} onError={() => {
    if (attempt < 2) setAttempt(attempt + 1);
  }} />;
}