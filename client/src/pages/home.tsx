import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Phone, Heart, Shield, Syringe, Truck, Tag, AlertCircle, MapPin, Inbox, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PuppyCard from "@/components/puppy-card";
import PuppyModal from "@/components/puppy-modal";
import type { Puppy } from "@shared/schema";

export default function Home() {
  const [selectedPuppy, setSelectedPuppy] = useState<Puppy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: puppies, isLoading, error } = useQuery<Puppy[]>({
    queryKey: ["/api/puppies"],
  });

  const openPuppyModal = (puppy: Puppy) => {
    setSelectedPuppy(puppy);
    setIsModalOpen(true);
  };

  const closePuppyModal = () => {
    setSelectedPuppy(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <Skeleton className="h-80 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-48 mb-4" />
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Skeleton className="h-12 flex-1" />
                    <Skeleton className="h-12 flex-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-warm flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load puppies. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="bg-warm font-inter">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">DarkDynastyK9s</h1>
              <p className="text-gray-300 mt-2 text-lg">Premium Puppies – Vaccinated, Insured, Healthy</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Button className="bg-secondary hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
              <Button className="bg-accent hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Badges */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center md:justify-around items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="text-green-500 w-4 h-4" />
              <span>100% Health Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <Syringe className="text-blue-500 w-4 h-4" />
              <span>Fully Vaccinated</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="text-accent w-4 h-4" />
              <span>Free US Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="text-purple-500 w-4 h-4" />
              <span>Insured Puppies</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Available Puppies</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Each of our puppies comes with a complete health guarantee, vaccination records, and our commitment to your new family member's wellbeing.
          </p>
        </div>

        {/* Puppies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {puppies?.map((puppy) => (
            <PuppyCard
              key={puppy.id}
              puppy={puppy}
              onViewDetails={() => openPuppyModal(puppy)}
            />
          ))}
        </div>
      </main>

      {/* Contact Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Welcome Your New Family Member?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our available puppies. We're here to help you find the perfect companion for your family.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="flex items-center gap-3">
              <Phone className="text-accent w-5 h-5" />
              <span className="text-lg">(555) 123-DOGS</span>
            </div>
            <div className="flex items-center gap-3">
              <Inbox className="text-accent w-5 h-5" />
              <span className="text-lg">info@darkdynastyk9s.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-accent w-5 h-5" />
              <span className="text-lg">Available Nationwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DarkDynastyK9s</h3>
              <p className="text-gray-300">
                Premium puppy breeding with a focus on health, temperament, and quality. Your trusted partner in finding the perfect family companion.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Available Puppies</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Health Guarantee</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Delivery Information</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DarkDynastyK9s. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Puppy Modal */}
      {selectedPuppy && (
        <PuppyModal
          puppy={selectedPuppy}
          isOpen={isModalOpen}
          onClose={closePuppyModal}
        />
      )}
    </div>
  );
}
