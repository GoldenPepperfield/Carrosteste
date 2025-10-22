import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { CarCard, type Car } from "../components/CarCard";
import { CarDetailsDialog } from "../components/CarDetailsDialog";

interface FavoritesPageProps {
  cars: Car[];
  onNavigate: (page: string) => void;
}

export function FavoritesPage({ cars, onNavigate }: FavoritesPageProps) {
  const [favorites, setFavorites] = useState<Car[]>(cars.slice(0, 3)); // Mock favorites
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setDialogOpen(true);
  };

  const handleRemoveFavorite = (carId: number) => {
    setFavorites(favorites.filter(car => car.id !== carId));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">Meus Favoritos</h1>
          <p className="text-gray-600">Veículos que guardou para mais tarde</p>
        </div>

        {favorites.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="mb-2">Nenhum favorito guardado</h3>
              <p className="text-gray-600 mb-6">
                Comece a adicionar veículos aos seus favoritos para os encontrar facilmente
              </p>
              <Button onClick={() => onNavigate("home")} className="bg-blue-600 hover:bg-blue-700">
                Explorar Veículos
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {favorites.length} {favorites.length === 1 ? "veículo guardado" : "veículos guardados"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((car) => (
                <div key={car.id} className="relative">
                  <CarCard car={car} onViewDetails={handleViewDetails} />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-3 right-3 rounded-full"
                    onClick={() => handleRemoveFavorite(car.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}

        <CarDetailsDialog
          car={selectedCar}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
    </div>
  );
}
