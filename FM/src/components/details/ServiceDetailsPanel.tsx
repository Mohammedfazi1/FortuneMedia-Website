import { type Service } from "../../data/servicesData";
import { X, Phone, MessageCircle, MapPin } from "lucide-react";

export default function ServiceDetailsPanel({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  const handleCall = () => {
    window.open('tel:+917010696969', '_self');
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${service.name} in ${service.regions.join(', ')}`;
    window.open(`https://wa.me/917010696969?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEnquiry = () => {
    const subject = `Enquiry for ${service.name}`;
    window.open(`mailto:fortunemedia.adv@gmail.com?subject=${encodeURIComponent(subject)}`, '_self');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-end lg:items-center">
      <div className="w-full max-w-4xl bg-white rounded-t-xl lg:rounded-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{service.name}</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/600x400/f3f4f6/9ca3af?text=Service+Image';
              }}
            />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Coverage</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{service.regions.join(', ')}</span>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  service.available
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {service.available ? 'Available' : 'Not Available'}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <button
                onClick={handleCall}
                className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </button>
              <button
                onClick={handleEnquiry}
                className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}