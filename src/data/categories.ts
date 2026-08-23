import { CategoryInfo, CollectionInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'women',
    name: "Women's Fashion",
    slug: 'women',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkFP77HipQb1sZvDe6XtByJEm4EzrJUmvCYaRY0wldz8FRvF6pVTi9xem4vQEwuK_RNLdpnUbNORpGw-JArtxe9kO2BstlSanE_4kTA2LkEa3LyRmZheH2KgwEFAKOvb65_atNucQoFzjBEYVJggmjYx3DNcQznkp_m84i_F_bv3yoiZ1oCWE-B1TN1q0ZUeG_jXceCw6wlp1aZwZxMt0EojNvGOWwti8MySFOsg4pZtQtipzStCXl1Q',
    tagline: 'Timeless Silhouettes & Tactile Fabrics',
    description: 'Explore tailored blazers, fluid silk tops, pleated trousers, and bias-cut dresses designed for timeless luxury.',
    itemCount: 42
  },
  {
    id: 'men',
    name: "Men's Fashion",
    slug: 'men',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrnVuqbzU_-WUi6vCaUp0L2U8PwZk7sCitDHfmKo-YTnm5x4k1O-QAjJIsFscdHtP9bmrvx4ICKnLbACBRXZrD6YPu0vh9WnQTSVseowdGSfau9hatTdsWgJW67cOA2652jHTFNtK88_46ztaN32PnvtqWFBb5P0lymIkxbmbfFfrCM7CfnXfKojz7iPBSg8jsEa-7UpWZmSg4b4N7tbjtfXWvfqGM8Jlz0C4J0bd9HrVuSAgEX6Ke8g',
    tagline: 'Impeccable Tailoring & Bespoke Wool',
    description: 'Hand-canvassed blazers, crisp poplin shirts, pleated trousers, and structured outerwear designed for the discerning gentleman.',
    itemCount: 28
  },
  {
    id: 'shoes',
    name: 'Luxury Footwear',
    slug: 'shoes',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7E1onIXQeS3k0cAJ-DZwQ9UCl_3CK5L53ad48mXcUVgCOmsexCR_mSfczoJ2FyZcGona_GGG6LE2QSdLDVzr4t4cMzmw3qKrdgvgWEqq-gG61yUK7kgFzcqzDODSKyM6OxldFicicJndmdBK_H4AjX7rDICs-K115AeK6jNf-wLVWJg2SoMiRhpUgImK-LrJL6n26owAYgogJ51sKoNMwNzfWxwSkIiRA5kEJu-_OJkwB5KwBkXhOWA',
    tagline: 'Hand-Crafted Italian Leather & Modern Silhouettes',
    description: 'Italian leather loafers, ergonomic stiletto pumps, and minimalist sandals sculpted with supreme comfort in mind.',
    itemCount: 19
  },
  {
    id: 'leather',
    name: 'Handbags & Leather',
    slug: 'leather',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlR-CmIHTUPy8fmYEpWeNm92NiA5OCjz1lpZ7XVmj8lM_cvZfSNj5R24zCVIjGgI6-RYSSqI-ivqmd4TY0b_ivb4o6HxeHjXEGm5qAAhqNPxtf9ost07WF-g0t63wfPCgHz4VlPgOpazpmiNPINdAjfYD2tiKZ6ftP4de1Ige9h2cfwUKTyQhJ1GNmpR5kUjkgfXTDejxGhZLzctujmmBz1qwpkKergkCXNLiCeoYC-uWmwvnIQTSN-Q',
    tagline: 'Architectural Forms & Fine Tuscan Calfskin',
    description: 'Structured top-handle bags, everyday calfskin totes, and artisan wallets handcrafted in Florence.',
    itemCount: 15
  },
  {
    id: 'beauty',
    name: 'Beauty & Care',
    slug: 'beauty',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMTH4yZLctiP8KSjITannLIluBzDNHqcr1oRfR9WC4FyjCcfgWXa_-ccnhUNT2afO0eRCwq4VaHetiv6-xZTeH8DOXKLjdWPTHZ1dFzKLRujQTZS8xpwij1N63yp847lBaGPeKUFPzHJaacdaZ3Cn_sUwdSqr7k6JtzTf-hnOntpB_JA6YWTR08ODaw_QW8OyR54TFtaVODuMW4C_rkpTWTUuk5XdsKfO9rBzq8F-xneKdLsXv8wL5dw',
    tagline: 'Clean Botanicals & Luminous Formulations',
    description: 'Skincare-infused radiance foundations, botanical face elixirs, and bespoke fragrance compositions.',
    itemCount: 14
  }
];

export const COLLECTIONS: CollectionInfo[] = [
  {
    id: 'autumn-quiet-luxury',
    name: 'The Autumn Quiet Luxury Drop',
    slug: 'autumn-quiet-luxury',
    subtitle: 'Fall / Winter 2026 Collection',
    season: 'Autumn / Winter',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQog3FQZNSoJcbtaieDc2EBd0DJtjSWjOuqxlV4b_2j_AMFC6UPk8NGrYRbq1C_m6mLHtURD0VIEw_WdnRbtVjAE3LYnMQDUdcC2OTPgbeQg2_2C3c_Z7YSDKG7CpESa1HeAOnwS2VnMMONLBnL7HgHMNYI5bRGILnn7m94EmLbi4W7JsGKOYptVPpYYeUeo8ZpCboVEVnm7kVG493xUd-hI-5ifBpF3Nkai82nWEbyLdtuEYBYld7fA',
    description: 'An ode to neutral warmth, structured outerwear, and opulent cashmere knits crafted to outlast seasonal trends.'
  },
  {
    id: 'summer-silk-linen',
    name: 'The Silk & French Linen Series',
    slug: 'summer-silk-linen',
    subtitle: 'Resort & Warm Weather',
    season: 'Spring / Summer',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9eKoGvWDy2oS0Gj1AWJXAc4plOZo7Tg2ej80ILzTkFUf1aXWeSYY4R8waIupON0Znt_O3TKIqbJW11qLve6u-ZGRI6k6Sq2zHehbVrSvYhucNNEso5D6zjLKGbpedmL8Hd7UETfEJX0kv_Kr-eJ-pZKnLnSAfALmhcI6JtRonXcycxo48Bn0ThcOoXPIA3rjc7TooAM0JnZY1yjbJcibx73mxPOZrLTMrgCVKnd7EmKScFBffYit0IQ',
    description: 'Fluid drape meets breathability. Crafted from 100% natural Mulberry silk and sustainably grown French flax.'
  },
  {
    id: 'italian-leather',
    name: 'The Tuscan Artisan Leather Edit',
    slug: 'italian-leather',
    subtitle: 'Master Craftsman Workshop',
    season: 'Permanent Core',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbZTXNvyQ7xdoXSInV5ptsGT2eC9ZRQgXrn5x7ALGlJ6c7CBgdzkG6P38CKWOCgWySKpoZTQ96W99bdB_wA76R6-QNVS_R5f9CFRgFNU-8iPjgLl2vbCSjtWautPIciWCnMeGpkh4Nim52a0rarfLMmtRnBs_TX3l67ohSn5nSiJyvdFM5Wo_FQ56CpD1b8jI02fFN6RwIiAs0TTyGlHPD5QE0d5EVyto0cFzGFPrdZcPE3SietW4mzg',
    description: 'Vegetable-tanned leather bags, bespoke shoes, and hand-finished accessories with 24k brushed gold accents.'
  }
];
