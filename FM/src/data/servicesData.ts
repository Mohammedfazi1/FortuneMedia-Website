export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  regions: string[];
  locations: string[];
  subLocations: string[];
  available: boolean;
  pricing: string;
}

export interface FilterData {
  services: string[];
  regions: string[];
  locations: string[];
  subLocations: string[];
}

export const servicesData: Service[] = [
  {
    id: 'auto-rickshaw',
    name: 'Auto Rickshaw',
    description: 'Mobile advertising solutions that move with your audience through city streets.',
    image: '/assets/Auto_Rickshaw.jpeg',
    regions: ['Madurai', 'Chennai', 'Tiruppati'],
    locations: ['Periyar', 'Anna Nagar', 'Arapalayam', 'Mount Road', 'Highways Road'],
    subLocations: [],
    available: true,
    pricing: 'Starting from ₹5,000/month'
  },
  {
    id: 'billboard-hoardings',
    name: 'Billboard / Hoardings',
    description: 'Traditional large-format outdoor advertising billboards for maximum brand visibility.',
    image: '/assets/Hero-Section.png',
    regions: ['Madurai', 'Chennai', 'Bangalore', 'Tiruppati'],
    locations: ['Periyar', 'Anna Nagar', 'Mount Road', 'HAL', 'Indira Nagar', 'Highways Road'],
    subLocations: ['Museum', 'ITPL Road'],
    available: true,
    pricing: 'Starting from ₹30,000/month'
  },
  {
    id: 'pole-kiosk',
    name: 'Pole Kiosk',
    description: 'Vertical advertising displays on street poles and kiosks for pedestrian visibility.',
    image: '/assets/Pole_Kiosk.png',
    regions: ['Bangalore', 'Chennai'],
    locations: ['HAL', 'Marathahalli Central Mall', 'Mount Road'],
    subLocations: ['Museum', 'Shivaji Nagar'],
    available: true,
    pricing: 'Starting from ₹12,000/month'
  },
  {
    id: 'bus-shelter',
    name: 'Bus Shelter',
    description: 'Strategic advertising at bus stops and transit shelters for commuter reach.',
    image: '/assets/Bus_Shelter.png',
    regions: ['Bangalore', 'Madurai'],
    locations: ['SkillBoard Circle', 'Halasuru', 'Goripalayam', 'Mattuthavani'],
    subLocations: ['Pattandur Agrahara'],
    available: false,
    pricing: 'Starting from ₹20,000/month'
  },
  {
    id: 'unipole-cantilever',
    name: 'UniPole & Cantilever',
    description: 'High-impact vertical advertising structures for maximum highway visibility.',
    image: '/assets/UniPole.png',
    regions: ['Bangalore', 'Tiruppati'],
    locations: ['WhiteField', 'Tirumala Arch'],
    subLocations: ['Nexus Shantiniketan'],
    available: true,
    pricing: 'Starting from ₹80,000/month'
  },
  {
    id: 'gantry-arch',
    name: 'Gantry Arch',
    description: 'Prominent overhead advertising structures on highways and major roads.',
    image: '/assets/Gantry_Arch.png',
    regions: ['Chennai', 'Tiruppati'],
    locations: ['Mount Road', 'Bus Stand'],
    subLocations: [],
    available: false,
    pricing: 'Starting from ₹1,00,000/month'
  },
  {
    id: 'bus-branding',
    name: 'Bus Branding',
    description: 'Mobile advertising on public and private buses for wide audience reach.',
    image: '/assets/Bus_Shelter.png',
    regions: ['Madurai', 'Chennai'],
    locations: ['Anna Nagar', 'Arapalayam', 'Mount Road'],
    subLocations: [],
    available: true,
    pricing: 'Starting from ₹25,000/month'
  },
  {
    id: 'traffic-police-booth',
    name: 'Traffic Police Booth',
    description: 'Strategic advertising on traffic police booths at key intersections.',
    image: '/assets/Traffic_PoliceBooth.png',
    regions: ['Bangalore', 'Madurai'],
    locations: ['HAL', 'Indira Nagar', 'Periyar'],
    subLocations: ['Museum', 'ITPL Road'],
    available: false,
    pricing: 'Starting from ₹15,000/month'
  },
  {
    id: 'traffic-sunshade-barricade',
    name: 'Traffic Sunshade Barricade',
    description: 'Strategic advertising on traffic sunshade barricades for maximum visibility.',
    image: '/assets/Traffic_SunshadeBarricade.png',
    regions: ['Bangalore', 'Tiruppati', 'Madurai'],
    locations: ['Marathahalli Central Mall', 'Highways Road', 'Goripalayam'],
    subLocations: ['Shivaji Nagar'],
    available: true,
    pricing: 'Starting from ₹8,000/month'
  },
  {
    id: 'center-median-barricade',
    name: 'Center Median Barricade',
    description: 'Strategic roadside advertising on traffic median barricades.',
    image: '/assets/Center_MedianBarricade.png',
    regions: ['Bangalore'],
    locations: ['SkillBoard Circle', 'Halasuru', 'WhiteField'],
    subLocations: ['Pattandur Agrahara', 'Nexus Shantiniketan'],
    available: true,
    pricing: 'Starting from ₹25,000/month'
  },
  {
    id: 'led-display',
    name: 'LED Display',
    description: 'Dynamic digital displays for maximum visual impact and real-time content.',
    image: '/assets/LED_Display.png',
    regions: ['Chennai', 'Bangalore'],
    locations: ['Mount Road', 'HAL', 'Indira Nagar'],
    subLocations: ['Museum'],
    available: false,
    pricing: 'Starting from ₹50,000/month'
  },
  {
    id: 'foot-over-bridge',
    name: 'Foot Over Bridge',
    description: 'Strategic advertising on foot over bridges for pedestrian visibility.',
    image: '/assets/FOB.png',
    regions: ['Madurai', 'Bangalore'],
    locations: ['Mattuthavani', 'WhiteField'],
    subLocations: ['Nexus Shantiniketan'],
    available: true,
    pricing: 'Starting from ₹35,000/month'
  }
];

export const filterData: FilterData = {
  services: [
    'Auto Rickshaw',
    'Billboard / Hoardings',
    'Pole Kiosk',
    'Bus Shelter',
    'UniPole & Cantilever',
    'Gantry Arch',
    'Bus Branding',
    'Traffic Police Booth',
    'Traffic Sunshade Barricade',
    'Center Median Barricade',
    'LED Display',
    'Foot Over Bridge'
  ],
  regions: ['Bangalore', 'Chennai', 'Madurai', 'Tiruppati'],
  locations: [
    'HAL',
    'Indira Nagar',
    'Marathahalli Central Mall',
    'SkillBoard Circle',
    'Halasuru',
    'WhiteField',
    'Mount Road',
    'Periyar',
    'Anna Nagar',
    'Arapalayam',
    'Goripalayam',
    'Mattuthavani',
    'Highways Road',
    'Tirumala Arch',
    'Bus Stand'
  ],
  subLocations: [
    'Museum',
    'ITPL Road',
    'Shivaji Nagar',
    'Pattandur Agrahara',
    'Nexus Shantiniketan'
  ]
};