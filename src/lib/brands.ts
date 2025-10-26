// Marcas de automóveis com logotipos
export const carBrands = {
  bmw: {
    id: 1,
    name: "BMW",
    logo: "https://www.carlogos.org/car-logos/bmw-logo.png",
  },
  mercedes: {
    id: 2,
    name: "Mercedes-Benz",
    logo: "https://www.carlogos.org/car-logos/mercedes-benz-logo.png",
  },
  audi: {
    id: 3,
    name: "Audi",
    logo: "https://www.carlogos.org/car-logos/audi-logo.png",
  },
  volkswagen: {
    id: 4,
    name: "Volkswagen",
    logo: "https://www.carlogos.org/car-logos/volkswagen-logo.png",
  },
  porsche: {
    id: 5,
    name: "Porsche",
    logo: "https://www.carlogos.org/car-logos/porsche-logo.png",
  },
  tesla: {
    id: 6,
    name: "Tesla",
    logo: "https://www.carlogos.org/car-logos/tesla-logo.png",
  },
  toyota: {
    id: 7,
    name: "Toyota",
    logo: "https://www.carlogos.org/car-logos/toyota-logo.png",
  },
  honda: {
    id: 8,
    name: "Honda",
    logo: "https://www.carlogos.org/car-logos/honda-logo.png",
  },
  ford: {
    id: 9,
    name: "Ford",
    logo: "https://www.carlogos.org/car-logos/ford-logo.png",
  },
  peugeot: {
    id: 10,
    name: "Peugeot",
    logo: "https://www.carlogos.org/car-logos/peugeot-logo.png",
  },
  renault: {
    id: 11,
    name: "Renault",
    logo: "https://www.carlogos.org/car-logos/renault-logo.png",
  },
  citroen: {
    id: 12,
    name: "Citroën",
    logo: "https://www.carlogos.org/car-logos/citroen-logo.png",
  },
  opel: {
    id: 13,
    name: "Opel",
    logo: "https://www.carlogos.org/car-logos/opel-logo.png",
  },
  seat: {
    id: 14,
    name: "SEAT",
    logo: "https://www.carlogos.org/car-logos/seat-logo.png",
  },
  skoda: {
    id: 15,
    name: "Škoda",
    logo: "https://www.carlogos.org/car-logos/skoda-logo.png",
  },
  volvo: {
    id: 16,
    name: "Volvo",
    logo: "https://www.carlogos.org/car-logos/volvo-logo.png",
  },
  nissan: {
    id: 17,
    name: "Nissan",
    logo: "https://www.carlogos.org/car-logos/nissan-logo.png",
  },
  hyundai: {
    id: 18,
    name: "Hyundai",
    logo: "https://www.carlogos.org/car-logos/hyundai-logo.png",
  },
  kia: {
    id: 19,
    name: "Kia",
    logo: "https://www.carlogos.org/car-logos/kia-logo.png",
  },
  mazda: {
    id: 20,
    name: "Mazda",
    logo: "https://www.carlogos.org/car-logos/mazda-logo.png",
  },
};

// Cidades principais de Portugal com coordenadas
export const portugueseCities = [
  { name: "Lisboa", lat: 38.7223, lng: -9.1393 },
  { name: "Porto", lat: 41.1579, lng: -8.6291 },
  { name: "Braga", lat: 41.5454, lng: -8.4265 },
  { name: "Coimbra", lat: 40.2033, lng: -8.4103 },
  { name: "Faro", lat: 37.0194, lng: -7.9322 },
  { name: "Setúbal", lat: 38.5244, lng: -8.8882 },
  { name: "Aveiro", lat: 40.6443, lng: -8.6455 },
  { name: "Évora", lat: 38.5667, lng: -7.9 },
  { name: "Viseu", lat: 40.6566, lng: -7.9122 },
  { name: "Leiria", lat: 39.7437, lng: -8.8071 },
  { name: "Guimarães", lat: 41.4416, lng: -8.2918 },
  { name: "Funchal", lat: 32.6669, lng: -16.9241 },
  { name: "Ponta Delgada", lat: 37.7412, lng: -25.6756 },
];

// Função para calcular distância entre duas coordenadas (fórmula de Haversine)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Raio da Terra em km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance);
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}
