// From the softest dry tyre to the two wet-weather tyres.
// Grip and durability are illustrative 1-5 ratings (real tyres use C1-C5 compounds).
export const tyreCompounds = [
  {
    id: 'soft', letter: 'S', name: 'Soft', color: '#ff2d2d', type: 'dry',
    grip: 5, durability: 1,
    description: 'Fastest over one lap, but wears out quickly. Used for qualifying and short stints.',
  },
  {
    id: 'medium', letter: 'M', name: 'Medium', color: '#ffd60a', type: 'dry',
    grip: 4, durability: 3,
    description: 'The all-rounder. A good balance of speed and life, a common race starting tyre.',
  },
  {
    id: 'hard', letter: 'H', name: 'Hard', color: '#f2f2f5', type: 'dry',
    grip: 3, durability: 5,
    description: 'Slowest but longest lasting. Ideal for long stints and one-stop strategies.',
  },
  {
    id: 'intermediate', letter: 'I', name: 'Intermediate', color: '#30d158', type: 'wet',
    grip: 3, durability: 3,
    description: 'For damp or drying tracks. A light tread pattern that clears some water.',
  },
  {
    id: 'wet', letter: 'W', name: 'Full Wet', color: '#0a84ff', type: 'wet',
    grip: 2, durability: 4,
    description: 'For heavy rain. Deep grooves clear lots of water, but it is slow on a dry track.',
  },
];