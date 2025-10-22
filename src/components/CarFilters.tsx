import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { Marca } from "../types";

interface CarFiltersProps {
  priceRange: number[];
  onPriceChange: (value: number[]) => void;
  selectedTypes: string[];
  onTypeChange: (type: string) => void;
  selectedBrands: number[];
  onBrandChange: (brandId: number) => void;
  selectedFuels: string[];
  onFuelChange: (fuel: string) => void;
  selectedCondition: string;
  onConditionChange: (condition: string) => void;
  yearRange: number[];
  onYearChange: (value: number[]) => void;
  onReset: () => void;
  marcas: Record<string, Marca>;
}

export function CarFilters({
  priceRange,
  onPriceChange,
  selectedTypes,
  onTypeChange,
  selectedBrands,
  onBrandChange,
  selectedFuels,
  onFuelChange,
  selectedCondition,
  onConditionChange,
  yearRange,
  onYearChange,
  onReset,
  marcas,
}: CarFiltersProps) {
  const carTypes = [
    { id: "sedan", label: "Sedan" },
    { id: "suv", label: "SUV" },
    { id: "hatchback", label: "Hatchback" },
    { id: "pickup", label: "Pickup" },
    { id: "esportivo", label: "Desportivo" },
    { id: "eletrico", label: "Elétrico" },
  ];

  const fuelTypes = [
    { id: "Gasolina", label: "Gasolina" },
    { id: "Diesel", label: "Diesel" },
    { id: "Elétrico", label: "Elétrico" },
    { id: "Híbrido", label: "Híbrido" },
    { id: "GPL", label: "GPL" },
  ];

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6 sticky top-20">
      <div>
        <h3 className="mb-4">Filtros</h3>

        {/* Condition */}
        <div className="space-y-2 mb-6">
          <Label>Condição</Label>
          <Select value={selectedCondition} onValueChange={onConditionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="novo">Novos</SelectItem>
              <SelectItem value="usado">Usados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-4 mb-6">
          <Label>Faixa de Preço</Label>
          <div className="pt-2">
            <Slider
              min={0}
              max={100000}
              step={5000}
              value={priceRange}
              onValueChange={onPriceChange}
              className="mb-2"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>€{priceRange[0].toLocaleString()}</span>
            <span>€{priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Year Range */}
        <div className="space-y-4 mb-6">
          <Label>Ano</Label>
          <div className="pt-2">
            <Slider
              min={2010}
              max={2025}
              step={1}
              value={yearRange}
              onValueChange={onYearChange}
              className="mb-2"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{yearRange[0]}</span>
            <span>{yearRange[1]}</span>
          </div>
        </div>

        {/* Brands */}
        <div className="space-y-3 mb-6">
          <Label>Marca</Label>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {Object.entries(marcas).map(([key, marca]) => (
              <div key={marca.id_marca} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${marca.id_marca}`}
                  checked={selectedBrands.includes(marca.id_marca)}
                  onCheckedChange={() => onBrandChange(marca.id_marca)}
                />
                <label
                  htmlFor={`brand-${marca.id_marca}`}
                  className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {marca.nome}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Car Type */}
        <div className="space-y-3 mb-6">
          <Label>Tipo de Veículo</Label>
          {carTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={selectedTypes.includes(type.id)}
                onCheckedChange={() => onTypeChange(type.id)}
              />
              <label
                htmlFor={type.id}
                className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type.label}
              </label>
            </div>
          ))}
        </div>

        {/* Fuel Type */}
        <div className="space-y-3 mb-6">
          <Label>Combustível</Label>
          {fuelTypes.map((fuel) => (
            <div key={fuel.id} className="flex items-center space-x-2">
              <Checkbox
                id={fuel.id}
                checked={selectedFuels.includes(fuel.id)}
                onCheckedChange={() => onFuelChange(fuel.id)}
              />
              <label
                htmlFor={fuel.id}
                className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {fuel.label}
              </label>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full" onClick={onReset}>
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
}
