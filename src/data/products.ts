import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'sofia-silk-blouse',
    slug: 'sofia-silk-blouse',
    name: 'The Sofia Silk Blouse',
    brand: 'VELORA COLLECTION',
    price: 395,
    rating: 4.9,
    reviewsCount: 38,
    category: 'women',
    subcategory: 'Tops & Blouses',
    collection: 'The Autumn Quiet Luxury Drop',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4-wm_Q_pJ_qjFe0tocDYfWCKlha6k9MhXPkbXC4dnvSItiyHhCHtLQZEZ7shluiZGgHrQ4OJ0nWHU2SGdPlhMO2XIk3ImE55lO8cPeA0jfvMc7nWSnOC5hr2VQLpwa7_eFt8d4psTUkyfj-3j3x0O3DSHjKf8cZFzOI5JTfd_pWOhxNAoiXxFs2hS5THjqWV06I0HqrC7J0cFYF9FXnaR42cDP0by16PGcQR_1o4t60MuekQCwwi3ew',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBkr00_ekpcGdkTlVYO2ffoUlD13jD7pv2_bqdO1l7ktv68cZX2ftZWKR_U3qZyniOLzVHZErELc-n0NsdbZLh1f3qRzrZDBoHKe6SwvXCpG6Y4Fqo_pSIiv4w4Dmn9iUwdIkkipPqoEZtVAH-zsYcgEkWnAZ5PJvG64w7P87TKYqwLIU9DRlRx0oKOW5YibjDcFx2zyzPCf0CwkVil5k9FYyJ6pQv64_bHPccQGpPRG0QDN6wFkzLcw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAzL4rN6zHQBWN3hdIQJ7Bejww0p0sOrLa3TkV9LNETBi224iWz5TDKz7RMl0hxwpHzEaaWG2aYvHKayUjrcnZnCcNuRu5OlyCTKJzndHVRa6L1DP-XtlzGwGE9BcpDnvp3IYFUXBuo_LIpl54RtiRF1boamiUSX-yqTOnY-s_UYS0fh4czpLMZ7BS8TJuWa5LjBwkV0MomCYAw-oxdtLNtGQwKXfNFpZD-0d2nkLDN-qmSXj9ZFHdeEg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvQ3BDXfIzrMaKMdurK84JTdeUp2cIoKgapSsDqbh_MTQPdW4tN9o_iEE8ETGXCbfDS3Ea82HTu0TQj-JBC2HuppnEFvrRY8_D0t5EFCESiRZvXOy9Q7eUskeNlmE1fCm39ay5yjwX0YSPORDdXmjGo9egM-VpOIILZqbcZ1FqXTRN16HAzkFRdgiH3LfHd-CObeVInvo6o09WT58d7OQjEY0zk9aVgEu_v9xoEEq2JOW1T2F-onkksg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGWvng0zBfWsNtP4ntg7AbSJJ1xHzSngWEea2igia98PzqgEmP5LtqYLfNHSOXgoOTRNbpkmkp8BvZKwPbU8AYiY1F3Uf_mV-CwXnfg2chH9IM3yI2HC6ZfFRalXF-0UGjwmo7LLpG4X7qZ5kxTv8myO9Yec46VWJPYFnMxhYL5KOMcGA4_E-NsJ4L2NcbeqaBugAHjRtyvWUGs7MMhIsK_2FfBRDD4wch2v8NAaPcQLNLp3efqiQPsg'
    ],
    description: 'Effortlessly elegant and fluid, the Sofia Blouse is crafted from 100% mulberry silk. Featuring a relaxed silhouette, subtle dolman sleeves, and a delicate gathered neckline, it transitions seamlessly from day to evening. A cornerstone of quiet luxury.',
    details: [
      'Relaxed, fluid fit. True to size.',
      'Hidden front mother-of-pearl button placket.',
      'Subtle dolman sleeves with tailored buttoned cuffs.',
      'Gentle ruching along the collarband.',
      'Model is 5\'10" and wearing a size S.'
    ],
    fabricCare: [
      '100% Mulberry Silk (22 Momme). Responsibly sourced from ethical sericulture.',
      'Dry clean only recommended, or gentle hand wash cold with silk detergent.',
      'Cool iron on reverse side if needed. Do not bleach or tumble dry.'
    ],
    shippingInfo: [
      'Complimentary express global delivery on orders over $500.',
      'Delivered in our signature signature sustainable Velora keepsake gift box.',
      'Hassle-free 30-day returns and exchanges.'
    ],
    colors: [
      { name: 'Ivory', hex: '#F5F5DC' },
      { name: 'Noir', hex: '#1B1C1A' },
      { name: 'Warm Taupe', hex: '#9E8B75' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    completeTheLookIds: ['tailored-wide-leg-trouser', 'structured-mini-tote-espresso', 'aura-leather-sandal', 'lumina-pendant'],
    reviews: [
      {
        id: 'r1',
        author: 'Elena R.',
        rating: 5,
        date: '2 weeks ago',
        title: 'The pinnacle of quiet luxury',
        comment: 'The weight and luster of this mulberry silk are truly extraordinary. The drape is flattering without feeling oversized. Received endless compliments at a gallery opening in Paris.',
        verified: true
      },
      {
        id: 'r2',
        author: 'Camille V.',
        rating: 5,
        date: '1 month ago',
        title: 'Sublime tailoring',
        comment: 'Buttons and cuff detailing are immaculate. Looks incredible tucked into the high-waisted trousers or worn fluidly over sleek jeans.',
        verified: true
      }
    ]
  },
  {
    id: 'camel-tailored-coat',
    slug: 'camel-tailored-coat',
    name: 'The Camel Tailored Coat',
    brand: 'VELORA ATELIER',
    price: 450,
    rating: 5.0,
    reviewsCount: 24,
    category: 'outerwear',
    subcategory: 'Coats & Jackets',
    collection: 'The Autumn Quiet Luxury Drop',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkAn82MWlJ3IbISl_H2HeGpaM0zhQc3DuY57Ayc2LVt1Wyd8lRdG4Yby_yE2gmUJI0YvXjLyZuIiLx1CPLNWn-QHoWky27Xaz6m3I6qKwWJGgxl6Jdx_SzfT3_sM-FFbX8dUZ70-2698z6WKHflwgrqsW2m20GocgIrABhF-lCL6i5W6CO9ogKovRiyFu6o-B-NeLtv7E9CoT9iEBfmhOYFTJ1xQlmNUfoKfRNkJS9DPSstEotXKbhow',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQog3FQZNSoJcbtaieDc2EBd0DJtjSWjOuqxlV4b_2j_AMFC6UPk8NGrYRbq1C_m6mLHtURD0VIEw_WdnRbtVjAE3LYnMQDUdcC2OTPgbeQg2_2C3c_Z7YSDKG7CpESa1HeAOnwS2VnMMONLBnL7HgHMNYI5bRGILnn7m94EmLbi4W7JsGKOYptVPpYYeUeo8ZpCboVEVnm7kVG493xUd-hI-5ifBpF3Nkai82nWEbyLdtuEYBYld7fA'
    ],
    description: 'An iconic, timeless double-breasted longline coat sculpted from virgin wool and blended with Italian cashmere. Structured shoulders and a waist-cinching silhouette bring effortless drama.',
    details: [
      'Double-breasted front with horn-button fastening.',
      'Peak lapels and hand-finished pick stitching.',
      'Full cupro lining for seamless layering.',
      'Dual deep welt pockets with flap closures.'
    ],
    fabricCare: [
      '90% Virgin Wool, 10% Cashmere. 100% Cupro lining.',
      'Specialist dry clean only.'
    ],
    shippingInfo: ['Complimentary insured shipping included with garment bag.'],
    colors: [
      { name: 'Camel Tan', hex: '#C4A78D' },
      { name: 'Midnight Charcoal', hex: '#2C2C2C' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isBestSeller: true,
    isFeatured: true,
    completeTheLookIds: ['sofia-silk-blouse', 'classic-beige-pumps', 'structured-noir-tote']
  },
  {
    id: 'namola-maxima',
    slug: 'namola-maxima',
    name: 'Namola Maxima Slip Dress',
    brand: 'VELORA COLLECTION',
    price: 125,
    rating: 4.8,
    reviewsCount: 24,
    category: 'women',
    subcategory: 'Dresses',
    collection: 'Summer Silk & Linen',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCR9KuYqRtUwhPLF9P8otogl8NlpbQYHjfvigtwe6POCZHz98IxKB8hS6P9bi5T4DLO_g9z2A4j1dMEIQGbeh7FNsVh5mI0S47P39Ov--lwcJ5NtrXUzirt_7Mx9wC1KJFBuA21yUpDdfbdxZNCdRRQGohKmZa49sUqgShPr_dyOGZCCioTBQeRcnksbYN9nHvrWf0S7DehbP-Lydwa-VaOjaGHqqfOg84Ik5BXip-DmyUC_E9if-7X1g'
    ],
    description: 'A minimalist olive green slip dress with graceful bias cut that drapes naturally across the form. Perfect for warm evening gatherings or layered under tailored blazers.',
    details: [
      'Flattering bias-cut body.',
      'Adjustable delicate spaghetti straps.',
      'Ankle-grazing length with subtle side slit.'
    ],
    fabricCare: ['100% Eco-washed Viscose Silk.', 'Hand wash cold or dry clean.'],
    shippingInfo: ['Standard 3-5 day delivery or express next-day option.'],
    colors: [
      { name: 'Olive Moss', hex: '#6E7658' },
      { name: 'Champagne Sand', hex: '#E2D5C3' },
      { name: 'Obsidian', hex: '#1B1C1A' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    isNew: true,
    completeTheLookIds: ['aura-leather-sandal', 'lumina-pendant']
  },
  {
    id: 'mens-connertum',
    slug: 'mens-connertum',
    name: "Men's Connertum Tweed Blazer",
    brand: 'VELORA HOMME',
    price: 295,
    rating: 5.0,
    reviewsCount: 18,
    category: 'men',
    subcategory: 'Suits & Blazers',
    collection: 'Artisan Tailoring',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATCN3mDNWdMgrEYUNvSOJ2kIKoXioa_acMKWCMCVhBZfSxQ88CZtxnN3iKWNGBN_wtrlZOBRZA_Te9fhTen6hehnT07DAcy5QfO6Z3TFVxvfCd4o0GKtgUR_-bC8LYiHxPaGQqCcuTTecnddFIzA-HGYN7CL1h65WDzk3dnrCn4Y8EnIEkJVXr-CNG4kM1UKK6IlyVKX4Zh8IwifvjUuyY4MXVeN5M1A-YnTUp8H69BlqswvDUgyYVfA'
    ],
    description: 'A sharply tailored brown tweed blazer designed with a modern silhouette. Perfect for elevated smart-casual style or formal events with understated sophistication.',
    details: [
      'Single-breasted 2-button closure.',
      'Notch lapel with decorative boutonnière hole.',
      'Double back vent for flexibility and structure.'
    ],
    fabricCare: ['100% Wool Tweed. Dry clean only.'],
    shippingInfo: ['Free express shipping worldwide.'],
    colors: [
      { name: 'Earthy Brown Tweed', hex: '#7A5B42' },
      { name: 'Charcoal Grey', hex: '#3C3D3E' }
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    inStock: true,
    completeTheLookIds: ['hiptotamus-bespoke', 'leather-billfold-wallet']
  },
  {
    id: 'hiptotamus-bespoke',
    slug: 'hiptotamus-bespoke',
    name: 'Hiptotamus Bespoke Leather Loafers',
    brand: 'VELORA ATELIER',
    price: 180,
    rating: 4.7,
    reviewsCount: 8,
    category: 'shoes',
    subcategory: 'Loafers & Dress Shoes',
    collection: 'Italian Leather Series',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDz-nIvzM3lvLxyp7sl2Dlmji9Yv68JAifJI9kD6lFrNTtd38zKLXhLP1YLJn3tTNU1yI81_B44oQfkoW7a-glu6SCFhgij-Ybn8xlj_zmsSs8qt4x66LOh4RelfnTT2KQRYlnptRcdhCw4AClCNW0necNbSJO16ap8lvF6Qrw33QXDTu6AMothgHU8dw-tHSDTNAwZCcmM17knG2ev2skx7fv4Y3vL8nzyhy9-81fn5z-VlnE8BJzoRA'
    ],
    description: 'Classic penny loafers crafted from hand-burnished Italian calfskin. Features Goodyear-welted soles, cushioned leather insole, and timeless stitching.',
    details: [
      'Full grain Italian calf leather.',
      'Hand-stitched apron toe.',
      'Stacked leather heel with rubber traction insert.'
    ],
    fabricCare: ['Condition periodically with natural beeswax shoe cream.'],
    shippingInfo: ['Includes Velora dust bags and cedar shoe tree kit.'],
    colors: [
      { name: 'Cognac Brown', hex: '#7D4726' },
      { name: 'Black Polish', hex: '#151515' }
    ],
    sizes: ['40 EU', '41 EU', '42 EU', '43 EU', '44 EU', '45 EU'],
    inStock: true,
    completeTheLookIds: ['mens-connertum', 'leather-billfold-wallet']
  },
  {
    id: 'laren-neo-blazer',
    slug: 'laren-neo-blazer',
    name: 'Laren Neo-Blazer in Ivory',
    brand: 'VELORA COLLECTION',
    price: 320,
    rating: 5.0,
    reviewsCount: 42,
    category: 'women',
    subcategory: 'Suits & Blazers',
    collection: 'Minimalist Essentials',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDgJFBM1eQE5nucBZpebgTKLPBbzjEExLbbpsLEJ29Ezr8wUIrD_uDcGZPAmVGJl1iU6NB2IR6_xsEKPA-EZE6C_H-sfI4LSdBeAPOLyuPM9yT5ZWRJxYYee7xKS-GlwrHJUsGF0Q7sKQy2c3MkyI4vHxMs8icBimwNYcYNYC4FZbiydI9X5yguzM5W2em4pQhY9G5u9L4tCj5hes6Gu98_82YKVtvlT0IXCav-2ixlGaz_bygPnXjWpA'
    ],
    description: 'A double-breasted ivory blazer that balances architectural precision with casual ease. Made with premium tropical wool blend for all-season comfort.',
    details: [
      'Double-breasted 4-button front.',
      'Lightly padded structured shoulders.',
      'Contoured waistline for an elongated silhouette.'
    ],
    fabricCare: ['70% Wool, 30% Silk blend. Dry clean.'],
    shippingInfo: ['Shipped in structured hanger box.'],
    colors: [
      { name: 'Crisp Ivory', hex: '#F9F7F2' },
      { name: 'Black Matte', hex: '#1B1C1A' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    completeTheLookIds: ['tailored-wide-leg-trouser', 'structured-noir-tote', 'lumina-pendant']
  },
  {
    id: 'linen-midi-dress',
    slug: 'linen-midi-dress',
    name: 'Linen Capri Midi Dress',
    brand: 'VELORA COLLECTION',
    price: 220,
    rating: 4.9,
    reviewsCount: 12,
    category: 'women',
    subcategory: 'Dresses',
    collection: 'Summer Silk & Linen',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9eKoGvWDy2oS0Gj1AWJXAc4plOZo7Tg2ej80ILzTkFUf1aXWeSYY4R8waIupON0Znt_O3TKIqbJW11qLve6u-ZGRI6k6Sq2zHehbVrSvYhucNNEso5D6zjLKGbpedmL8Hd7UETfEJX0kv_Kr-eJ-pZKnLnSAfALmhcI6JtRonXcycxo48Bn0ThcOoXPIA3rjc7TooAM0JnZY1yjbJcibx73mxPOZrLTMrgCVKnd7EmKScFBffYit0IQ'
    ],
    description: 'Breezy luxury in 100% French linen. Featuring delicate sweetheart bust seam details, a fitted bodice, and a flowing A-line skirt with hidden pockets.',
    details: [
      '100% Certified French Flax Linen.',
      'Smocked back panel for comfortable flexible fit.',
      'Discreet side seam pockets.'
    ],
    fabricCare: ['Machine wash gentle in cold water. Hang to air dry.'],
    shippingInfo: ['Free standard shipping.'],
    colors: [
      { name: 'Natural Oatmeal', hex: '#E6DEC8' },
      { name: 'Soft Olive', hex: '#7A8068' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    isNew: true,
    completeTheLookIds: ['aura-leather-sandal', 'lumina-pendant']
  },
  {
    id: 'structured-noir-tote',
    slug: 'structured-noir-tote',
    name: 'Structured Noir Leather Tote',
    brand: 'VELORA ATELIER',
    price: 380,
    rating: 4.8,
    reviewsCount: 19,
    category: 'leather',
    subcategory: 'Handbags & Totes',
    collection: 'Italian Leather Series',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDEBK4yroeg1RSYt6T3ja110reZrUtmkLflYv-4oDAOI511uZNweGHXRWvtZr0sFEc223gpaVRKSE42oLXnbaIe5Jfhhn7yE67KrLakKCmUwfx6O3IGP9HMmETmfGXOI8GgZLW_3C8qCFWep1Fms7ZogQM0mtP6vD46hQ8gb6yi5xrud4NOM0Ooc5p-ZAKtzwH-4icEBunmOLA4uhpgDZHiufmczEYAJDncTToLHYoc0LqqFu3uMDW2LQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAlR-CmIHTUPy8fmYEpWeNm92NiA5OCjz1lpZ7XVmj8lM_cvZfSNj5R24zCVIjGgI6-RYSSqI-ivqmd4TY0b_ivb4o6HxeHjXEGm5qAAhqNPxtf9ost07WF-g0t63wfPCgHz4VlPgOpazpmiNPINdAjfYD2tiKZ6ftP4de1Ige9h2cfwUKTyQhJ1GNmpR5kUjkgfXTDejxGhZLzctujmmBz1qwpkKergkCXNLiCeoYC-uWmwvnIQTSN-Q'
    ],
    description: 'An architectural top-handle tote in smooth calf leather with 24k brushed gold hardware. Sized to hold your daily essentials, tablet, and notebook with structured grace.',
    details: [
      'Smooth box calf leather from Florence, Italy.',
      'Suede-lined interior with zipped security pocket.',
      'Detachable and adjustable shoulder strap.'
    ],
    fabricCare: ['Store in protective dust bag stuffed to preserve structure.'],
    shippingInfo: ['Complimentary signature delivery.'],
    colors: [
      { name: 'Noir Black', hex: '#111111' },
      { name: 'Rich Espresso', hex: '#4A3728' }
    ],
    sizes: ['One Size (30cm x 22cm x 12cm)'],
    inStock: true,
    isFeatured: true,
    completeTheLookIds: ['sofia-silk-blouse', 'camel-tailored-coat']
  },
  {
    id: 'charcoal-wool-blazer',
    slug: 'charcoal-wool-blazer',
    name: 'Charcoal Wool Bespoke Blazer',
    brand: 'VELORA HOMME',
    price: 550,
    rating: 5.0,
    reviewsCount: 45,
    category: 'men',
    subcategory: 'Suits & Blazers',
    collection: 'Artisan Tailoring',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5RqdSWHpyXgcuE8N59inDLZXiv4d-yGReteNdWlDmI-yId6ARKIvRi-p9o9uQr0bcZ2fc4f5RHtmo2m-DOLiiF4kYorD79NKMhGVchLYD2JeW5fRbHZcAySuT7KwlMHRfKvw1xuw6NioEowqx4vLopnm6XwiyxzK_x-47JDXO659J8enmcuI75YKC-4BCM35lGcHb5yChYgv4MBjAoYH1DdX7baY7tYkFwM8KVLGZaX77TyE6GxkOEQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBrnVuqbzU_-WUi6vCaUp0L2U8PwZk7sCitDHfmKo-YTnm5x4k1O-QAjJIsFscdHtP9bmrvx4ICKnLbACBRXZrD6YPu0vh9WnQTSVseowdGSfau9hatTdsWgJW67cOA2652jHTFNtK88_46ztaN32PnvtqWFBb5P0lymIkxbmbfFfrCM7CfnXfKojz7iPBSg8jsEa-7UpWZmSg4b4N7tbjtfXWvfqGM8Jlz0C4J0bd9HrVuSAgEX6Ke8g'
    ],
    description: 'An exquisite piece of masculine tailoring. Woven from Super 140s virgin wool with full canvas construction that molds to your silhouette over time.',
    details: [
      'Full canvas construction with hand-sewn lapel roll.',
      'Surgeon cuffs with functional horn buttons.',
      'Sleek jetted pockets.'
    ],
    fabricCare: ['100% Super 140s Wool. Dry clean only.'],
    shippingInfo: ['Complimentary tailored garment bag and hanger included.'],
    colors: [
      { name: 'Charcoal Melange', hex: '#2E3033' },
      { name: 'Midnight Blue', hex: '#1C2331' }
    ],
    sizes: ['38R', '40R', '42R', '44R', '46R'],
    inStock: true,
    isBestSeller: true,
    completeTheLookIds: ['hiptotamus-bespoke', 'leather-billfold-wallet']
  },
  {
    id: 'classic-beige-pumps',
    slug: 'classic-beige-pumps',
    name: 'Classic Pointed Leather Pumps',
    brand: 'VELORA ATELIER',
    price: 250,
    originalPrice: 320,
    rating: 4.6,
    reviewsCount: 19,
    category: 'shoes',
    subcategory: 'Heels & Pumps',
    collection: 'Italian Leather Series',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCyAP40azN84sB189dwlroEubZ-dzU4BtwkpeUulqlyCXYdx-J7Vsu3kLshKdOAdZi2o84TvX7O99iHKCDOuBFKmX0XiOcMqtqyTQyC016Df-HOyY4LLBwABkOaWrts2JyzJrzzgRXvMMZtTJgd1me-fYXkBHWR09zNs7-p4Xt3BPcyib5tLMdcc5N4ZZGGktFrjaKpllAajKqDooVuYMVRO9RjTxhuDsS1dclJCFi3Z7svkukTTkVrA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7E1onIXQeS3k0cAJ-DZwQ9UCl_3CK5L53ad48mXcUVgCOmsexCR_mSfczoJ2FyZcGona_GGG6LE2QSdLDVzr4t4cMzmw3qKrdgvgWEqq-gG61yUK7kgFzcqzDODSKyM6OxldFicicJndmdBK_H4AjX7rDICs-K115AeK6jNf-wLVWJg2SoMiRhpUgImK-LrJL6n26owAYgogJ51sKoNMwNzfWxwSkIiRA5kEJu-_OJkwB5KwBkXhOWA'
    ],
    description: 'The definitive luxury stiletto pump. Handcrafted in Milan from supple nappa leather with memory foam arch support and a balanced 85mm stiletto heel.',
    details: [
      'Supple Italian Nappa leather.',
      '85mm (3.3 inch) wrapped heel.',
      'Orthopedic memory foam cushioning insole.'
    ],
    fabricCare: ['Protect leather with waterproof spray before first wear.'],
    shippingInfo: ['Free returns and exchanges on all footwear.'],
    colors: [
      { name: 'Nude Beige', hex: '#D7C2AD' },
      { name: 'Pure Noir', hex: '#121212' },
      { name: 'Warm Caramel', hex: '#8B5A2B' }
    ],
    sizes: ['36 EU', '37 EU', '38 EU', '39 EU', '40 EU', '41 EU'],
    inStock: true,
    isSale: true,
    completeTheLookIds: ['sofia-silk-blouse', 'tailored-wide-leg-trouser']
  },
  {
    id: 'radiance-foundation',
    slug: 'radiance-foundation',
    name: 'Velora Radiance Luminous Foundation',
    brand: 'VELORA BEAUTÉ',
    price: 65,
    rating: 4.9,
    reviewsCount: 112,
    category: 'beauty',
    subcategory: 'Face & Complexion',
    collection: 'Velora Beauté Essentials',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6ryerog2Yn6PygkmVWKJL_OwW_wx6kIKHIuL6iOjpc054vtsiqIEc0Czdvt9LKjKegi9BzL5QJp2lh7UR2CA3fS89Yo1X0lD8xSiPw3rbyVwrHj0M0fgOYdZW4Lnz45Ta-zBfu09p0WM-9j9NuSa787q1fwVMcbFS_00dkB5VIoRNIYWnhmeLgfrd997zE8IIojHYYICtayKqjh6zIXCGjq8ezZ9EbsCXjj2EfcLxRGg_hejwa0Kpbg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBMTH4yZLctiP8KSjITannLIluBzDNHqcr1oRfR9WC4FyjCcfgWXa_-ccnhUNT2afO0eRCwq4VaHetiv6-xZTeH8DOXKLjdWPTHZ1dFzKLRujQTZS8xpwij1N63yp847lBaGPeKUFPzHJaacdaZ3Cn_sUwdSqr7k6JtzTf-hnOntpB_JA6YWTR08ODaw_QW8OyR54TFtaVODuMW4C_rkpTWTUuk5XdsKfO9rBzq8F-xneKdLsXv8wL5dw'
    ],
    description: 'A breathable, skincare-infused liquid foundation offering light-to-medium buildable coverage with an ethereal, second-skin satin glow. Formulated with Hyaluronic Acid and Camellia Oil.',
    details: [
      'Infused with SPF 30 mineral protection.',
      'Non-comedogenic, fragrance-free, vegan formula.',
      '30ml frosted glass flacon with precision dropper.'
    ],
    fabricCare: ['Shake well before application. Apply with fingertips or blending brush.'],
    shippingInfo: ['Free shipping on beauty orders over $50.'],
    colors: [
      { name: '01 Alabaster', hex: '#F6EBE0' },
      { name: '02 Natural Beige', hex: '#E8D3BF' },
      { name: '03 Warm Almond', hex: '#D2B095' },
      { name: '04 Deep Honey', hex: '#9E7451' }
    ],
    sizes: ['30 ml / 1.0 fl. oz.'],
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'tailored-wide-leg-trouser',
    slug: 'tailored-wide-leg-trouser',
    name: 'Tailored Wide-Leg Trouser',
    brand: 'VELORA COLLECTION',
    price: 285,
    rating: 4.8,
    reviewsCount: 31,
    category: 'women',
    subcategory: 'Pants & Trousers',
    collection: 'Minimalist Essentials',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6-Fci2MNa5o8YfzrfkQQiYZb9ZJwVf4B-iH0oQAXMhPpBo5iJvKoBPI1Imxe4Tjwd6NRIyHYwQEEvRBU13B6rLpUHDXNAXEFRF2DfPEMrYFW8GLYuektZqZoBFRBUqQCTrzUhV9zlhxRch3TOwA9OzptaXkDO271ZEkFkNS1EVRxJBDVolGaOs4KEXWV7i56_Onjx4-g9J-qDPJFK32atELgNrI5bCxOZA4gqMyKH1eYLMJv1b9BUAw'
    ],
    description: 'Impeccably tailored pleated trousers crafted from fluid tropical wool. Designed with a high-rise waist, deep double front pleats, and an elegant floor-grazing wide leg.',
    details: [
      'High-rise waist with extended tab closure.',
      'Double front pleats for fluid movement.',
      'Side slant pockets and back welt pockets.'
    ],
    fabricCare: ['100% Virgin Wool. Dry clean only.'],
    shippingInfo: ['Complimentary standard shipping.'],
    colors: [
      { name: 'Sand Taupe', hex: '#D4C4AB' },
      { name: 'Charcoal Noir', hex: '#222222' },
      { name: 'Pure Ivory', hex: '#FAF8F5' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    completeTheLookIds: ['sofia-silk-blouse', 'classic-beige-pumps', 'structured-mini-tote-espresso']
  },
  {
    id: 'structured-mini-tote-espresso',
    slug: 'structured-mini-tote-espresso',
    name: 'Structured Mini Leather Tote',
    brand: 'VELORA ATELIER',
    price: 450,
    rating: 4.9,
    reviewsCount: 16,
    category: 'leather',
    subcategory: 'Handbags & Totes',
    collection: 'Italian Leather Series',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAbZTXNvyQ7xdoXSInV5ptsGT2eC9ZRQgXrn5x7ALGlJ6c7CBgdzkG6P38CKWOCgWySKpoZTQ96W99bdB_wA76R6-QNVS_R5f9CFRgFNU-8iPjgLl2vbCSjtWautPIciWCnMeGpkh4Nim52a0rarfLMmtRnBs_TX3l67ohSn5nSiJyvdFM5Wo_FQ56CpD1b8jI02fFN6RwIiAs0TTyGlHPD5QE0d5EVyto0cFzGFPrdZcPE3SietW4mzg'
    ],
    description: 'A structural top-handle companion in rich espresso brown. Crafted from vegetable-tanned Italian leather with hand-painted edges and understated gold closure.',
    details: [
      'Vegetable-tanned Tuscan leather.',
      'Gold clasp closure with subtle engraved logo.',
      'Includes removable leather crossbody strap.'
    ],
    fabricCare: ['Clean with a soft dry cloth. Keep away from direct water.'],
    shippingInfo: ['Free express shipping worldwide.'],
    colors: [
      { name: 'Espresso Brown', hex: '#3B291D' },
      { name: 'Cognac Tan', hex: '#8B5A2B' }
    ],
    sizes: ['One Size (24cm x 18cm x 9cm)'],
    inStock: true,
    completeTheLookIds: ['sofia-silk-blouse', 'tailored-wide-leg-trouser']
  },
  {
    id: 'aura-leather-sandal',
    slug: 'aura-leather-sandal',
    name: 'Aura Strappy Leather Sandal',
    brand: 'VELORA ATELIER',
    price: 220,
    rating: 4.7,
    reviewsCount: 22,
    category: 'shoes',
    subcategory: 'Sandals & Flats',
    collection: 'Summer Silk & Linen',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCKwb8b00vhq0TYxTGt_I0gThTnsgaFWPtPviQ6f8GmwaaDgPwLyuiNY77RjCRvnE0DFJ8MQjvbDa0YIUBVFShfzhIKzSMp0RJq9wuxjkneORHXtKpSIOTN1hnn328b6TKEbkAH5IOcA2VN2f1jlqO7Pb3PU0yYVy_J1EGk3onAcp381g7DCfq9T82N1a9zkjcHMi0evH-ehI9tGFCz2l2gYXeNkVrgiFVQu5UVtuU210VI445afpe-Mg'
    ],
    description: 'Delicate strappy flat sandals finished in soft metallic champagne gold. Perfect for sunlit strolls and Mediterranean evenings.',
    details: [
      '100% Metallic nappa leather straps.',
      'Cushioned leather footbed.',
      'Non-slip leather outsole.'
    ],
    fabricCare: ['Store in original cotton dust bags.'],
    shippingInfo: ['Free shipping.'],
    colors: [
      { name: 'Champagne Gold', hex: '#D8C697' },
      { name: 'Noir Leather', hex: '#1B1C1A' }
    ],
    sizes: ['36 EU', '37 EU', '38 EU', '39 EU', '40 EU', '41 EU'],
    inStock: true,
    completeTheLookIds: ['linen-midi-dress', 'lumina-pendant']
  },
  {
    id: 'lumina-pendant',
    slug: 'lumina-pendant',
    name: 'Lumina Organic Disc Pendant',
    brand: 'VELORA JEWELRY',
    price: 145,
    rating: 5.0,
    reviewsCount: 29,
    category: 'accessories',
    subcategory: 'Fine Jewelry',
    collection: 'Fine Jewelry & Accents',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDnzkxOAExUmk1AZZ9sZdjSmR823qS7NKnaamGt6QJ0auqvMQFX4cpGYF5zNZMgAevaVAoJjKzabGcsgI9wEBltHr8-B-0P7ZOWPtjF2oUmT-W1vaqFYiprm4yiF07g04D3IkPINGohTS4ZfoXsQLDn3ONk_vmKn4V_O0sMvSB7Sj-12osEAyeUk3eMwQv_mWZgwDo5U6-1FVvCYXSNdfvlb2uctbkL8Gz6hWktM0PAiQ7FzIr-b9bLRg'
    ],
    description: 'An organic, hand-hammered coin pendant in heavy 18k gold vermeil on solid sterling silver. Suspended from an adjustable cable chain with brilliant luster.',
    details: [
      '18k Gold Vermeil (3.5 microns thick over 925 Sterling Silver).',
      'Chain length adjustable from 16 to 18 inches.',
      'Hypoallergenic and nickel-free.'
    ],
    fabricCare: ['Gently wipe with included microfiber polishing cloth.'],
    shippingInfo: ['Delivered in velvet-lined jewelry gift box with certificate.'],
    colors: [
      { name: '18k Yellow Gold', hex: '#E5C158' },
      { name: 'Sterling Silver', hex: '#E0E0E0' }
    ],
    sizes: ['16"-18" Adjustable'],
    inStock: true,
    completeTheLookIds: ['sofia-silk-blouse', 'namola-maxima']
  },
  {
    id: 'cashmere-crewneck-sweater',
    slug: 'cashmere-crewneck-sweater',
    name: 'Mongolian Cashmere Crewneck',
    brand: 'VELORA COLLECTION',
    price: 340,
    rating: 4.9,
    reviewsCount: 44,
    category: 'knitwear',
    subcategory: 'Knitwear & Cashmere',
    collection: 'The Autumn Quiet Luxury Drop',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Featherlight warmth crafted from 100% Grade-A Mongolian cashmere fibers. Features refined ribbed trims and a relaxed, gently slouchy silhouette.',
    details: [
      '2-ply 100% Grade-A Mongolian Cashmere.',
      'Ribbed collar, cuffs, and hem.',
      'Pill-resistant natural fiber treatment.'
    ],
    fabricCare: ['Hand wash cold with cashmere shampoo or dry clean.'],
    shippingInfo: ['Complimentary cedar moth protection sachet included.'],
    colors: [
      { name: 'Cream Oatmeal', hex: '#EBE5D8' },
      { name: 'Charcoal Slate', hex: '#4B4D50' },
      { name: 'Midnight Navy', hex: '#1C2433' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isFeatured: true,
    completeTheLookIds: ['tailored-wide-leg-trouser', 'structured-noir-tote']
  },
  {
    id: 'leather-billfold-wallet',
    slug: 'leather-billfold-wallet',
    name: 'Artisan Calfskin Billfold Wallet',
    brand: 'VELORA ATELIER',
    price: 165,
    rating: 4.8,
    reviewsCount: 15,
    category: 'leather',
    subcategory: 'Leather Goods',
    collection: 'Italian Leather Series',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Ultra-slim leather wallet hand-stitched in Florence with 8 card slots, dual note dividers, and RFID protection.',
    details: [
      'Full grain vegetable-tanned Tuscan calfskin.',
      '8 precision card slots and 2 cash compartments.',
      'Debossed subtle Velora crest logo.'
    ],
    fabricCare: ['Condition with specialized leather balm once a year.'],
    shippingInfo: ['Signature presentation box.'],
    colors: [
      { name: 'Espresso Brown', hex: '#3E2A1D' },
      { name: 'Onyx Black', hex: '#141414' }
    ],
    sizes: ['One Size (11cm x 9cm)'],
    inStock: true,
    completeTheLookIds: ['charcoal-wool-blazer', 'hiptotamus-bespoke']
  },
  {
    id: 'silk-evening-jumpsuit',
    slug: 'silk-evening-jumpsuit',
    name: 'Silk Evening Tailored Jumpsuit',
    brand: 'VELORA ATELIER',
    price: 580,
    rating: 5.0,
    reviewsCount: 28,
    category: 'women',
    subcategory: 'Dresses & Jumpsuits',
    collection: 'Monochrome Noir',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBO0UnunVUsT_wtVi4EtqXZ5tJV6QAMQFBNehORdTQB5G4R7xRprlJ2Aou1qdvsbh1bLqyX6r6ElrDMueacD_Zqb0YIccyh2-o487DIx61YJGRdNKQy1yx770sgXsKeX6PsD_I76k3V-aDLxJTSmtOqpHwGpd1yFQwY0Ez7Osv1Q07PgBcGIEiQO8hFExgdRfAs5F6mgtjabeIZ26eJj1TJM8-288nOhMUQvL46RhPnDV0TIpCzs3QNeg'
    ],
    description: 'As featured in our editorial story. A flowing, sleeveless evening jumpsuit in heavy black silk crepe with sweeping side drapes and tailored bodice.',
    details: [
      '100% Pure Silk Crepe de Chine.',
      'Concealed back zip and interior corset structure.',
      'Floor-sweeping wide trousers with side pockets.'
    ],
    fabricCare: ['Specialist dry clean only.'],
    shippingInfo: ['Free courier express delivery with complimentary garment bag.'],
    colors: [
      { name: 'Midnight Noir', hex: '#111111' },
      { name: 'Emerald Velvet', hex: '#123524' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    isFeatured: true,
    completeTheLookIds: ['aura-leather-sandal', 'lumina-pendant', 'structured-mini-tote-espresso']
  }
];
