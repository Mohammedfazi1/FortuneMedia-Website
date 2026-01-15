export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  serviceType: string;
  city: string;
}

export const serviceTypes = [
  'All',
  'Auto Rickshaw',
  'Billboard',
  'Bus Shelter',
  'LED Display',
  'Metro Branding',
  'Bus Branding',
];

export const cities = ['All', 'Bangalore', 'Chennai', 'Madurai', 'Tiruppati'];

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/assets/Auto_Rickshaw.jpeg',
    alt: 'Auto Rickshaw Advertising in Bangalore',
    serviceType: 'Auto Rickshaw',
    city: 'Bangalore',
  },
  {
    id: 2,
    src: '/assets/UniPole.png',
    alt: 'Billboard Advertising in Chennai',
    serviceType: 'Billboard',
    city: 'Chennai',
  },
  {
    id: 3,
    src: '/assets/Bus_Shelter.png',
    alt: 'Bus Shelter Advertising in Madurai',
    serviceType: 'Bus Shelter',
    city: 'Madurai',
  },
  {
    id: 4,
    src: '/assets/LED_Display.png',
    alt: 'LED Display Advertising in Bangalore',
    serviceType: 'LED Display',
    city: 'Bangalore',
  },
  {
    id: 5,
    src: '/assets/FOB.png',
    alt: 'Metro Branding in Chennai',
    serviceType: 'Metro Branding',
    city: 'Chennai',
  },
  {
    id: 6,
    src: '/assets/Bus_Branding.png',
    alt: 'Bus Branding in Tiruppati',
    serviceType: 'Bus Branding',
    city: 'Tiruppati',
  },
  {
    id: 7,
    src: '/assets/Gantry_Arch.png',
    alt: 'Gantry Arch Advertising in Chennai',
    serviceType: 'Billboard',
    city: 'Chennai',
  },
  {
    id: 8,
    src: '/assets/Pole_Kiosk.png',
    alt: 'Pole Kiosk Advertising in Bangalore',
    serviceType: 'Bus Shelter',
    city: 'Bangalore',
  },
  {
    id: 9,
    src: '/assets/Center_MedianBarricade.png',
    alt: 'Center Median Barricade in Tiruppati',
    serviceType: 'Billboard',
    city: 'Tiruppati',
  },
  {
    id: 10,
    src: '/assets/Traffic_PoliceBooth.png',
    alt: 'Traffic Police Booth Advertising in Madurai',
    serviceType: 'Bus Shelter',
    city: 'Madurai',
  },
  {
    id: 11,
    src: '/assets/Traffic_SunshadeBarricade.png',
    alt: 'Traffic Sunshade Barricade in Bangalore',
    serviceType: 'Bus Shelter',
    city: 'Bangalore',
  },
  {
    id: 12,
    src: '/assets/apollo-hospital.jpeg',
    alt: 'Apollo Hospital Campaign in Chennai',
    serviceType: 'Billboard',
    city: 'Chennai',
  },
  {
    id: 13,
    src: '/assets/asian-paints.png',
    alt: 'Asian Paints Campaign',
    serviceType: 'Billboard',
    city: 'Bangalore',
  },
  {
    id: 14,
    src: '/assets/bhima-jewellery.png',
    alt: 'Bhima Jewellery Campaign',
    serviceType: 'Billboard',
    city: 'Chennai',
  },
  {
    id: 15,
    src: '/assets/chennai-mobile.jpeg',
    alt: 'Chennai Mobile Campaign',
    serviceType: 'Billboard',
    city: 'Chennai',
  },
  {
    id: 16,
    src: '/assets/fortune-oils.png',
    alt: 'Fortune Oils Campaign',
    serviceType: 'Billboard',
    city: 'Madurai',
  },
  {
    id: 17,
    src: '/assets/hero motorcycles.png',
    alt: 'Hero Motorcycles Campaign',
    serviceType: 'Billboard',
    city: 'Bangalore',
  },
  {
    id: 18,
    src: '/assets/joyalukkas-jewellery.png',
    alt: 'Joyalukkas Jewellery Campaign',
    serviceType: 'Billboard',
    city: 'Chennai',
  },
];
