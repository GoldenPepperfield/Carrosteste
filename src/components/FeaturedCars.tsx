import { Car } from "../components/CarCard";
import { CarCard } from "./CarCard";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

interface FeaturedCarsProps {
  cars: Car[];
  onViewDetails: (car: Car) => void;
  onNavigate: (page: string) => void;
}

export function FeaturedCars({ cars, onViewDetails, onNavigate }: FeaturedCarsProps) {
  const featuredCars = cars.filter(car => car.isNew).slice(0, 3);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">Veículos em Destaque</h2>
          <p className="text-gray-600">Os nossos veículos novos mais procurados</p>
        </div>
        <Button variant="ghost" className="hidden md:flex" onClick={() => onNavigate("home")}>
          Ver todos
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCars.map((car) => (
          <CarCard key={car.id} car={car} onViewDetails={onViewDetails} />
        ))}
      </div>
    </section>
  );
}
