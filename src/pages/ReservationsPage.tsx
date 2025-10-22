import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { formatCurrency, formatDateTime } from "../lib/format";
import type { Reserva } from "../types";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface ReservationsPageProps {
  onNavigate: (page: string) => void;
}

export function ReservationsPage({ onNavigate }: ReservationsPageProps) {
  const mockReservas: (Reserva & { 
    veiculo_nome: string;
    veiculo_imagem: string;
    veiculo_preco: number;
  })[] = [
    {
      id_reserva: 1,
      id_comprador: 1,
      id_anuncio: 1,
      data_reserva: new Date("2025-10-20"),
      estado_reserva: "confirmada",
      data_expiracao: new Date("2025-10-27"),
      veiculo_nome: "BMW X5 M Sport",
      veiculo_imagem: "https://images.unsplash.com/photo-1654159866298-e3c8ee93e43b?w=400",
      veiculo_preco: 48500,
    },
    {
      id_reserva: 2,
      id_comprador: 1,
      id_anuncio: 2,
      data_reserva: new Date("2025-10-15"),
      estado_reserva: "pendente",
      data_expiracao: new Date("2025-10-22"),
      veiculo_nome: "Tesla Model 3",
      veiculo_imagem: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=400",
      veiculo_preco: 35000,
    },
    {
      id_reserva: 3,
      id_comprador: 1,
      id_anuncio: 3,
      data_reserva: new Date("2025-10-10"),
      estado_reserva: "cancelada",
      veiculo_nome: "Toyota Corolla XEi",
      veiculo_imagem: "https://images.unsplash.com/photo-1648178326814-9a38f772c326?w=400",
      veiculo_preco: 12500,
    },
  ];

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "confirmada":
        return <Badge className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Confirmada</Badge>;
      case "pendente":
        return <Badge className="bg-yellow-600"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      case "cancelada":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Cancelada</Badge>;
      case "expirada":
        return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" />Expirada</Badge>;
      default:
        return <Badge>{estado}</Badge>;
    }
  };

  const ativas = mockReservas.filter(r => r.estado_reserva === "confirmada" || r.estado_reserva === "pendente");
  const historico = mockReservas.filter(r => r.estado_reserva === "cancelada" || r.estado_reserva === "expirada");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">Minhas Reservas</h1>
          <p className="text-gray-600">Gerir as suas reservas de veículos</p>
        </div>

        <Tabs defaultValue="ativas">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="ativas">
              Ativas ({ativas.length})
            </TabsTrigger>
            <TabsTrigger value="historico">
              Histórico ({historico.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ativas" className="mt-6">
            {ativas.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Não tem reservas ativas</p>
                  <Button onClick={() => onNavigate("home")} className="bg-blue-600 hover:bg-blue-700">
                    Explorar Veículos
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {ativas.map((reserva) => (
                  <Card key={reserva.id_reserva}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <ImageWithFallback
                          src={reserva.veiculo_imagem}
                          alt={reserva.veiculo_nome}
                          className="w-full md:w-48 h-32 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="mb-1">{reserva.veiculo_nome}</h3>
                              <p className="text-xl text-blue-600">
                                {formatCurrency(reserva.veiculo_preco)}
                              </p>
                            </div>
                            {getStatusBadge(reserva.estado_reserva)}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>Reservado em: {formatDateTime(reserva.data_reserva)}</span>
                            </div>
                            {reserva.data_expiracao && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>Expira em: {formatDateTime(reserva.data_expiracao)}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-3 mt-4">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              Ver Detalhes
                            </Button>
                            <Button variant="outline">
                              Contactar Vendedor
                            </Button>
                            {reserva.estado_reserva === "pendente" && (
                              <Button variant="destructive">
                                Cancelar Reserva
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="historico" className="mt-6">
            {historico.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-600">Sem histórico de reservas</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {historico.map((reserva) => (
                  <Card key={reserva.id_reserva}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <ImageWithFallback
                          src={reserva.veiculo_imagem}
                          alt={reserva.veiculo_nome}
                          className="w-full md:w-48 h-32 object-cover rounded-lg opacity-75"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="mb-1">{reserva.veiculo_nome}</h3>
                              <p className="text-xl text-gray-600">
                                {formatCurrency(reserva.veiculo_preco)}
                              </p>
                            </div>
                            {getStatusBadge(reserva.estado_reserva)}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                            <Calendar className="h-4 w-4" />
                            <span>Reservado em: {formatDateTime(reserva.data_reserva)}</span>
                          </div>
                        </div>
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
