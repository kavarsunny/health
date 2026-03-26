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
