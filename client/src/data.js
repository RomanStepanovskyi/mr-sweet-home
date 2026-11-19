export const SERVICES = [
  {
    id: 'bathroom-remodel',
    title: 'Bathroom Remodel',
    text: 'Full gut-and-rebuild or a focused refresh: showers, tubs, vanities, waterproofing and tile — handled start to finish.',
    points: ['Walk-in showers', 'Vanities & fixtures', 'Waterproofing'],
  },
  {
    id: 'kitchen-remodel',
    title: 'Kitchen Remodel',
    text: 'Layouts that work for how you cook. Cabinets, countertops, backsplash, lighting and finishes coordinated as one project.',
    points: ['Cabinets & counters', 'Backsplash', 'Lighting'],
  },
  {
    id: 'tile-painting',
    title: 'Tile & Painting',
    text: 'Precise tile layout and clean interior paint lines. The details that make a room feel finished.',
    points: ['Floor & wall tile', 'Interior painting', 'Trim & touch-ups'],
  },
  {
    id: 'venetian-plaster',
    title: 'Venetian Plaster',
    text: 'Hand-troweled decorative plaster with depth and movement — an accent wall or a whole room with a timeless, polished finish.',
    points: ['Accent walls', 'Polished finishes', 'Custom tones'],
  },
];

export const STEPS = [
  { title: 'Consultation', text: 'We visit, listen and measure. You tell us how you want the space to work.' },
  { title: 'Estimate', text: 'A clear written scope and price, so you know exactly what is included.' },
  { title: 'Build', text: 'Our crew does the work on a set schedule and keeps you updated along the way.' },
  { title: 'Walkthrough', text: 'We review every detail together before we call the job done.' },
];

// Project photos live in client/public/work/ (resized, metadata stripped).
export const WORK = [
  { id: 1, service: 'bathroom-remodel', title: 'Marble checkerboard primary bath', src: '/work/bath-checkerboard.jpg' },
  { id: 2, service: 'venetian-plaster', title: 'Green Venetian plaster wall', src: '/work/plaster-green-wall.jpg' },
  { id: 3, service: 'venetian-plaster', title: 'Plaster bath with arched mirror', src: '/work/plaster-arched-mirror.jpg' },
  { id: 4, service: 'bathroom-remodel', title: 'Glass walk-in shower', src: '/work/bath-glass-shower.jpg' },
  { id: 5, service: 'tile-painting', title: 'Subway tile shower with niches', src: '/work/tile-shower-niches.jpg' },
  { id: 7, service: 'bathroom-remodel', title: 'Double vanity & soaking tub', src: '/work/bath-double-vanity.jpg' },
  { id: 8, service: 'tile-painting', title: 'Lit niche & stone-look tile', src: '/work/tile-plaster-niche.jpg' },
  { id: 10, service: 'tile-painting', title: 'Brass valves on beveled tile', src: '/work/tile-brass-detail.jpg' },
];
