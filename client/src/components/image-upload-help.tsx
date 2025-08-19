import { Info, Upload, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ImageUploadHelp() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Image className="w-5 h-5" />
          How to Add Pictures
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            You can add pictures in two ways: upload to the project or use web URLs.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-3">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Method 1: Upload to Project
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>Go to the file explorer on the left side</li>
              <li>Navigate to the "attached_assets" folder</li>
              <li>Drag and drop your images or click to upload</li>
              <li>Copy the file path (e.g., "/attached_assets/my-puppy.jpg")</li>
              <li>Paste this path when adding images</li>
            </ol>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Method 2: Use Web URLs</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>Upload your images to any image hosting service</li>
              <li>Copy the direct image URL</li>
              <li>Paste the URL when adding images</li>
              <li>Make sure the URL ends with .jpg, .png, or .webp</li>
            </ol>
          </div>
          
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> For best results, use images that are at least 400x300 pixels. 
              You can add multiple pictures to show different angles of each puppy.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}