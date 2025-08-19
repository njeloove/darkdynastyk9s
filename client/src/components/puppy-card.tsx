import { useState } from "react";
import { Calendar, Weight, Zap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageCarousel from "@/components/image-carousel";
import type { Puppy } from "@shared/schema";

interface PuppyCardProps {
  puppy: Puppy;
  onViewDetails: () => void;
}

export default function PuppyCard({ puppy, onViewDetails }: PuppyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleInquiry = () => {
    // Handle inquiry logic here
    alert(`Inquiry submitted for ${puppy.name}!`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <ImageCarousel
          images={puppy.images}
          alt={puppy.name}
          currentIndex={currentImageIndex}
          onIndexChange={setCurrentImageIndex}
          className="h-80"
        />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full font-semibold text-sm">
          {puppy.name.includes('Twins') ? `$${puppy.price.toLocaleString()} each` : `$${puppy.price.toLocaleString()}`}
        </div>
        
        {/* Photo Count Badge */}
        {puppy.images.length > 2 && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full font-semibold text-xs">
            {puppy.images.length} Photos
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2">{puppy.name}</h3>
        <p className="text-gray-600 mb-4">{puppy.breed}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="text-secondary w-4 h-4" />
            <span>{puppy.age}</span>
          </div>
          <div className="flex items-center gap-2">
            <Weight className="text-secondary w-4 h-4" />
            <span>{puppy.weight}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="text-secondary w-4 h-4" />
            <span>{puppy.gender}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-secondary w-4 h-4" />
            <span>{puppy.isAvailable ? "Available" : "Reserved"}</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={onViewDetails}
            className="flex-1 bg-secondary hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            {puppy.images.length > 2 ? "View Gallery" : "View Details"}
          </Button>
          <Button 
            onClick={handleInquiry}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Inquire Now
          </Button>
        </div>
      </div>
    </div>
  );
}
