import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, Thermometer, Zap, Activity } from 'lucide-react';

interface SensorData {
  temperature: number;
  gasLevel: number;
  flameDetected: boolean;
  timestamp: Date;
}

interface SensorIntegrationProps {
  onSensorData?: (data: SensorData) => void;
}

const SensorIntegration = ({ onSensorData }: SensorIntegrationProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Simulate sensor connection for demo purposes
  const simulateSensorConnection = () => {
    setIsConnecting(true);
    
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      
      // Start simulating sensor data
      const interval = setInterval(() => {
        const newData: SensorData = {
          temperature: Math.round(25 + Math.random() * 50), // 25-75°C
          gasLevel: Math.round(Math.random() * 100), // 0-100%
          flameDetected: Math.random() > 0.8, // 20% chance
          timestamp: new Date()
        };
        
        setSensorData(newData);
        onSensorData?.(newData);
      }, 2000);

      // Store interval ID to clear later
      (window as any).sensorInterval = interval;
    }, 3000);
  };

  const disconnectSensor = () => {
    setIsConnected(false);
    setSensorData(null);
    if ((window as any).sensorInterval) {
      clearInterval((window as any).sensorInterval);
    }
  };

  useEffect(() => {
    return () => {
      if ((window as any).sensorInterval) {
        clearInterval((window as any).sensorInterval);
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          {isConnected ? (
            <Wifi className="h-5 w-5 text-green-600 mr-2" />
          ) : (
            <WifiOff className="h-5 w-5 text-gray-400 mr-2" />
          )}
          Hardware Sensor Integration
        </CardTitle>
        <CardDescription>
          Connect to your Arduino/microcontroller sensors for real-time waste burning monitoring
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          <Button
            variant={isConnected ? "destructive" : "default"}
            size="sm"
            onClick={isConnected ? disconnectSensor : simulateSensorConnection}
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting..." : isConnected ? "Disconnect" : "Connect Sensors"}
          </Button>
        </div>

        {/* Sensor Data Display */}
        {sensorData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Thermometer className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm font-medium">Temperature</span>
                </div>
                <Badge variant={sensorData.temperature > 60 ? "destructive" : "secondary"}>
                  {sensorData.temperature}°C
                </Badge>
              </div>
            </Card>

            <Card className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">Gas Level</span>
                </div>
                <Badge variant={sensorData.gasLevel > 70 ? "destructive" : "secondary"}>
                  {sensorData.gasLevel}%
                </Badge>
              </div>
            </Card>

            <Card className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-sm font-medium">Flame Status</span>
                </div>
                <Badge variant={sensorData.flameDetected ? "destructive" : "default"}>
                  {sensorData.flameDetected ? "Detected" : "None"}
                </Badge>
              </div>
            </Card>
          </div>
        )}

        {/* Connection Instructions */}
        {!isConnected && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              How to Connect Your Hardware:
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Use Arduino with WiFi capability (ESP32/ESP8266)</li>
              <li>• Connect temperature sensor (DS18B20 or DHT22)</li>
              <li>• Add gas sensor (MQ-2 for smoke/gas detection)</li>
              <li>• Install flame sensor module</li>
              <li>• Set up HTTP endpoint to send sensor data</li>
            </ul>
          </div>
        )}

        {/* Real-time Alerts */}
        {sensorData && (sensorData.temperature > 60 || sensorData.gasLevel > 70 || sensorData.flameDetected) && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center">
              ⚠️ Safety Alert
            </h4>
            <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
              {sensorData.temperature > 60 && <li>• High temperature detected - check ventilation</li>}
              {sensorData.gasLevel > 70 && <li>• Elevated gas levels - ensure proper airflow</li>}
              {sensorData.flameDetected && <li>• Flame detected - monitor combustion process</li>}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SensorIntegration;