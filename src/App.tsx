import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CreateAnnouncementPage } from "./pages/CreateAnnouncementPage";
import { ReservationsPage } from "./pages/ReservationsPage";
import { AdminPage } from "./pages/AdminPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { VehicleDetailsPage } from "./pages/VehicleDetailsPage";
import { SalesPage } from "./pages/SalesPage";
import { ReportsPage } from "./pages/ReportsPage";
import { MyReportsPage } from "./pages/MyReportsPage";
import { MyAnnouncementsPage } from "./pages/MyAnnouncementsPage";
import type { Car } from "./components/CarCard";
import type { Marca, Utilizador } from "./types";
import { getCurrentUser, setCurrentUser } from "./lib/auth";
import { initializeDatabase } from "./lib/database";
import { isVendedor } from "./lib/auth";

// Dados de Marcas
const marcas: Record<string, Marca> = {
  porsche: { id_marca: 1, nome: "Porsche", pais_origem: "Alemanha" },
  toyota: { id_marca: 2, nome: "Toyota", pais_origem: "Japão" },
  bmw: { id_marca: 3, nome: "BMW", pais_origem: "Alemanha" },
  tesla: { id_marca: 4, nome: "Tesla", pais_origem: "EUA" },
  ford: { id_marca: 5, nome: "Ford", pais_origem: "EUA" },
  mercedes: { id_marca: 6, nome: "Mercedes-Benz", pais_origem: "Alemanha" },
  chevrolet: { id_marca: 7, nome: "Chevrolet", pais_origem: "EUA" },
  volkswagen: { id_marca: 8, nome: "Volkswagen", pais_origem: "Alemanha" },
  honda: { id_marca: 9, nome: "Honda", pais_origem: "Japão" },
  audi: { id_marca: 10, nome: "Audi", pais_origem: "Alemanha" },
};

const mockCars: Car[] = [
  {
    id: 1,
    name: "Porsche 911 Carrera",
    marca: marcas.porsche,
    year: 2024,
    price: 78900,
    mileage: "0",
    fuel: "Gasolina",
    transmission: "Automática",
    image: "https://images.unsplash.com/photo-1742056024244-02a093dae0b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzYxMTM2MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "esportivo",
    isNew: true,
    color: "Vermelho",
    location: "Lisboa, Portugal",
    description: "Desportivo de luxo com performance excepcional",
  },
  {
    id: 2,
    name: "Toyota Corolla XEi",
    marca: marcas.toyota,
    year: 2023,
    price: 28500,
    mileage: "12000",
    fuel: "Híbrido",
    transmission: "Automática",
    image: "https://images.unsplash.com/photo-1648178326814-9a38f772c326?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NjEwNTQzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "sedan",
    isNew: false,
    color: "Prata",
    location: "Porto, Portugal",
    description: "Sedan confiável e económico",
  },
  {
    id: 3,
    name: "BMW X5 M Sport",
    marca: marcas.bmw,
    year: 2024,
    price: 48500,
    mileage: "0",
    fuel: "Gasolina",
    transmission: "Automática",
    image: "https://images.unsplash.com/photo-1654159866298-e3c8ee93e43b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXIlMjBzaG93cm9vbXxlbnwxfHx8fDE3NjExMzkyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "suv",
    isNew: true,
    color: "Preto",
    location: "Coimbra, Portugal",
    description: "SUV premium com tecnologia de ponta",
  },
  {
    id: 4,
    name: "Tesla Model 3",
    marca: marcas.tesla,
    year: 2024,
    price: 35000,
    mileage: "0",
    fuel: "Elétrico",
    transmission: "Automática",
    image: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhcnxlbnwxfHx8fDE3NjEwODcxNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "eletrico",
    isNew: true,
    color: "Branco",
    location: "Lisboa, Portugal",
    description: "Veículo elétrico com autonomia superior",
  },
  {
    id: 5,
    name: "Ford Ranger XLT",
    marca: marcas.ford,
    year: 2023,
    price: 32500,
    mileage: "8500",
    fuel: "Diesel",
    transmission: "Automática",
    image: "https://images.unsplash.com/photo-1649793395985-967862a3b73f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWNrdXAlMjB0cnVja3xlbnwxfHx8fDE3NjEwMzIzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "pickup",
    isNew: false,
    color: "Azul",
    location: "Braga, Portugal",
    description: "Pickup robusta para trabalho e lazer",
  },
  {
    id: 6,
    name: "Mercedes-Benz AMG GT",
    marca: marcas.mercedes,
    year: 2024,
    price: 95000,
    mileage: "0",
    fuel: "Gasolina",
    transmission: "Automática",
    image: "https://images.unsplash.com/photo-1656011475851-23f591606c0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb252ZXJ0aWJsZSUyMGNhcnxlbnwxfHx8fDE3NjEwNjI4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "esportivo",
    isNew: true,
    color: "Cinza",
    location: "Faro, Portugal",
    description: "Conversível de alto desempenho",
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [currentUser, setUser] = useState<Utilizador | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Car | null>(null);

  useEffect(() => {
    initializeDatabase();
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const handleLogin = (user: Utilizador) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("home");
  };

  const handleUpdateUser = (user: Utilizador) => {
    setCurrentUser(user);
    setUser(user);
  };

  const handleViewVehicle = (car: Car) => {
    setSelectedVehicle(car);
    setCurrentPage("vehicle-details");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== "login" && (
        <Header
          currentUser={currentUser}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "login" && (
        <LoginPage onLogin={handleLogin} onNavigate={setCurrentPage} />
      )}

      {currentPage === "home" && (
        <HomePage marcas={marcas} cars={mockCars} onNavigate={setCurrentPage} />
      )}

      {currentPage === "profile" && currentUser && (
        <ProfilePage user={currentUser} onUpdateUser={handleUpdateUser} />
      )}

      {currentPage === "create-announcement" && (
        <CreateAnnouncementPage onNavigate={setCurrentPage} marcas={marcas} currentUser={currentUser} />
      )}

      {currentPage === "reservations" && currentUser && (
        <>
          {isVendedor(currentUser) ? (
            <MyAnnouncementsPage onNavigate={setCurrentPage} currentUser={currentUser} />
          ) : (
            <ReservationsPage onNavigate={setCurrentPage} />
          )}
        </>
      )}

      {currentPage === "admin" && currentUser && (
        <AdminPage onNavigate={setCurrentPage} />
      )}

      {currentPage === "favorites" && currentUser && (
        <FavoritesPage cars={mockCars} onNavigate={setCurrentPage} />
      )}

      {currentPage === "vehicle-details" && selectedVehicle && (
        <VehicleDetailsPage car={selectedVehicle} onNavigate={setCurrentPage} />
      )}

      {currentPage === "sales" && currentUser && (
        <SalesPage onNavigate={setCurrentPage} />
      )}

      {currentPage === "reports" && (
        <ReportsPage onNavigate={setCurrentPage} currentUser={currentUser} />
      )}

      {currentPage === "my-reports" && currentUser && (
        <MyReportsPage onNavigate={setCurrentPage} currentUser={currentUser} />
      )}
    </div>
  );
}
