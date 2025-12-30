import { memo, useCallback, useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Phone, Mail, MapPin, Clock, Star, Users, TrendingUp, ChevronDown, ArrowUp, ExternalLink, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ServiceData {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
  pricing: string;
  overview: string;
  process: string[];
  specifications: { label: string; value: string }[];
  caseStudies: { title: string; result: string }[];
  faq: { question: string; answer: string }[];
}

const serviceData: Record<string, ServiceData> = {
  'traffic-sunshade-barricade': {
    id: 'traffic-sunshade-barricade',
    title: 'Traffic Sunshade Barricade Advertisement',
    description: 'Strategic advertising on traffic sunshade barricades for maximum visibility',
    image: '/assets/Traffic_SunshadeBarricade.png',
    features: ['High visibility at traffic points', 'Weather-resistant materials', 'Strategic placement locations', 'Cost-effective advertising'],
    benefits: ['Maximum exposure during traffic stops', 'Reaches commuters daily', 'Long viewing duration', 'Urban market penetration'],
    pricing: 'Starting from ₹8,000/month',
    overview: 'Traffic sunshade barricade advertising offers unparalleled visibility at key traffic intersections. These strategically placed advertisements capture the attention of thousands of commuters daily, providing maximum brand exposure during peak traffic hours.',
    process: ['Site survey and location analysis', 'Design and content creation', 'Material preparation and printing', 'Installation and setup', 'Monitoring and maintenance'],
    specifications: [
      { label: 'Size Options', value: '4x6 ft, 6x8 ft, 8x10 ft' },
      { label: 'Material', value: 'Weather-resistant vinyl' },
      { label: 'Visibility', value: '500m+ distance' },
      { label: 'Duration', value: 'Minimum 1 month' }
    ],
    caseStudies: [
      { title: 'Local Restaurant Chain', result: '40% increase in foot traffic' },
      { title: 'Electronics Store', result: '25% boost in sales during campaign' }
    ],
    faq: [
      { question: 'How long does installation take?', answer: 'Installation typically takes 2-4 hours per location.' },
      { question: 'What are the size options?', answer: 'We offer multiple sizes from 4x6 ft to 8x10 ft based on location requirements.' }
    ]
  },
  'billboard-hoardings': {
    id: 'billboard-hoardings',
    title: 'Billboard / Hoardings Advertisement',
    description: 'Traditional large-format outdoor advertising billboards',
    image: '/assets/Hero-Section.png',
    features: ['Large format displays', 'Strategic location placement', 'High-quality printing', 'Illumination options'],
    benefits: ['Maximum brand visibility', 'Long-term brand exposure', 'Wide audience reach', 'Established advertising medium'],
    pricing: 'Starting from ₹30,000/month',
    overview: 'Billboard advertising remains one of the most effective outdoor advertising mediums. Our premium billboard locations ensure maximum visibility and brand impact across high-traffic areas.',
    process: ['Location selection and booking', 'Creative design development', 'High-quality printing and production', 'Professional installation', 'Campaign monitoring'],
    specifications: [
      { label: 'Standard Size', value: '20x10 ft, 40x20 ft' },
      { label: 'Material', value: 'Flex vinyl with UV protection' },
      { label: 'Illumination', value: 'LED backlighting available' },
      { label: 'Visibility', value: '1km+ distance' }
    ],
    caseStudies: [
      { title: 'Fashion Brand', result: '60% increase in brand awareness' },
      { title: 'Real Estate Project', result: '35% boost in inquiries' }
    ],
    faq: [
      { question: 'What locations are available?', answer: 'We have premium locations across major highways, commercial areas, and high-traffic intersections.' },
      { question: 'Can I change the creative during the campaign?', answer: 'Yes, creative changes are possible with 7 days notice and additional production costs.' }
    ]
  },
  'auto-rickshaw': {
    id: 'auto-rickshaw',
    title: 'Auto Rickshaw Advertisement',
    description: 'Mobile advertising solutions that move with your audience',
    image: '/assets/Auto_Rickshaw.jpeg',
    features: ['High visibility in urban areas', 'Mobile advertising reach', 'Cost-effective solution', 'Targeted route planning'],
    benefits: ['Maximum exposure during peak hours', 'Reaches diverse demographics', 'Flexible campaign duration', 'Real-time location tracking'],
    pricing: 'Starting from ₹5,000/month',
    overview: 'Auto rickshaw advertising provides dynamic mobile visibility across urban areas. Your brand travels through busy streets, markets, and residential areas, ensuring maximum exposure to diverse audiences.',
    process: ['Route planning and vehicle selection', 'Creative design and approval', 'Vehicle branding installation', 'Campaign launch and tracking', 'Performance monitoring'],
    specifications: [
      { label: 'Coverage Area', value: 'City-wide routes' },
      { label: 'Material', value: 'Vinyl wrap with lamination' },
      { label: 'Duration', value: 'Minimum 15 days' },
      { label: 'Vehicles', value: '10-100+ rickshaws' }
    ],
    caseStudies: [
      { title: 'Food Delivery App', result: '45% increase in app downloads' },
      { title: 'Local Bank', result: '30% boost in branch visits' }
    ],
    faq: [
      { question: 'How many rickshaws can I book?', answer: 'We offer flexible packages from 10 to 100+ rickshaws based on your budget and coverage needs.' },
      { question: 'Can I track the rickshaws?', answer: 'Yes, we provide GPS tracking and daily route reports for campaign transparency.' }
    ]
  },
  'traffic-police-booth': {
    id: 'traffic-police-booth',
    title: 'Traffic Police Booth Advertisement',
    description: 'Strategic advertising on traffic police booths at key intersections',
    image: '/assets/Traffic_PoliceBooth.png',
    features: ['Prime intersection locations', 'High traffic visibility', 'Authority association', 'Professional appearance'],
    benefits: ['Captive audience attention', 'Trust and credibility boost', 'Extended viewing time', 'Strategic urban placement'],
    pricing: 'Starting from ₹15,000/month',
    overview: 'Traffic police booth advertising leverages high-authority locations at major intersections. These strategic placements ensure your brand gains credibility while reaching thousands of commuters daily.',
    process: ['Location approval and permits', 'Design compliance check', 'Professional installation', 'Regular maintenance', 'Performance tracking'],
    specifications: [
      { label: 'Size Options', value: '3x4 ft, 4x6 ft' },
      { label: 'Material', value: 'ACP board with digital print' },
      { label: 'Locations', value: 'Major traffic intersections' },
      { label: 'Visibility', value: '360-degree exposure' }
    ],
    caseStudies: [
      { title: 'Insurance Company', result: '50% increase in policy inquiries' },
      { title: 'Educational Institute', result: '40% boost in admissions' }
    ],
    faq: [
      { question: 'Do you handle permits?', answer: 'Yes, we manage all necessary permits and approvals for traffic police booth advertising.' },
      { question: 'What are the design guidelines?', answer: 'Designs must comply with traffic authority guidelines - we assist with compliant creative development.' }
    ]
  },
  'pole-kiosk': {
    id: 'pole-kiosk',
    title: 'Pole Kiosk Advertisement',
    description: 'Vertical advertising displays on street poles and kiosks',
    image: '/assets/Pole_Kiosk.png',
    features: ['Vertical display format', 'Street-level visibility', 'Multiple location options', 'Weather-resistant design'],
    benefits: ['Pedestrian-focused advertising', 'Cost-effective placement', 'High frequency exposure', 'Urban landscape integration'],
    pricing: 'Starting from ₹12,000/month',
    overview: 'Pole kiosk advertising provides street-level brand visibility in high-footfall areas. These vertical displays integrate seamlessly into urban landscapes while delivering consistent brand exposure.',
    process: ['Site survey and selection', 'Design and fabrication', 'Installation and setup', 'Regular maintenance', 'Campaign monitoring'],
    specifications: [
      { label: 'Standard Size', value: '2x6 ft, 3x8 ft' },
      { label: 'Material', value: 'Aluminum composite panel' },
      { label: 'Mounting', value: 'Street pole installation' },
      { label: 'Durability', value: '5+ years lifespan' }
    ],
    caseStudies: [
      { title: 'Retail Chain', result: '35% increase in store visits' },
      { title: 'Healthcare Clinic', result: '25% boost in appointments' }
    ],
    faq: [
      { question: 'How many locations can I book?', answer: 'We offer packages from single locations to city-wide networks of 50+ pole kiosks.' },
      { question: 'What maintenance is included?', answer: 'Regular cleaning, damage repair, and content updates are included in our service packages.' }
    ]
  },
  'center-median-barricade': {
    id: 'center-median-barricade',
    title: 'Center Median Barricade Advertisement',
    description: 'Strategic roadside advertising on traffic median barricades',
    image: '/assets/Center_MedianBarricade.png',
    features: ['Prime location positioning', 'Dual-side visibility', 'Traffic light advantage', 'Illuminated options available'],
    benefits: ['Captive audience attention', 'High dwell time exposure', 'Cost-effective placement', 'Urban market penetration'],
    pricing: 'Starting from ₹25,000/month',
    overview: 'Center median barricade advertising captures attention during traffic stops and slow-moving conditions. These strategic placements ensure maximum visibility from both directions of traffic.',
    process: ['Location assessment', 'Permit acquisition', 'Creative production', 'Installation and setup', 'Ongoing maintenance'],
    specifications: [
      { label: 'Size Range', value: '4x8 ft to 6x12 ft' },
      { label: 'Material', value: 'Weather-resistant flex' },
      { label: 'Visibility', value: 'Dual-directional' },
      { label: 'Lighting', value: 'LED illumination optional' }
    ],
    caseStudies: [
      { title: 'Automobile Brand', result: '55% increase in showroom visits' },
      { title: 'Real Estate', result: '42% boost in site visits' }
    ],
    faq: [
      { question: 'Are illuminated options available?', answer: 'Yes, we offer LED backlighting for enhanced visibility during evening hours.' },
      { question: 'How long does installation take?', answer: 'Installation typically takes 4-6 hours per location including setup and testing.' }
    ]
  },
  'led-display': {
    id: 'led-display',
    title: 'LED Display Advertisement',
    description: 'Dynamic digital displays for maximum visual impact',
    image: '/assets/LED_Display.png',
    features: ['High-resolution displays', 'Dynamic content capability', 'Weather-resistant design', 'Remote content management'],
    benefits: ['Eye-catching visual appeal', 'Real-time content updates', 'Multiple campaign flexibility', '24/7 advertising presence'],
    pricing: 'Starting from ₹50,000/month',
    overview: 'LED display advertising delivers dynamic, high-impact visual experiences. These digital screens allow real-time content updates, multiple advertiser rotations, and engaging multimedia presentations.',
    process: ['Location setup and testing', 'Content creation and approval', 'Scheduling and programming', 'Remote monitoring', 'Performance analytics'],
    specifications: [
      { label: 'Resolution', value: 'Full HD to 4K options' },
      { label: 'Size Options', value: '6x4 ft to 20x12 ft' },
      { label: 'Brightness', value: '5000+ nits outdoor rated' },
      { label: 'Control', value: 'Remote content management' }
    ],
    caseStudies: [
      { title: 'Entertainment Brand', result: '70% increase in event attendance' },
      { title: 'E-commerce Platform', result: '48% boost in app downloads' }
    ],
    faq: [
      { question: 'Can I update content remotely?', answer: 'Yes, our cloud-based system allows real-time content updates from anywhere.' },
      { question: 'What content formats are supported?', answer: 'We support images, videos, animations, and live feeds in various formats.' }
    ]
  },
  'bus-shelter': {
    id: 'bus-shelter',
    title: 'Bus Shelter Advertisement',
    description: 'Strategic advertising at bus stops and transit shelters',
    image: '/assets/Bus_Shelter.png',
    features: ['High-traffic transit locations', 'Extended viewing time', 'Weather protection', 'Illuminated display options'],
    benefits: ['Captive commuter audience', 'Daily repeat exposure', 'Demographic targeting', 'Cost-effective reach'],
    pricing: 'Starting from ₹20,000/month',
    overview: 'Bus shelter advertising targets commuters during their daily routines. These locations provide extended viewing time as people wait for transportation, ensuring high message retention.',
    process: ['Route analysis and selection', 'Creative design development', 'Production and installation', 'Maintenance and monitoring', 'Performance reporting'],
    specifications: [
      { label: 'Standard Size', value: '6x4 ft backlit panels' },
      { label: 'Material', value: 'Translucent vinyl for backlighting' },
      { label: 'Illumination', value: 'LED backlighting standard' },
      { label: 'Locations', value: 'High-frequency bus routes' }
    ],
    caseStudies: [
      { title: 'Telecom Provider', result: '38% increase in plan subscriptions' },
      { title: 'Fashion Retailer', result: '45% boost in store footfall' }
    ],
    faq: [
      { question: 'Which bus routes are available?', answer: 'We cover major bus routes across the city with high passenger frequency and diverse demographics.' },
      { question: 'Is backlighting included?', answer: 'Yes, LED backlighting is standard for enhanced visibility during all hours.' }
    ]
  },
  'unipole-cantilever': {
    id: 'unipole-cantilever',
    title: 'UniPole & Cantilever Advertisement',
    description: 'High-impact vertical advertising structures for maximum visibility',
    image: '/assets/UniPole.png',
    features: ['Towering height advantage', 'Long-distance visibility', 'Premium positioning', 'Landmark status potential'],
    benefits: ['Massive audience reach', 'Brand dominance display', 'Highway and city visibility', 'Premium brand association'],
    pricing: 'Starting from ₹80,000/month',
    overview: 'UniPole and Cantilever advertising provides commanding presence with towering height and premium positioning. These structures become landmarks while delivering maximum brand visibility across vast areas.',
    process: ['Site engineering and approval', 'Structural design and fabrication', 'Foundation and installation', 'Creative mounting and setup', 'Regular structural maintenance'],
    specifications: [
      { label: 'Height Range', value: '40-80 feet elevation' },
      { label: 'Display Size', value: '20x10 ft to 40x20 ft' },
      { label: 'Structure', value: 'Steel fabricated poles' },
      { label: 'Visibility', value: '2km+ distance' }
    ],
    caseStudies: [
      { title: 'Luxury Car Brand', result: '65% increase in test drives' },
      { title: 'Premium Housing', result: '52% boost in site visits' }
    ],
    faq: [
      { question: 'What approvals are required?', answer: 'We handle all municipal approvals, structural certifications, and safety compliance requirements.' },
      { question: 'How long does installation take?', answer: 'Complete installation including foundation work takes 15-20 days depending on location.' }
    ]
  },
  'gantry-arch': {
    id: 'gantry-arch',
    title: 'Gantry Arch Advertisement',
    description: 'Prominent overhead advertising structures on highways',
    image: '/assets/Gantry_Arch.png',
    features: ['Strategic highway placement', 'Large format visibility', 'High-traffic exposure', 'Professional installation'],
    benefits: ['Massive audience reach', 'Premium brand positioning', 'Long-distance visibility', 'Memorable brand presence'],
    pricing: 'Starting from ₹1,00,000/month',
    overview: 'Gantry arch advertising dominates highway landscapes with massive overhead displays. These premium structures ensure your brand is seen by thousands of highway travelers daily.',
    process: ['Highway authority approvals', 'Structural engineering design', 'Foundation and arch construction', 'Display installation and testing', 'Ongoing structural monitoring'],
    specifications: [
      { label: 'Span Width', value: '40-60 feet across highway' },
      { label: 'Display Size', value: '40x20 ft to 60x30 ft' },
      { label: 'Height Clearance', value: '18+ feet vehicle clearance' },
      { label: 'Visibility', value: '3km+ approach distance' }
    ],
    caseStudies: [
      { title: 'National Brand', result: '80% increase in brand recall' },
      { title: 'Tourism Board', result: '60% boost in destination visits' }
    ],
    faq: [
      { question: 'Which highways are available?', answer: 'We have premium locations on major national and state highways with high traffic density.' },
      { question: 'What safety measures are included?', answer: 'All installations meet highway safety standards with proper clearances and structural certifications.' }
    ]
  },
  'fob-advertisement': {
    id: 'fob-advertisement',
    title: 'FOB (Foot Over Bridge) Advertisement',
    description: 'Strategic advertising on foot over bridges for pedestrian visibility',
    image: '/assets/FOB.png',
    features: ['Elevated positioning', 'Pedestrian-focused visibility', 'High-traffic crossing points', 'Multiple viewing angles'],
    benefits: ['Captive pedestrian audience', 'Extended viewing duration', 'Strategic urban placement', 'Cost-effective pedestrian reach'],
    pricing: 'Starting from ₹35,000/month',
    overview: 'FOB advertising targets pedestrians at elevated crossing points with extended viewing time. These strategic locations ensure your message reaches foot traffic in busy urban areas.',
    process: ['Bridge authority permissions', 'Safety compliance check', 'Creative design and production', 'Secure installation', 'Regular safety inspections'],
    specifications: [
      { label: 'Location Types', value: 'Railway and road FOBs' },
      { label: 'Display Options', value: 'Side panels and overhead' },
      { label: 'Size Range', value: '8x4 ft to 12x6 ft' },
      { label: 'Material', value: 'Wind-resistant flex vinyl' }
    ],
    caseStudies: [
      { title: 'Educational Services', result: '43% increase in course enrollments' },
      { title: 'Healthcare Chain', result: '37% boost in clinic visits' }
    ],
    faq: [
      { question: 'Are railway FOBs available?', answer: 'Yes, we have permissions for advertising on both railway and road foot over bridges.' },
      { question: 'What safety standards apply?', answer: 'All installations comply with railway and municipal safety guidelines with regular inspections.' }
    ]
  }
};

const TableOfContents = memo(({ activeSection, onSectionClick }: { 
  activeSection: string; 
  onSectionClick: (section: string) => void;
}) => {
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features & Benefits' },
    { id: 'process', label: 'Process' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Get Quote' }
  ];

  return (
    <nav className="fixed top-24 space-y-1 w-48">
      <h3 className="font-semibold text-sm text-gray-900 mb-3">Contents</h3>
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className={`block w-full text-left text-sm py-1 px-2 rounded transition-colors ${
            activeSection === section.id 
              ? 'text-primary bg-primary/10 font-medium' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
});

const ServiceDetail = memo(() => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('General');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [serviceId]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const service = useMemo(() => {
    if (!serviceId || !serviceData[serviceId]) {
      return null;
    }
    return serviceData[serviceId];
  }, [serviceId]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSectionClick = useCallback((section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const toggleFAQ = useCallback((index: number) => {
    setExpandedFAQ(prev => prev === index ? null : index);
  }, []);

  const categories = ['General', 'Pricing', 'Process', 'Support'];

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGetQuote = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleCall = useCallback(() => {
    window.open('tel:+919876543210', '_self');
  }, []);

  const handleEmail = useCallback(() => {
    window.open('mailto:info@fortunemedia.com?subject=Service Inquiry - ' + service?.title, '_self');
  }, [service?.title]);

  const handleLocation = useCallback(() => {
    window.open('https://maps.google.com/?q=Mumbai,India', '_blank');
  }, []);

  const serviceImages = useMemo(() => [service?.image].filter(Boolean), [service?.image]);

  const openImageModal = useCallback((image: string) => {
    setSelectedImage(image);
  }, []);

  const closeImageModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Button onClick={handleBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Fixed Back Button */}
      <button
        onClick={handleBack}
        className="fixed bottom-8 left-8 z-50 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center space-x-2"
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="hidden md:inline">Back to Services</span>
        <span className="md:hidden">Back</span>
      </button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <TableOfContents 
              activeSection={activeSection} 
              onSectionClick={handleSectionClick} 
            />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-8">
            <div className="space-y-8 md:space-y-12">
              {/* Hero Section */}
              <section id="overview" className="space-y-6">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h1>
                  <div className="aspect-video md:aspect-[16/9] lg:aspect-[2/1] rounded-lg overflow-hidden mb-6">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-lg md:text-xl text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {service.overview}
                  </p>
                </div>
              </section>

              {/* Features & Benefits */}
              <section id="features" className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Features & Benefits</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
                      <ul className="space-y-3">
                        {service.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Process */}
              <section id="process" className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Our Process</h2>
                <div className="space-y-4">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Specifications */}
              <section id="specifications" className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Specifications</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="font-medium text-gray-900">{spec.label}</span>
                          <span className="text-gray-600">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Gallery */}
              <section id="gallery" className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
                <div className="overflow-x-auto">
                  <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                    {serviceImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => image && openImageModal(image)}
                        className="flex-shrink-0 w-80 h-60 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer group"
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`${service.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Pricing */}
              <section id="pricing" className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Pricing</h2>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{service.pricing}</div>
                    <p className="text-gray-600 mb-6">Flexible packages available based on duration and locations</p>
                    <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={handleGetQuote}>
                      Get Custom Quote
                    </Button>
                  </CardContent>
                </Card>
              </section>

              {/* FAQ */}
              <section id="faq" className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      Frequently asked questions
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                      Can't find the answer you're looking for? Chat with our support team for personalized assistance.
                    </p>
                  </div>

                  {/* Category Tabs */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                          activeCategory === category
                            ? 'bg-gray-900 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* FAQ List */}
                  <div className="space-y-4 max-w-3xl mx-auto">
                    {service.faq.map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            </div>
                            <h3 className="font-semibold text-gray-900 text-lg">{item.question}</h3>
                          </div>
                          <ChevronDown 
                            className={`h-5 w-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                              expandedFAQ === index ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        {expandedFAQ === index && (
                          <div className="px-6 pb-6">
                            <div className="ml-12 pt-2">
                              <p className="text-gray-600 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Get Started Today</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <button 
                        onClick={handleCall}
                        className="space-y-2 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <Phone className="h-8 w-8 text-primary mx-auto group-hover:scale-110 transition-transform" />
                        <h3 className="font-semibold">Call Us</h3>
                        <p className="text-gray-600 flex items-center justify-center space-x-1">
                          <span>+91 98765 43210</span>
                          <ExternalLink className="h-3 w-3" />
                        </p>
                      </button>
                      <button 
                        onClick={handleEmail}
                        className="space-y-2 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <Mail className="h-8 w-8 text-primary mx-auto group-hover:scale-110 transition-transform" />
                        <h3 className="font-semibold">Email Us</h3>
                        <p className="text-gray-600 flex items-center justify-center space-x-1">
                          <span>info@fortunemedia.com</span>
                          <ExternalLink className="h-3 w-3" />
                        </p>
                      </button>
                      <button 
                        onClick={handleLocation}
                        className="space-y-2 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <MapPin className="h-8 w-8 text-primary mx-auto group-hover:scale-110 transition-transform" />
                        <h3 className="font-semibold">Visit Us</h3>
                        <p className="text-gray-600 flex items-center justify-center space-x-1">
                          <span>Mumbai, India</span>
                          <ExternalLink className="h-3 w-3" />
                        </p>
                      </button>
                    </div>
                    <div className="mt-8 text-center">
                      <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={handleGetQuote}>
                        Request Quote Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </main>
          
          {/* Right spacing */}
          <div className="hidden lg:block lg:col-span-1"></div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
});

ServiceDetail.displayName = 'ServiceDetail';

export default ServiceDetail;