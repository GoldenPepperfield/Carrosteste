import { useState } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Card, CardContent } from "../components/ui/card";
import {
  Calendar,
  Fuel,
  Gauge,
  Cog,
  Car as CarIcon,
  Phone,
  Mail,
  MapPin,
  Heart,
  Share2,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { formatCurrency } from "../lib/format";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import type { Car } from "../components/CarCard";

interface VehicleDetailsPageProps {
  car: Car;
  onNavigate: (page: string) => void;
}

export function VehicleDetailsPage({ car, onNavigate }: VehicleDetailsPageProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [car.image, car.image, car.image]; // Mock multiple images

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate("home")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar à pesquisa
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                  <ImageWithFallback
                    src={images[currentImage]}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  {car.isNew && (
                    <Badge className="absolute top-4 left-4 bg-green-600">Novo</Badge>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 p-4">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        currentImage === index ? "border-blue-600" : "border-gray-200"
                      }`}
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`${car.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Info */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-1">{car.marca.nome}</p>
                  <h1 className="text-3xl mb-2">{car.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {car.location}
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Description */}
                {car.description && (
                  <div className="mb-6">
                    <h3 className="mb-3">Descrição</h3>
                    <p className="text-gray-700">{car.description}</p>
                  </div>
                )}

                <Separator className="my-6" />

                {/* Specifications */}
                <div>
                  <h3 className="mb-4">Especificações</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-600">Ano</p>
                        <p className="text-sm">{car.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Gauge className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-600">Quilometragem</p>
                        <p className="text-sm">{car.mileage} km</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Fuel className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-600">Combustível</p>
                        <p className="text-sm">{car.fuel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Cog className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-600">Caixa</p>
                        <p className="text-sm">{car.transmission}</p>
                      </div>
                    </div>
                    {car.color && (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="h-5 w-5 rounded-full border-2 border-blue-600" />
                        <div>
                          <p className="text-xs text-gray-600">Cor</p>
                          <p className="text-sm">{car.color}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <CarIcon className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-600">Condição</p>
                        <p className="text-sm">{car.isNew ? "Novo" : "Usado"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Features */}
                <div>
                  <h3 className="mb-4">Equipamento</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Ar Condicionado Automático",
                      "Direção Assistida",
                      "Vidros Elétricos",
                      "Air Bags Frontais e Laterais",
                      "Sistema ABS",
                      "Sensor de Estacionamento",
                      "Câmera de Marcha Atrás",
                      "Sistema Multimédia",
                      "Controlo de Velocidade",
                      "Bancos em Pele",
                      "Jantes em Liga Leve",
                      "Faróis LED",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-6">
                {/* Price */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Preço</p>
                  <p className="text-4xl text-blue-600 mb-2">
                    {formatCurrency(car.price)}
                  </p>
                  <p className="text-sm text-gray-600">
                    ou 48x de {formatCurrency(car.price / 48)}
                  </p>
                </div>

                <Separator />

                {/* Contact */}
                <div className="space-y-3">
                  <h3 className="text-sm">Contactar Vendedor</h3>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Phone className="mr-2 h-4 w-4" />
                    +351 912 345 678
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                  <Button variant="outline" className="w-full">
                    Reservar Veículo
                  </Button>
                </div>

                <Separator />

                {/* Seller Info */}
                <div>
                  <h3 className="text-sm mb-3">Vendedor</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <CarIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm">AutoStand Premium</p>
                      <p className="text-xs text-gray-600">Vendedor Profissional</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full text-sm">
                    Ver todos os anúncios
                  </Button>
                </div>

                <Separator />

                {/* Safety Tips */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm mb-2">Dicas de Segurança</h3>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Inspecione o veículo pessoalmente</li>
                    <li>• Verifique toda a documentação</li>
                    <li>• Nunca pague adiantado</li>
                    <li>• Desconfie de preços muito baixos</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
