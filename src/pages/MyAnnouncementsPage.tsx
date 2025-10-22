import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { formatCurrency, formatDate } from "../lib/format";
import type { Anuncio, Utilizador } from "../types";
import { getAnunciosByVendedor, deleteAnuncio } from "../lib/database";

interface MyAnnouncementsPageProps {
  onNavigate: (page: string) => void;
  currentUser: Utilizador;
}

export function MyAnnouncementsPage({ onNavigate, currentUser }: MyAnnouncementsPageProps) {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);

  useEffect(() => {
    loadAnuncios();
  }, [currentUser]);

  const loadAnuncios = () => {
    const vendedorAnuncios = getAnunciosByVendedor(currentUser.id_utilizador);
    setAnuncios(vendedorAnuncios);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja eliminar este anúncio?")) {
      deleteAnuncio(id);
      loadAnuncios();
    }
  };

  const ativos = anuncios.filter(a => a.status === "ativo");
  const inativos = anuncios.filter(a => a.status !== "ativo");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-green-600">Ativo</Badge>;
      case "vendido":
        return <Badge className="bg-blue-600">Vendido</Badge>;
      case "reservado":
        return <Badge className="bg-yellow-600">Reservado</Badge>;
      case "inativo":
        return <Badge variant="secondary">Inativo</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Meus Anúncios</h1>
            <p className="text-gray-600">Gerir os seus anúncios de veículos</p>
          </div>
          <Button onClick={() => onNavigate("create-announcement")} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Novo Anúncio
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total de Anúncios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">{anuncios.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Anúncios Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-green-600">{ativos.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total de Visualizações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">
                {anuncios.reduce((sum, a) => sum + (a.visualizacoes || 0), 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="ativos">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="ativos">
              Ativos ({ativos.length})
            </TabsTrigger>
            <TabsTrigger value="outros">
              Outros ({inativos.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ativos" className="mt-6">
            {ativos.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-600 mb-4">Não tem anúncios ativos</p>
                  <Button onClick={() => onNavigate("create-announcement")} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Primeiro Anúncio
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ativos.map((anuncio) => (
                  <Card key={anuncio.id_anuncio}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg flex-1 mr-2">{anuncio.titulo}</h3>
                        {getStatusBadge(anuncio.status)}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">ID do Anúncio:</span>
                          <span>#{anuncio.id_anuncio}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Publicado:</span>
                          <span>{formatDate(anuncio.data_publicacao)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Visualizações:</span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {anuncio.visualizacoes || 0}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(anuncio.id_anuncio)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="outros" className="mt-6">
            {inativos.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-600">Nenhum anúncio inativo</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inativos.map((anuncio) => (
                  <Card key={anuncio.id_anuncio}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg flex-1 mr-2">{anuncio.titulo}</h3>
                        {getStatusBadge(anuncio.status)}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">ID do Anúncio:</span>
                          <span>#{anuncio.id_anuncio}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Publicado:</span>
                          <span>{formatDate(anuncio.data_publicacao)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Visualizações:</span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {anuncio.visualizacoes || 0}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(anuncio.id_anuncio)}
                          className="flex-1"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
