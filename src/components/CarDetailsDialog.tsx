import {
  Calendar,
  Fuel,
  Gauge,
  Cog,
  Car as CarIcon,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Car } from "./CarCard";
import { formatCurrency } from "../lib/format";

interface CarDetailsDialogProps {
  car: Car | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CarDetailsDialog({
  car,
  open,
  onOpenChange,
}: CarDetailsDialogProps) {
  if (!car) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{car.name}</DialogTitle>
              <DialogDescription className="text-lg mt-1">
                {car.marca.nome} - {car.year}
              </DialogDescription>
            </div>
            {car.isNew && <Badge className="bg-green-600">Novo</Badge>}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="rounded-lg overflow-hidden">
            <ImageWithFallback
              src={car.image}
              alt={car.name}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Price */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Preço</p>
            <p className="text-3xl text-blue-600">
              {formatCurrency(car.price)}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              ou 48x de {formatCurrency(car.price / 48)}
            </p>
          </div>

          {/* Description */}
          {car.description && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="mb-2">Descrição</h3>
              <p className="text-sm text-gray-700">{car.description}</p>
            </div>
          )}

          {/* Specifications */}
          <div>
            <h3 className="mb-4">Especificações</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Ano</p>
                  <p className="text-sm">{car.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Gauge className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Quilometragem</p>
                  <p className="text-sm">{car.mileage} km</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Fuel className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Combustível</p>
                  <p className="text-sm">{car.fuel}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Cog className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Caixa de Velocidades</p>
                  <p className="text-sm">{car.transmission}</p>
                </div>
              </div>
              {car.color && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="h-5 w-5 rounded-full border-2 border-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Cor</p>
                    <p className="text-sm">{car.color}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <CarIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Condição</p>
                  <p className="text-sm">{car.isNew ? "Novo" : "Usado"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-4">Características</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Ar Condicionado",
                "Direção Elétrica",
                "Vidros Elétricos",
                "Air Bags",
                "Freios ABS",
                "Sensor de Estacionamento",
                "Câmera de Ré",
                "Central Multimídia",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Contact */}
          <div>
            <h3 className="mb-4">Contactar Vendedor</h3>
            <div className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Phone className="mr-2 h-4 w-4" />
                +351 912 345 678
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Enviar E-mail
              </Button>
              {car.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                  <MapPin className="h-4 w-4" />
                  <span>{car.location}</span>
                </div>
              )}
            
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
