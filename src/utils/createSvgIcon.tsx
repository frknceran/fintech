export function createSvgIcon(src: string) {
  return function Icon({ size = 18 }: { size?: number }) {
    return <img src={src} alt="" width={size} height={size} className="shrink-0" />;
  };
}
