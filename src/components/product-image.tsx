import { useState, type ImgHTMLAttributes } from "react";

type ProductImageProps = ImgHTMLAttributes<HTMLImageElement> & { src: string };

// Retry transient delivery failures without replacing the user's picture.
export function ProductImage({ src, ...props }: ProductImageProps) {
  const [attempt, setAttempt] = useState(0);
  const resolvedSrc = attempt === 0 ? src : `${src}${src.includes("?") ? "&" : "?"}retry=${attempt}`;
  return <img {...props} src={resolvedSrc} onError={() => {
    if (attempt < 2) setAttempt(attempt + 1);
  }} />;
}