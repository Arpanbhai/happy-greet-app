import { useState } from 'react';
import { Camera, Upload, Zap, AlertTriangle, Recycle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WasteCamera from '@/components/WasteCamera';
import WasteResults from '@/components/WasteResults';
import { WasteAnalysis } from '@/types/waste';

const Index = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<WasteAnalysis | null>(null);

  const handleAnalysisComplete = (result: WasteAnalysis) => {
    setAnalysisResult(result);
    setShowCamera(false);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setShowCamera(false);
  };

  if (showCamera) {
    return (
      <WasteCamera 
        onAnalysisComplete={handleAnalysisComplete}
        onBack={() => setShowCamera(false)}
      />
    );
  }

  if (analysisResult) {
    return (
      <WasteResults 
        analysis={analysisResult}
        onBack={resetAnalysis}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              EcoWaste Identifier
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Smart Waste Classification for Energy Generation
          </p>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Identify which waste materials can be safely used for energy generation and get recommendations for proper disposal of non-burnable waste.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle>Energy Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Identify waste materials suitable for thermoelectric energy generation
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <CardTitle>Safety Classification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Detect harmful materials that shouldn't be burned for safety
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Recycle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle>Alternative Uses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get suggestions for recycling and repurposing non-burnable waste
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Action */}
        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Camera className="h-6 w-6 mr-2" />
                Analyze Your Waste
              </CardTitle>
              <CardDescription>
                Take a photo or upload an image to identify waste materials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => setShowCamera(true)}
              >
                <Camera className="h-5 w-5 mr-2" />
                Start Camera Analysis
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Project Info */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>About This Science Exhibition Project</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-3">
              <p className="text-sm text-muted-foreground">
                This project demonstrates how AI and computer vision can help classify waste materials 
                for safe energy generation using thermoelectric generators.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary">Thermoelectric Generation</Badge>
                <Badge variant="secondary">Waste Classification</Badge>
                <Badge variant="secondary">Computer Vision</Badge>
                <Badge variant="secondary">Environmental Safety</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
