import { Search, TrendingUp, Shield, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="mb-6 text-white text-5xl md:text-6xl">
              Encontre o Automóvel Perfeito
            </h1>
            <p className="mb-8 text-xl text-white/90 max-w-2xl mx-auto">
              Milhares de veículos novos e usados das melhores marcas com garantia e financiamento facilitado
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl backdrop-blur">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                  <SelectItem value="volkswagen">Volkswagen</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                  <SelectItem value="audi">Audi</SelectItem>
                  <SelectItem value="porsche">Porsche</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="pickup">Pickup</SelectItem>
                  <SelectItem value="esportivo">Desportivo</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Preço máx." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-20k">Até €20.000</SelectItem>
                  <SelectItem value="20k-40k">€20.000 - €40.000</SelectItem>
                  <SelectItem value="40k-60k">€40.000 - €60.000</SelectItem>
                  <SelectItem value="60k+">Acima de €60.000</SelectItem>
                </SelectContent>
              </Select>

              <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-base">
                <Search className="mr-2 h-5 w-5" />
                Procurar
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16">
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 mb-2" />
              </div>
              <p className="text-3xl mb-1">500+</p>
              <p className="text-sm opacity-80">Veículos Disponíveis</p>
            </div>
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-8 w-8 mb-2" />
              </div>
              <p className="text-3xl mb-1">100%</p>
              <p className="text-sm opacity-80">Garantia de Qualidade</p>
            </div>
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-8 w-8 mb-2" />
              </div>
              <p className="text-3xl mb-1">5000+</p>
              <p className="text-sm opacity-80">Clientes Satisfeitos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
