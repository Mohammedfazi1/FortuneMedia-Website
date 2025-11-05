export interface Service {
  service: string;
  availability: 'available' | 'available_soon' | 'not_available';
  available_by: string;
}

export interface ServiceWithLocation extends Service {
  city: string;
  location: string;
  id: string;
}

export const servicesData: Record<string, Record<string, Service[]>> = {
  "Tiruppati": {
    "Renigunta Junction": [
      { "service": "AutoTap Advertisement", "availability": "available", "available_by": "now" },
      { "service": "Hoardings", "availability": "not_available", "available_by": "July" },
      { "service": "Bus Advertisement", "availability": "available_soon", "available_by": "30 days" }
    ],
    "Tirupati Main Road": [
      { "service": "Hoardings", "availability": "available", "available_by": "now" },
      { "service": "Gift Articles", "availability": "available_soon", "available_by": "30 days" }
    ],
    "Alipiri Road": [
      { "service": "Bus Advertisement", "availability": "not_available", "available_by": "August" },
      { "service": "AutoTap Advertisement", "availability": "available", "available_by": "now" }
    ],
    "Chandragiri": [
      { "service": "Hoardings", "availability": "available_soon", "available_by": "30 days" },
      { "service": "Gift Articles", "availability": "available", "available_by": "now" }
    ],
    "Srikalahasti": [
      { "service": "AutoTap Advertisement", "availability": "not_available", "available_by": "July" },
      { "service": "Bus Advertisement", "availability": "available", "available_by": "now" }
    ]
  },
  "Bangalore": {
    "MG Road": [
      { "service": "Hoardings", "availability": "available", "available_by": "now" },
      { "service": "AutoTap Advertisement", "availability": "available_soon", "available_by": "30 days" },
      { "service": "Bus Advertisement", "availability": "not_available", "available_by": "August" }
    ],
    "Brigade Road": [
      { "service": "Gift Articles", "availability": "available", "available_by": "now" },
      { "service": "Hoardings", "availability": "not_available", "available_by": "July" }
    ],
    "Electronic City": [
      { "service": "Bus Advertisement", "availability": "available_soon", "available_by": "30 days" },
      { "service": "AutoTap Advertisement", "availability": "available", "available_by": "now" }
    ],
    "Whitefield": [
      { "service": "Hoardings", "availability": "available", "available_by": "now" },
      { "service": "Gift Articles", "availability": "available_soon", "available_by": "30 days" }
    ],
    "Koramangala": [
      { "service": "AutoTap Advertisement", "availability": "not_available", "available_by": "August" },
      { "service": "Bus Advertisement", "availability": "available", "available_by": "now" }
    ]
  },
  "Chennai": {
    "T Nagar": [
      { "service": "Hoardings", "availability": "available", "available_by": "now" },
      { "service": "Gift Articles", "availability": "available_soon", "available_by": "30 days" },
      { "service": "AutoTap Advertisement", "availability": "not_available", "available_by": "July" }
    ],
    "Anna Nagar": [
      { "service": "Bus Advertisement", "availability": "available", "available_by": "now" },
      { "service": "Hoardings", "availability": "not_available", "available_by": "August" }
    ],
    "Velachery": [
      { "service": "AutoTap Advertisement", "availability": "available_soon", "available_by": "30 days" },
      { "service": "Gift Articles", "availability": "available", "available_by": "now" }
    ],
    "Adyar": [
      { "service": "Hoardings", "availability": "available", "available_by": "now" },
      { "service": "Bus Advertisement", "availability": "available_soon", "available_by": "30 days" }
    ],
    "Porur": [
      { "service": "Gift Articles", "availability": "not_available", "available_by": "July" },
      { "service": "AutoTap Advertisement", "availability": "available", "available_by": "now" }
    ]
  }
};