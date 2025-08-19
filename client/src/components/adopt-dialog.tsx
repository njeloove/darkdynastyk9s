import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Send, Shield, Instagram, Facebook } from "lucide-react";
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
                "TikTok",
                "https://www.tiktok.com/@darkdynastyk?_r=1&_d=eik3l3bfe61cff&sec_uid=MS4wLjABAAAA5DqQ1W79BMvZ_sJ9o_yWH2C7f23oZoRYkUP2-_Sx11AOZFYjQyxvQSvgyjcUpwVd&share_author_id=7494609065629959223&sharer_language=en&source=h5_m&u_code=ejmi82mb8ke5b7&timestamp=1755596981&user_id=7494609065629959223&sec_user_id=MS4wLjABAAAA5DqQ1W79BMvZ_sJ9o_yWH2C7f23oZoRYkUP2-_Sx11AOZFYjQyxvQSvgyjcUpwVd&item_author_type=1&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7529506715139688198&share_link_id=4465d2a5-6ba9-43e7-be33-4922d3a8198a&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb7360&social_share_type=5&enable_checksum=1"
              )}
              className="w-full bg-black hover:bg-gray-800 text-white flex items-center gap-2"
              data-testid="button-adopt-tiktok"
            >
              <MessageCircle className="w-4 h-4" />
              Contact via TikTok
            </Button>

            <Button
              onClick={() => copyMessageAndRedirect(
                "Telegram",
                "https://t.me/darkdynastyk9ss"
              )}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
              data-testid="button-adopt-telegram"
            >
              <Send className="w-4 h-4" />
              Contact via Telegram
            </Button>

            <Button
              onClick={() => copyMessageAndRedirect(
                "Signal",
                "https://signal.me/#eu/ic4zw8Vd8ET15kK6BzCU0KYzsdBDNtXoIWE--BxjhxHoTkj7LxVOCLl5OPa_SC1F"
              )}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              data-testid="button-adopt-signal"
            >
              <Shield className="w-4 h-4" />
              Contact via Signal
            </Button>

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