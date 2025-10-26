import { useState } from "react";
import { Hero } from "../components/Hero";
import { CarFilters } from "../components/CarFilters";
import { CarCard, type Car } from "../components/CarCard";
import { CarDetailsDialog } from "../components/CarDetailsDialog";
import { FeaturedCars } from "../components/FeaturedCars";
import { BrandSelector } from "../components/BrandSelector";
import { Footer } from "../components/Footer";
import type { Marca } from "../types";
import { calculateDistance, portugueseCities, carBrands } from "../lib/brands";

interface HomePageProps {
  marcas: Record<string, Marca>;
  cars: Car[];
  onNavigate: (page: string) => void;
}

export function HomePage({ marcas, cars, onNavigate }: HomePageProps) {
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [yearRange, setYearRange] = useState<number[]>([2010, 2025]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedFuels, setSelectedFuels] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [maxDistance, setMaxDistance] = useState<number>(50);
  const [selectedBrandKeys, setSelectedBrandKeys] = useState<string[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleBrandChange = (brandId: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
    );
  };

  const handleBrandKeyToggle = (brandKey: string) => {
    setSelectedBrandKeys((prev) =>
      prev.includes(brandKey) ? prev.filter((k) => k !== brandKey) : [...prev, brandKey]
    );
  };

  const handleFuelChange = (fuel: string) => {
    setSelectedFuels((prev) =>
      prev.includes(fuel) ? prev.filter((f) => f !== fuel) : [...prev, fuel]
    );
  };

  const handleReset = () => {
    setPriceRange([0, 100000]);
    setYearRange([2010, 2025]);
    setSelectedTypes([]);
    setSelectedBrands([]);
    setSelectedFuels([]);
    setSelectedCondition("all");
    setSelectedLocation("all");
    setMaxDistance(50);
    setSelectedBrandKeys([]);
  };

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setDialogOpen(true);
  };

  // Filtrar e ordenar carros
  let filteredCars = cars.filter((car) => {
    const priceMatch = car.price >= priceRange[0] && car.price <= priceRange[1];
    const yearMatch = car.year >= yearRange[0] && car.year <= yearRange[1];
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(car.type);
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(car.marca.id_marca);
    const fuelMatch = selectedFuels.length === 0 || selectedFuels.includes(car.fuel);
    const conditionMatch = 
      selectedCondition === "all" ||
      (selectedCondition === "novo" && car.isNew) ||
      (selectedCondition === "usado" && !car.isNew);
    
    // Brand key filter (from brand selector)
    const brandKeyMatch = selectedBrandKeys.length === 0 || 
      selectedBrandKeys.some(key => {
        const brand = carBrands[key as keyof typeof carBrands];
        return brand && car.marca.nome.toLowerCase().includes(brand.name.toLowerCase());
      });
    
    // Location filter
    let locationMatch = true;
    if (selectedLocation && selectedLocation !== "all" && car.coordinates) {
      const userCity = portugueseCities.find(c => c.name === selectedLocation);
      if (userCity) {
        const distance = calculateDistance(
          userCity.lat,
          userCity.lng,
          car.coordinates.lat,
          car.coordinates.lng
        );
        locationMatch = distance <= maxDistance;
      }
    }
    
    return priceMatch && yearMatch && typeMatch && brandMatch && fuelMatch && conditionMatch && brandKeyMatch && locationMatch;
  });

  // Ordenar por distância se houver localização selecionada
  if (selectedLocation && selectedLocation !== "all") {
    const userCity = portugueseCities.find(c => c.name === selectedLocation);
    if (userCity) {
      filteredCars = [...filteredCars].sort((a, b) => {
        if (!a.coordinates || !b.coordinates) return 0;
        const distA = calculateDistance(userCity.lat, userCity.lng, a.coordinates.lat, a.coordinates.lng);
        const distB = calculateDistance(userCity.lat, userCity.lng, b.coordinates.lat, b.coordinates.lng);
        return distA - distB;
      });
    }
  }

  return (
    <>
      <Hero />

      <BrandSelector 
        selectedBrands={selectedBrandKeys} 
        onBrandToggle={handleBrandKeyToggle}
      />

      <FeaturedCars cars={cars} onViewDetails={handleViewDetails} onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="mb-2">Todos os Veículos</h2>
          <p className="text-gray-600">Explore o nosso catálogo completo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <CarFilters
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              yearRange={yearRange}
              onYearChange={setYearRange}
              selectedTypes={selectedTypes}
              onTypeChange={handleTypeChange}
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
              selectedFuels={selectedFuels}
              onFuelChange={handleFuelChange}
              selectedCondition={selectedCondition}
              onConditionChange={setSelectedCondition}
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
              maxDistance={maxDistance}
              onMaxDistanceChange={setMaxDistance}
              onReset={handleReset}
              marcas={marcas}
            />
          </aside>

          {/* Car Grid */}
          <main className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredCars.length} {filteredCars.length === 1 ? "veículo encontrado" : "veículos encontrados"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  Nenhum veículo encontrado com os filtros selecionados.
                </p>
                <button
                  onClick={handleReset}
                  className="text-blue-600 hover:underline mt-2"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />

      {/* Car Details Dialog */}
      <CarDetailsDialog
        car={selectedCar}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
