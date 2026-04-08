/* SVG Illustration Components for HealthyHaat */

// 3D-style SVG icons for trust badges, categories, etc.

export const SVGLeaf = ({ size = 40, color = '#336939' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="leafGrad" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor={color} stopOpacity="0.9"/>
        <stop offset="100%" stopColor={color} stopOpacity="0.5"/>
      </radialGradient>
    </defs>
    <ellipse cx="28" cy="20" rx="16" ry="22" fill={`url(#leafGrad)`} transform="rotate(-25 28 20)"/>
    <path d="M24 44 C24 44 20 32 22 20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <ellipse cx="28" cy="20" rx="16" ry="22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" transform="rotate(-25 28 20)"/>
  </svg>
);

export const SVGTruck = ({ size = 40, color = '#0ea5e9' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="truckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color}/>
        <stop offset="100%" stopColor={color} stopOpacity="0.6"/>
      </linearGradient>
    </defs>
    <rect x="4" y="16" width="28" height="18" rx="3" fill={`url(#truckGrad)`}/>
    <path d="M32 22h8l4 8v4h-12V22z" fill={color} opacity="0.85"/>
    <circle cx="12" cy="36" r="4" fill="#fff" stroke={color} strokeWidth="2"/>
    <circle cx="36" cy="36" r="4" fill="#fff" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="36" r="1.5" fill={color}/>
    <circle cx="36" cy="36" r="1.5" fill={color}/>
    <rect x="8" y="20" width="10" height="8" rx="1.5" fill="white" opacity="0.3"/>
  </svg>
);

export const SVGShield = ({ size = 40, color = '#22c55e' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color}/>
        <stop offset="100%" stopColor={color} stopOpacity="0.55"/>
      </linearGradient>
    </defs>
    <path d="M24 4L8 10v12c0 9 7 16.9 16 20 9-3.1 16-11 16-20V10L24 4z" fill={`url(#shieldGrad)`}/>
    <path d="M17 24l5 5 9-9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SVGReturn = ({ size = 40, color = '#f59e0b' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="returnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color}/>
        <stop offset="100%" stopColor={color} stopOpacity="0.55"/>
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="18" fill={`url(#returnGrad)`} opacity="0.2"/>
    <path d="M14 24a10 10 0 1 1 2.93 7.07" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <polyline points="10,20 14,24 18,20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SVGLock = ({ size = 40, color = '#8b5cf6' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color}/>
        <stop offset="100%" stopColor={color} stopOpacity="0.6"/>
      </linearGradient>
    </defs>
    <rect x="10" y="22" width="28" height="20" rx="5" fill={`url(#lockGrad)`}/>
    <path d="M16 22v-6a8 8 0 0 1 16 0v6" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="24" cy="32" r="3" fill="white" opacity="0.8"/>
    <rect x="22.5" y="34" width="3" height="4" rx="1.5" fill="white" opacity="0.8"/>
  </svg>
);

export const SVGFarm = ({ size = 40, color = '#336939' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="farmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color}/>
        <stop offset="100%" stopColor={color} stopOpacity="0.6"/>
      </linearGradient>
    </defs>
    <path d="M4 36h40" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 36V22l10-10 10 10V36" fill={`url(#farmGrad)`} fillOpacity="0.3" stroke={color} strokeWidth="1.5"/>
    <rect x="15" y="28" width="6" height="8" rx="1" fill={color} opacity="0.6"/>
    <path d="M32 36V26l6-4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="18" cy="14" r="2" fill={color}/>
  </svg>
);

// 3D-style produce SVGs for hero and category sections
export const SVGVegetable = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="vegGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#81c784"/>
        <stop offset="100%" stopColor="#2e7d32"/>
      </radialGradient>
      <radialGradient id="vegShadow" cx="50%" cy="80%" r="50%">
        <stop offset="0%" stopColor="#000" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#000" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="40" cy="72" rx="22" ry="5" fill="url(#vegShadow)"/>
    <circle cx="40" cy="42" r="24" fill="url(#vegGrad)"/>
    <circle cx="32" cy="35" r="8" fill="white" opacity="0.15"/>
    <path d="M40 18 C40 18 48 10 52 14 C56 18 50 26 40 26" fill="#4caf50" opacity="0.7"/>
    <path d="M40 18 C40 18 32 8 28 12 C24 16 32 26 40 26" fill="#388e3c" opacity="0.7"/>
    <path d="M40 18 L40 26" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const SVGFruit = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="fruitGrad" cx="35%" cy="25%" r="70%">
        <stop offset="0%" stopColor="#ff8a80"/>
        <stop offset="100%" stopColor="#d32f2f"/>
      </radialGradient>
    </defs>
    <ellipse cx="40" cy="72" rx="22" ry="5" fill="#0002" />
    <circle cx="40" cy="43" r="24" fill="url(#fruitGrad)"/>
    <circle cx="32" cy="36" r="8" fill="white" opacity="0.18"/>
    <path d="M40 20 C44 12 52 10 52 10 C52 10 48 20 40 22" fill="#66bb6a" opacity="0.9"/>
    <path d="M38 20 L40 28" stroke="#388e3c" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SVGGrain = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff9c4"/>
        <stop offset="100%" stopColor="#f9a825"/>
      </linearGradient>
    </defs>
    <ellipse cx="40" cy="72" rx="22" ry="5" fill="#0002"/>
    {[0,1,2,3,4].map((i) => (
      <ellipse key={i} cx={28 + i * 6} cy={55 - i * 4} rx="5" ry="9"
        fill="url(#grainGrad)" stroke="#f57f17" strokeWidth="0.8"
        transform={`rotate(${-10 + i * 5} ${28 + i*6} ${55 - i*4})`}/>
    ))}
    <path d="M40 60 C40 60 38 40 38 25" stroke="#f57f17" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const SVGOil = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="oilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffe082"/>
        <stop offset="100%" stopColor="#ffa000"/>
      </linearGradient>
    </defs>
    <ellipse cx="40" cy="72" rx="16" ry="5" fill="#0002"/>
    <rect x="28" y="30" width="24" height="36" rx="8" fill="url(#oilGrad)"/>
    <rect x="34" y="22" width="12" height="12" rx="3" fill="#ffca28"/>
    <rect x="37" y="18" width="6" height="6" rx="2" fill="#ffb300"/>
    <rect x="30" y="34" width="8" height="24" rx="4" fill="white" opacity="0.2"/>
  </svg>
);

export const SVGHoney = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="honeyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff59d"/>
        <stop offset="100%" stopColor="#f57f17"/>
      </linearGradient>
    </defs>
    <ellipse cx="40" cy="72" rx="18" ry="5" fill="#0002"/>
    <path d="M26 44 L34 28 H46 L54 44 L46 60 H34 Z" fill="url(#honeyGrad)"/>
    <path d="M26 44 L34 28 H46 L54 44 L46 60 H34 Z" stroke="#f57f17" strokeWidth="1"/>
    <path d="M32 42 L40 30 L48 42 L40 54 Z" fill="white" opacity="0.15"/>
    <path d="M37 20 Q40 14 43 20" stroke="#f9a825" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);
