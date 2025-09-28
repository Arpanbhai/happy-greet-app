import { useState, useRef } from 'react';
import { Camera, Upload, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WasteAnalysis, WASTE_CLASSIFICATIONS } from '@/types/waste';

interface WasteCameraProps {
  onAnalysisComplete: (analysis: WasteAnalysis) => void;
  onBack: () => void;
}

const WasteCamera = ({ onAnalysisComplete, onBack }: WasteCameraProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateWasteAnalysis = (imageSrc: string): WasteAnalysis => {
    // Simulate AI analysis - in a real app, this would call an AI service
    const wasteTypes = Object.keys(WASTE_CLASSIFICATIONS);
    const randomType = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
    const classification = WASTE_CLASSIFICATIONS[randomType as keyof typeof WASTE_CLASSIFICATIONS];
    
    return {
      wasteType: classification.name,
      confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
      suitableForBurning: classification.burningSuitability,
      riskLevel: classification.riskLevel,
      energyPotential: classification.energyPotential,
      recommendations: {
        energyUse: classification.burningSuitability 
          ? "Suitable for thermoelectric generation through controlled burning"
          : undefined,
        alternatives: classification.alternatives,
        safetyNotes: classification.burningSuitability 
          ? ["Ensure proper ventilation", "Monitor temperature closely", "Have fire safety equipment ready"]
          : ["Do not burn - toxic fumes risk", "Use appropriate recycling methods", "Handle with protective equipment if needed"]
      },
      detectedMaterials: [
        {
          material: classification.name,
          confidence: Math.floor(Math.random() * 20) + 80,
          properties: classification.burningSuitability 
            ? ["Combustible", "Low toxicity", "Energy potential"]
            : ["Non-combustible", "Recyclable", "Potential toxicity"]
        }
      ]
    };
  };

  const handleImageCapture = async (imageSrc: string) => {
    setCapturedImage(imageSrc);
    setIsAnalyzing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const analysis = simulateWasteAnalysis(imageSrc);
    setIsAnalyzing(false);
    onAnalysisComplete(analysis);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string;
        handleImageCapture(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      // Create video element for camera preview
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      video.addEventListener('loadedmetadata', () => {
        // Create canvas to capture image
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          const imageSrc = canvas.toDataURL('image/jpeg');
          
          // Stop camera
          stream.getTracks().forEach(track => track.stop());
          
          handleImageCapture(imageSrc);
        }
      });
    } catch (error) {
      console.error('Camera access error:', error);
      // Fallback to file upload
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-3">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Capture Waste Image
          </h1>
        </div>

        {/* Analysis in Progress */}
        {isAnalyzing ? (
          <Card className="text-center">
            <CardContent className="py-12">
              <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analyzing Waste...</h3>
              <p className="text-muted-foreground mb-4">
                Our AI is identifying the waste type and safety classification
              </p>
              {capturedImage && (
                <div className="mt-6">
                  <img 
                    src={capturedImage} 
                    alt="Captured waste" 
                    className="max-w-full h-48 object-cover mx-auto rounded-lg shadow-md"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          /* Capture Interface */
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center">
                  <Camera className="h-6 w-6 mr-2" />
                  Waste Analysis
                </CardTitle>
                <CardDescription>
                  Take a clear photo of the waste material for accurate identification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={startCamera}
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Take Photo
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <Button 
                  variant="outline"
                  size="lg" 
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Image
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Photography Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Ensure good lighting for clear visibility</li>
                  <li>• Place waste on a contrasting background</li>
                  <li>• Include the entire item in the frame</li>
                  <li>• Avoid shadows and reflections</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default WasteCamera;