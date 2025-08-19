import { X, Calendar, Weight, Palette, Shield, Syringe, Tag, Truck, Phone, Heart, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import type { Puppy } from "@shared/schema";

interface PuppyModalProps {
  puppy: Puppy;
  isOpen: boolean;
  onClose: () => void;
}

export default function PuppyModal({ puppy, isOpen, onClose }: PuppyModalProps) {
  const handleReserve = () => {
    alert(`Reservation request submitted for ${puppy.name}!`);
  };

  const handleCall = () => {
    window.location.href = "tel:+15551234647";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-600 hover:text-gray-800 w-10 h-10 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>
        
        <div className="text-center p-6">
          {/* Image Gallery */}
          {puppy.images.length > 1 ? (
            <div className="relative mb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {puppy.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${puppy.name} - Photo ${index + 1}`}
                    className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer w-full h-48 object-cover"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <img
                src={puppy.images[0]}
                alt={puppy.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg mx-auto max-w-md"
              />
            </div>
          )}

          <h2 className="text-3xl font-bold text-primary mb-4">{puppy.name}</h2>
          <p className="text-gray-600 mb-6">{puppy.breed}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary mb-3">Puppy Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="text-secondary w-5 h-5" />
                  <span><strong>Age:</strong> {puppy.age}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Weight className="text-secondary w-5 h-5" />
                  <span><strong>Weight:</strong> {puppy.weight}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-secondary w-5 h-5 text-center">♂♀</span>
                  <span><strong>Gender:</strong> {puppy.gender}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Palette className="text-secondary w-5 h-5" />
                  <span><strong>Color:</strong> {puppy.color}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary mb-3">Health & Care</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="text-green-500 w-5 h-5" />
                  <span><strong>Health:</strong> {puppy.healthStatus}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Syringe className="text-blue-500 w-5 h-5" />
                  <span><strong>Vaccinated:</strong> {puppy.isVaccinated ? "Yes (Age Appropriate)" : "No"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Tag className="text-purple-500 w-5 h-5" />
                  <span><strong>Insured:</strong> {puppy.isInsured ? "Yes" : "No"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="text-accent w-5 h-5" />
                  <span><strong>Delivery:</strong> {puppy.freeDelivery ? "Free in US" : "Available"}</span>
                </div>
              </div>
            </div>
          </div>
          
          {puppy.description && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">{puppy.description}</p>
            </div>
          )}
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <div className="text-center mb-4">
              <span className="text-3xl font-bold text-accent">
                {puppy.name.includes('Twins') ? `$${puppy.price.toLocaleString()} each` : `$${puppy.price.toLocaleString()}`}
              </span>
              <span className="text-gray-600 ml-2">(Negotiable)</span>
              {puppy.name.includes('Twins') && (
                <div className="text-sm text-gray-600 mt-2">
                  Two beautiful puppies available - priced individually
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <Button
                onClick={handleReserve}
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                <Heart className="w-4 h-4 mr-2" />
                Reserve {puppy.name}
              </Button>
              <Button
                onClick={handleCall}
                className="bg-secondary hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
              <Button
                onClick={() => window.open('https://www.tiktok.com/@darkdynastyk?_r=1&_d=eik3l3bfe61cff&sec_uid=MS4wLjABAAAA5DqQ1W79BMvZ_sJ9o_yWH2C7f23oZoRYkUP2-_Sx11AOZFYjQyxvQSvgyjcUpwVd&share_author_id=7494609065629959223&sharer_language=en&source=h5_m&u_code=ejmi82mb8ke5b7&timestamp=1755596981&user_id=7494609065629959223&sec_user_id=MS4wLjABAAAA5DqQ1W79BMvZ_sJ9o_yWH2C7f23oZoRYkUP2-_Sx11AOZFYjQyxvQSvgyjcUpwVd&item_author_type=1&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7529506715139688198&share_link_id=4465d2a5-6ba9-43e7-be33-4922d3a8198a&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb7360&social_share_type=5&enable_checksum=1', '_blank')}
                className="bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                TikTok
              </Button>
              <Button
                onClick={() => window.open('https://t.me/darkdynastyk9ss', '_blank')}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                <Send className="w-4 h-4 mr-2" />
                Telegram
              </Button>
              <Button
                onClick={() => window.open('https://signal.me/#eu/ic4zw8Vd8ET15kK6BzCU0KYzsdBDNtXoIWE--BxjhxHoTkj7LxVOCLl5OPa_SC1F', '_blank')}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                <Shield className="w-4 h-4 mr-2" />
                Signal
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