// Functional icons for Dashboards and UI
export const SVGDashboard = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2"/>
  </svg>
);

export const SVGUsers = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const SVGFarmersIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3l1-3z" fill={color}/>
    <path d="M12 14c-4 0-7 2-7 6v1h14v-1c0-4-3-6-7-6z" stroke={color} strokeWidth="2"/>
  </svg>
);

export const SVGInventory = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8M21 8l-2-5H5L3 8m18 0H3m9 4v4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SVGOrders = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z M3 6h18 M16 10a4 4 0 0 1-8 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SVGSecurityIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SVGSearchIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2.5"/>
    <path d="M21 21l-4.35-4.35" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const SVGBellIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SVGPowerIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0 M12 2v10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const SVGArrowLeft = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5 M12 19l-7-7 7-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Social SVGs for Footer
export const SVGFacebook = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
  </svg>
);

export const SVGInstagram = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01"/>
  </svg>
);

export const SVGTwitter = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const SVGWhatsapp = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.67-1.611-.918-2.208-.242-.588-.487-.51-.67-.52-.174-.01-.374-.011-.574-.011s-.526.075-.802.374c-.276.299-1.053 1.026-1.053 2.503 0 1.478 1.075 2.903 1.225 3.101.15.198 2.113 3.226 5.116 4.524.714.309 1.271.494 1.706.633.718.228 1.37.196 1.885.119.574-.085 1.758-.719 2.006-1.412.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.027 6.987 2.895a9.825 9.825 0 0 1 2.89 6.988c-.001 5.45-4.434 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.411 0 .01 5.403.007 12.04c0 2.123.553 4.197 1.602 6.034L0 24l6.135-1.61a11.83 11.83 0 0 0 5.912 1.57h.005c6.637 0 12.038-5.404 12.041-12.04a11.85 11.85 0 0 0-3.527-8.414"/>
  </svg>
);
