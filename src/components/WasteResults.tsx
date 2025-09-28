import { ArrowLeft, Zap, AlertTriangle, Recycle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { WasteAnalysis } from '@/types/waste';

interface WasteResultsProps {
  analysis: WasteAnalysis;
  onBack: () => void;
}

const WasteResults = ({ analysis, onBack }: WasteResultsProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-3">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analysis Results
          </h1>
        </div>

        <div className="space-y-6">
          {/* Main Classification */}
          <Card className={`border-l-4 ${
            analysis.suitableForBurning ? 'border-l-green-500' : 'border-l-red-500'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {analysis.suitableForBurning ? (
                    <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600 mr-3" />
                  )}
                  <div>
                    <CardTitle className="text-xl">{analysis.wasteType}</CardTitle>
                    <CardDescription>
                      Confidence: {analysis.confidence}%
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={getRiskBadgeVariant(analysis.riskLevel)}>
                  {analysis.riskLevel.toUpperCase()} RISK
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Confidence Level</span>
                    <span>{analysis.confidence}%</span>
                  </div>
                  <Progress value={analysis.confidence} className="h-2" />
                </div>

                <div className={`p-4 rounded-lg ${
                  analysis.suitableForBurning 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-center mb-2">
                    {analysis.suitableForBurning ? (
                      <Zap className="h-5 w-5 text-green-600 mr-2" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                    )}
                    <span className="font-semibold">
                      {analysis.suitableForBurning ? 'Safe for Energy Generation' : 'Not Suitable for Burning'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {analysis.suitableForBurning 
                      ? 'This material can be safely used for thermoelectric energy generation.'
                      : 'This material should not be burned due to safety or environmental concerns.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Energy Potential */}
          {analysis.suitableForBurning && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 text-yellow-600 mr-2" />
                  Energy Generation Potential
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Energy Potential</span>
                    <span>{analysis.energyPotential}%</span>
                  </div>
                  <Progress value={analysis.energyPotential} className="h-3" />
                  {analysis.recommendations.energyUse && (
                    <p className="text-sm text-muted-foreground mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      💡 {analysis.recommendations.energyUse}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Safety Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className={`h-5 w-5 mr-2 ${getRiskColor(analysis.riskLevel)}`} />
                Safety Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations.safetyNotes.map((note, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="text-orange-500 mr-2">⚠️</span>
                    {note}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Alternative Uses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Recycle className="h-5 w-5 text-green-600 mr-2" />
                Alternative Uses & Recycling
              </CardTitle>
              <CardDescription>
                Eco-friendly alternatives for this waste material
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.recommendations.alternatives.map((alternative, index) => (
                  <div key={index} className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Recycle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-sm">{alternative}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detected Materials */}
          <Card>
            <CardHeader>
              <CardTitle>Material Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.detectedMaterials.map((material, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{material.material}</span>
                      <Badge variant="outline">{material.confidence}%</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {material.properties.map((property, propIndex) => (
                        <Badge key={propIndex} variant="secondary" className="text-xs">
                          {property}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="text-center pb-6">
            <Button onClick={onBack} size="lg" className="w-full">
              Analyze Another Item
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteResults;