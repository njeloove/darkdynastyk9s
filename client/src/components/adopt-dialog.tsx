import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Instagram, Facebook } from "lucide-react";
import type { Puppy } from "@shared/schema";

interface AdoptDialogProps {
  puppy: Puppy | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdoptDialog({ puppy, isOpen, onClose }: AdoptDialogProps) {
  const { toast } = useToast();

  if (!puppy) return null;

  const generateMessage = () => {
    return `Hi! I'm interested in adopting ${puppy.name}.

Details:
- Breed: ${puppy.breed}
- Age: ${puppy.age}
- Gender: ${puppy.gender}
- Price: $${puppy.price.toLocaleString()}
- Weight: ${puppy.weight}
- Color: ${puppy.color}
- Health Status: ${puppy.healthStatus}
- Vaccinated: ${puppy.isVaccinated ? 'Yes' : 'No'}
- Insured: ${puppy.isInsured ? 'Yes' : 'No'}

Please let me know the next steps for adoption. Thank you!`;
  };

  const copyMessageAndRedirect = (platform: string, url: string) => {
    const message = generateMessage();
    
    // Copy to clipboard
    navigator.clipboard.writeText(message).then(() => {
      toast({
        title: "Message Copied!",
        description: `Puppy details copied to clipboard. Opening ${platform}...`,
      });
      
      // Open platform
      window.open(url, '_blank');
      onClose();
    }).catch(() => {
      toast({
        title: "Copy Failed",
        description: "Please manually copy the message details.",
        variant: "destructive",
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Adopt {puppy.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-center text-gray-600">
            Choose your preferred platform to contact us about adopting {puppy.name}. 
            The puppy details will be automatically copied to your clipboard.
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={() => copyMessageAndRedirect(
                "Instagram",
                "https://www.instagram.com/darkdynastyk9ss?igsh=MTFma3o0NXQ4ODlibQ=="
              )}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center gap-2"
              data-testid="button-adopt-instagram"
            >
              <Instagram className="w-4 h-4" />
              Contact via Instagram
            </Button>

            <Button
              onClick={() => copyMessageAndRedirect(
                "Facebook",
                "https://www.facebook.com/profile.php?id=61579619101749"
              )}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-2"
              data-testid="button-adopt-facebook"
            >
              <Facebook className="w-4 h-4" />
              Contact via Facebook
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center mt-4">
            The message will include all puppy details and will be copied to your clipboard automatically.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}