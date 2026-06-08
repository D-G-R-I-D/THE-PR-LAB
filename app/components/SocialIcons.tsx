import React from 'react';

// Helper component for SVG icons
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

// Twitter/X
export const TwitterXIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
    </svg>
  )
);
TwitterXIcon.displayName = 'TwitterXIcon';

// LinkedIn
export const LinkedInIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.601 0 4.263 2.37 4.263 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.814 20.452H3.861V9h2.953v11.452z" />
    </svg>
  )
);
LinkedInIcon.displayName = 'LinkedInIcon';

// WhatsApp
export const WhatsAppIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.793.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.999 2.003c-5.522 0-9.997 4.475-9.997 9.997 0 1.762.467 3.467 1.356 4.975L2 22l5.145-1.356c1.44.789 3.08 1.204 4.854 1.204 5.522 0 9.997-4.475 9.997-9.997s-4.475-9.998-9.997-9.998z" />
    </svg>
  )
);
WhatsAppIcon.displayName = 'WhatsAppIcon';

// Instagram
export const InstagramIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-2.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z" />
    </svg>
  )
);
InstagramIcon.displayName = 'InstagramIcon';

// YouTube
export const YouTubeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M23.498 6.186a2.974 2.974 0 0 0-2.096-2.103C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.402.583a2.974 2.974 0 0 0-2.096 2.103C0 8.09 0 12 0 12s0 3.91.502 5.814a2.974 2.974 0 0 0 2.096 2.103C4.5 20.5 12 20.5 12 20.5s7.5 0 9.402-.583a2.974 2.974 0 0 0 2.096-2.103C24 15.91 24 12 24 12s0-3.91-.502-5.814zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  )
);
YouTubeIcon.displayName = 'YouTubeIcon';

export const PinterestIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.544-.095-.81-.18-2.053.037-2.938.197-.84 1.268-5.348 1.268-5.348s-.323-.647-.323-1.603c0-1.503.872-2.627 1.956-2.627.923 0 1.37.693 1.37 1.523 0 .929-.59 2.317-.894 3.606-.255 1.08.54 1.962 1.6 1.962 1.918 0 3.396-2.022 3.396-4.94 0-2.58-1.854-4.387-4.503-4.387-3.07 0-4.872 2.303-4.872 4.682 0 .927.357 1.924.803 2.466.089.108.102.202.075.31-.082.336-.268 1.08-.305 1.229-.048.197-.158.239-.366.145-1.363-.635-2.215-2.62-2.215-4.216 0-3.437 2.497-6.593 7.207-6.593 3.787 0 6.73 2.7 6.73 6.31 0 3.764-2.37 6.796-5.66 6.796-1.106 0-2.147-.574-2.5-1.25l-.68 2.59c-.246.94-.91 2.053-1.356 2.75.995.308 2.048.474 3.146.474 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  )
);
PinterestIcon.displayName = 'PinterestIcon';

export const TikTokIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"   // ✅ use fill for logos  
      xmlns="http://www.w3.org/2000/svg"
      // stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2h2.5c.1 1.3.6 2.5 1.5 3.5s2.2 1.4 3.5 1.5V9c-1.5 0-3-.5-4.2-1.4v6.6c0 2.9-2.4 5.3-5.3 5.3S4.2 17.1 4.2 14.2c0-2.4 1.6-4.4 3.8-5v2.6c-.7.4-1.2 1.2-1.2 2.1 0 1.3 1.1 2.4 2.4 2.4s2.4-1.1 2.4-2.4V2z" />
    </svg>
  )
);

TikTokIcon.displayName = "TikTokIcon";
