import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.250883b2ed21477ab3ad4b94b4ce9379',
  appName: 'EcoWaste Identifier',
  webDir: 'dist',
  server: {
    url: "https://250883b2-ed21-477a-b3ad-4b94b4ce9379.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ["camera", "photos"]
    }
  }
};

export default config;