export interface WasteAnalysis {
  wasteType: string;
  confidence: number;
  suitableForBurning: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  energyPotential: number; // 0-100 scale
  recommendations: {
    energyUse?: string;
    alternatives: string[];
    safetyNotes: string[];
  };
  detectedMaterials: Array<{
    material: string;
    confidence: number;
    properties: string[];
  }>;
}

export const WASTE_CLASSIFICATIONS = {
  ORGANIC: {
    name: 'Organic Waste',
    burningSuitability: true,
    energyPotential: 75,
    riskLevel: 'low' as const,
    alternatives: ['Composting', 'Biogas generation', 'Fertilizer production']
  },
  PAPER: {
    name: 'Paper Waste',
    burningSuitability: true,
    energyPotential: 65,
    riskLevel: 'low' as const,
    alternatives: ['Recycling', 'Pulp production', 'Cardboard manufacturing']
  },
  WOOD: {
    name: 'Wood Waste',
    burningSuitability: true,
    energyPotential: 80,
    riskLevel: 'low' as const,
    alternatives: ['Wood chips', 'Furniture repair', 'Craft projects']
  },
  PLASTIC: {
    name: 'Plastic Waste',
    burningSuitability: false,
    energyPotential: 0,
    riskLevel: 'high' as const,
    alternatives: ['Recycling', 'Pyrolysis', 'Plastic-to-fuel conversion', '3D printing filament']
  },
  METAL: {
    name: 'Metal Waste',
    burningSuitability: false,
    energyPotential: 0,
    riskLevel: 'medium' as const,
    alternatives: ['Scrap metal recycling', 'Smelting', 'Art projects', 'Tool repair']
  },
  ELECTRONIC: {
    name: 'Electronic Waste',
    burningSuitability: false,
    energyPotential: 0,
    riskLevel: 'high' as const,
    alternatives: ['E-waste recycling', 'Component harvesting', 'Precious metal recovery']
  },
  TEXTILE: {
    name: 'Textile Waste',
    burningSuitability: true,
    energyPotential: 50,
    riskLevel: 'medium' as const,
    alternatives: ['Cloth recycling', 'Rag production', 'Insulation material', 'Upcycling']
  }
};