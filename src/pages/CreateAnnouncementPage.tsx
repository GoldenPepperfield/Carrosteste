import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { ArrowLeft, Upload, Plus, X, CheckCircle, AlertCircle } from "lucide-react";
import type { Marca, Utilizador, Anuncio } from "../types";
import { saveAnuncio, generateAnuncioId } from "../lib/database";
import { isVendedor } from "../lib/auth";

interface CreateAnnouncementPageProps {
  onNavigate: (page: string) => void;
  marcas: Record<string, Marca>;
  currentUser: Utilizador | null;
}

export function CreateAnnouncementPage({ onNavigate, marcas, currentUser }: CreateAnnouncementPageProps) {
  // Verificar se o utilizador é vendedor
  if (!currentUser || !isVendedor(currentUser)) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="mb-2">Acesso Restrito</h3>
              <p className="text-gray-600 mb-6">
                Apenas vendedores podem criar anúncios. Por favor, faça login com uma conta de vendedor.
              </p>
              <Button onClick={() => onNavigate("login")} className="bg-blue-600 hover:bg-blue-700">
                Fazer Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  const [titulo, setTitulo] = useState("");
  const [marcaId, setMarcaId] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [preco, setPreco] = useState("");
  const [quilometragem, setQuilometragem] = useState("");
  const [combustivel, setCombustivel] = useState("");
  const [cambio, setCambio] = useState("");
  const [cor, setCor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [condicao, setCondicao] = useState<"novo" | "usado">("usado");
  const [localizacao, setLocalizacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (imagens.length < 1) {
      setError("Por favor, adicione pelo menos 1 imagem do veículo");
      return;
    }

    if (!currentUser) {
      setError("Precisa de estar autenticado");
      return;
    }

    // Criar novo anúncio
    const novoAnuncio: Anuncio = {
      id_anuncio: generateAnuncioId(),
      id_vendedor: currentUser.id_utilizador,
      id_veiculo: Math.floor(Math.random() * 10000), // Mock - seria o ID do veículo criado
      titulo,
      status: "ativo",
      data_publicacao: new Date(),
      visualizacoes: 0,
    };

    saveAnuncio(novoAnuncio);
    
    setSuccess(true);
    
    setTimeout(() => {
      onNavigate("reservations");
    }, 2000);
  };

  const handleImageUpload = () => {
    // Mock image upload - simula upload de uma imagem
    const mockImages = [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400",
      "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400",
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setImagens([...imagens, randomImage]);
  };

  const removeImage = (index: number) => {
    setImagens(imagens.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => onNavigate("home")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="mb-8">
          <h1 className="mb-2">Criar Anúncio</h1>
          <p className="text-gray-600">Publique o seu veículo na plataforma</p>
        </div>

        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Anúncio criado com sucesso! A redirecionar...
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Dados principais do veículo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título do Anúncio</Label>
                <Input
                  id="titulo"
                  placeholder="Ex: BMW X5 M Sport - Como Novo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marca">Marca</Label>
                  <Select value={marcaId} onValueChange={setMarcaId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(marcas).map(([key, marca]) => (
                        <SelectItem key={key} value={key}>
                          {marca.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modelo">Modelo</Label>
                  <Input
                    id="modelo"
                    placeholder="Ex: X5"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ano">Ano</Label>
                  <Input
                    id="ano"
                    type="number"
                    placeholder="2024"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preco">Preço (€)</Label>
                  <Input
                    id="preco"
                    type="number"
                    placeholder="25000"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quilometragem">Quilómetros</Label>
                  <Input
                    id="quilometragem"
                    placeholder="50000"
                    value={quilometragem}
                    onChange={(e) => setQuilometragem(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="combustivel">Combustível</Label>
                  <Select value={combustivel} onValueChange={setCombustivel} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gasolina">Gasolina</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Elétrico">Elétrico</SelectItem>
                      <SelectItem value="Híbrido">Híbrido</SelectItem>
                      <SelectItem value="GPL">GPL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cambio">Caixa de Velocidades</Label>
                  <Select value={cambio} onValueChange={setCambio} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Automática">Automática</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cor">Cor</Label>
                  <Input
                    id="cor"
                    placeholder="Ex: Preto"
                    value={cor}
                    onChange={(e) => setCor(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select value={categoria} onValueChange={setCategoria} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                      <SelectItem value="pickup">Pickup</SelectItem>
                      <SelectItem value="esportivo">Desportivo</SelectItem>
                      <SelectItem value="eletrico">Elétrico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condicao">Condição</Label>
                  <Select value={condicao} onValueChange={(v) => setCondicao(v as "novo" | "usado")} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="novo">Novo</SelectItem>
                      <SelectItem value="usado">Usado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="localizacao">Localização</Label>
                <Input
                  id="localizacao"
                  placeholder="Ex: Lisboa, Portugal"
                  value={localizacao}
                  onChange={(e) => setLocalizacao(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva o veículo, equipamentos, histórico de manutenção, etc."
                  rows={5}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fotografias</CardTitle>
              <CardDescription>
                Adicione imagens do veículo (mínimo 1, recomendado 4+)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {imagens.map((img, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={img}
                      alt={`Imagem ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-600 transition-colors"
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Adicionar</span>
                </button>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onNavigate("home")}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Publicar Anúncio
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
