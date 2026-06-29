import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number };

const base = (size?: number) => ({
  width: size ?? 20,
  height: size ?? 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
});

function svgRest({ size: _size, ...rest }: IconProps) {
  return rest;
}

export function IconSearch(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>;
}
export function IconPhone(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
}
export function IconMapPin(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}
export function IconStar({ size, ...rest }: IconProps) {
  return (
    <svg width={size ?? 16} height={size ?? 16} viewBox="0 0 20 20" fill="currentColor" aria-hidden {...rest}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
export function IconBuilding(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" /></svg>;
}
export function IconClock(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
}
export function IconUsers(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}
export function IconFlask(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><path d="M9 3h6M10 3v7.5L4.5 19.5A1.5 1.5 0 0 0 6 21.5h12a1.5 1.5 0 0 0 1.5-2L15 10.5V3" /></svg>;
}
export function IconPill(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></svg>;
}
export function IconStethoscope(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><path d="M4.8 2.3A2 2 0 0 0 3 4v4a5 5 0 0 0 5 5 5 5 0 0 0 5-5V4a2 2 0 0 0-2.8-1.7" /><path d="M8 15v6M8 21h8" /><circle cx="20" cy="10" r="2" /><path d="M20 12v3a4 4 0 0 1-4 4h-1" /></svg>;
}
export function IconShield(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>;
}
export function IconChevron({ dir, size, ...rest }: IconProps & { dir?: "left" | "right" | "down" }) {
  const d = dir === "left" ? "m15 18-6-6 6-6" : dir === "down" ? "m6 9 6 6 6-6" : "m9 18 6-6-6-6";
  return <svg {...base(size)} {...rest}><path d={d} /></svg>;
}
export function IconX(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><path d="M18 6 6 18M6 6l12 12" /></svg>;
}
export function IconAlert(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4M12 17h.01" /></svg>;
}
export function IconGrid(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
}
export function IconCross(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><path d="M12 4v16M4 12h16" /></svg>;
}
export function IconHeart({ filled, size, ...rest }: IconProps & { filled?: boolean }) {
  const path = "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z";
  if (filled) {
    return (
      <svg width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
        <path d={path} />
      </svg>
    );
  }
  return <svg {...base(size)} {...rest}><path d={path} /></svg>;
}
export function IconHome(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></svg>;
}
export function IconCalendar(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
}
export function IconUser(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
}
export function IconBookmark(p: IconProps) {
  const s = base(p.size);
  return <svg {...s} {...svgRest(p)}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>;
}
export function IconWhatsApp({ size, ...rest }: IconProps) {
  return (
    <svg width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.843L.046 23.54a.5.5 0 0 0 .614.614l5.697-1.477A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}
