import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Calendar, CheckCircle, TrendingUp, DollarSign } from "lucide-react";
import { formatCurrency, formatDateTime } from "../lib/format";
import type { Venda } from "../types";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface SalesPageProps {
  onNavigate: (page: string) => void;
}

export function SalesPage({ onNavigate }: SalesPageProps) {
  const mockVendas: (Venda & { 
    veiculo_nome: string;
    veiculo_imagem: string;
    comprador_nome: string;
  })[] = [
    {
      id_venda: 1,
      id_comprador: 2,
      id_vendedor: 1,
      id_veiculo: 1,
      data_venda: new Date("2025-10-15"),
      valor_final: 48500,
      forma_pagamento: "Transferência Bancária",
      veiculo_nome: "BMW X5 M Sport",
      veiculo_imagem: "https://images.unsplash.com/photo-1654159866298-e3c8ee93e43b?w=400",
      comprador_nome: "João Silva",
    },
    {
      id_venda: 2,
      id_comprador: 3,
      id_vendedor: 1,
      id_veiculo: 4,
      data_venda: new Date("2025-10-10"),
      valor_final: 35000,
      forma_pagamento: "Financiamento",
      veiculo_nome: "Tesla Model 3",
      veiculo_imagem: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=400",
      comprador_nome: "Maria Santos",
    },
  ];

  const totalVendas = mockVendas.reduce((sum, venda) => sum + venda.valor_final, 0);
  const mesAtual = mockVendas.filter(v => 
    v.data_venda.getMonth() === new Date().getMonth()
  ).length;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">Minhas Vendas</h1>
          <p className="text-gray-600">Histórico de vendas realizadas</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Total de Vendas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">{mockVendas.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                Valor Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">{formatCurrency(totalVendas)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                Vendas Este Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">{mesAtual}</p>
            </CardContent>
          </Card>
        </div>

        {/* Sales List */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            {mockVendas.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Ainda não realizou nenhuma venda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mockVendas.map((venda) => (
                  <div key={venda.id_venda} className="flex flex-col md:flex-row gap-6 p-6 border rounded-lg hover:border-blue-600 transition-colors">
                    <ImageWithFallback
                      src={venda.veiculo_imagem}
                      alt={venda.veiculo_nome}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="mb-1">{venda.veiculo_nome}</h3>
                          <p className="text-sm text-gray-600">
                            Comprador: {venda.comprador_nome}
                          </p>
                        </div>
                        <Badge className="bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Concluída
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-gray-600">Valor da Venda</p>
                          <p className="text-lg text-blue-600">{formatCurrency(venda.valor_final)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Data da Venda</p>
                          <p className="text-sm">{formatDateTime(venda.data_venda)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Pagamento</p>
                          <p className="text-sm">{venda.forma_pagamento}</p>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <Button size="sm" variant="outline">
                          Ver Detalhes
                        </Button>
                        <Button size="sm" variant="outline">
                          Imprimir Recibo
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
