import { Calendar, Fuel, Gauge, Heart, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Veiculo, Marca } from "../types";
import { formatCurrency } from "../lib/format";

// Interface simplificada para o Card (mantém compatibilidade)
export interface Car {
  id: number;
  name: string;
  marca: Marca; // Agora usa a classe Marca
  year: number;
  price: number;
  mileage: string;
  fuel: string;
  transmission: string;
  image: string;
  type: string;
  isNew: boolean;
  color?: string;
  location?: string;
  description?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  distance?: number;
}

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
}

export function CarCard({ car, onViewDetails }: CarCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
      <div className="relative" onClick={() => onViewDetails(car)}>
        <div className="overflow-hidden">
          <ImageWithFallback
            src={car.image}
            alt={car.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        {car.isNew && (
          <Badge className="absolute top-3 left-3 bg-green-600 shadow-lg">Novo</Badge>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite toggle
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-600">{car.marca.nome}</p>
            {car.distance !== undefined && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {car.distance} km
              </span>
            )}
          </div>
          <h3 className="text-lg">{car.name}</h3>
        </div>

        <div className="mb-4">
          <p className="text-2xl text-blue-600">
            {formatCurrency(car.price)}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="h-3 w-3" />
            <span>{car.mileage} km</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-3 w-3" />
            <span>{car.fuel}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() => onViewDetails(car)}
        >
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
}
