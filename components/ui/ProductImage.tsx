import Image, { type ImageProps } from "next/image";

export function ProductImage({ src, alt, ...props }: ImageProps) {
  const isSvg = typeof src === "string" && src.endsWith(".svg");
  return <Image src={src} alt={alt} unoptimized={isSvg} {...props} />;
}
