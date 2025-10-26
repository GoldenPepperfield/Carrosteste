import { carBrands } from "../lib/brands";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BrandSelectorProps {
  selectedBrands: string[];
  onBrandToggle: (brandKey: string) => void;
}

export function BrandSelector({ selectedBrands, onBrandToggle }: BrandSelectorProps) {
  // Marcas populares para mostrar em destaque
  const popularBrands = ["bmw", "mercedes", "audi", "volkswagen", "porsche", "tesla", "renault", "peugeot"];

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="mb-2">Procurar por Marca</h2>
          <p className="text-gray-600">Selecione as suas marcas favoritas</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {popularBrands.map((brandKey) => {
            const brand = carBrands[brandKey as keyof typeof carBrands];
            const isSelected = selectedBrands.includes(brandKey);
            
            return (
              <button
                key={brandKey}
                onClick={() => onBrandToggle(brandKey)}
                className={`
                  bg-white rounded-xl p-4 transition-all duration-200
                  hover:shadow-lg hover:-translate-y-1
                  ${isSelected ? 'ring-2 ring-blue-600 shadow-lg' : 'shadow border border-gray-200'}
                `}
              >
                <div className="aspect-square flex items-center justify-center mb-2">
                  <ImageWithFallback
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <p className="text-xs text-center text-gray-700">{brand.name}</p>
              </button>
            );
          })}
        </div>

        {selectedBrands.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {selectedBrands.length} {selectedBrands.length === 1 ? "marca selecionada" : "marcas selecionadas"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
