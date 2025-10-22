import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { AlertCircle, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import { formatDateTime } from "../lib/format";
import type { Denuncia, Utilizador } from "../types";
import { getAllDenuncias } from "../lib/database";

interface MyReportsPageProps {
  onNavigate: (page: string) => void;
  currentUser: Utilizador;
}

export function MyReportsPage({ onNavigate, currentUser }: MyReportsPageProps) {
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);

  useEffect(() => {
    const allDenuncias = getAllDenuncias();
    const userDenuncias = allDenuncias.filter(d => d.id_utilizador === currentUser.id_utilizador);
    setDenuncias(userDenuncias);
  }, [currentUser]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge className="bg-yellow-600"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      case "em_analise":
        return <Badge className="bg-blue-600"><AlertCircle className="h-3 w-3 mr-1" />Em Análise</Badge>;
      case "resolvida":
        return <Badge className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Resolvida</Badge>;
      case "rejeitada":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejeitada</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTipoDenunciaLabel = (tipo: string) => {
    switch (tipo) {
      case "anuncio_fraudulento": return "Anúncio Fraudulento";
      case "conteudo_inapropriado": return "Conteúdo Inapropriado";
      case "preco_suspeito": return "Preço Suspeito";
      case "veiculo_nao_existe": return "Veículo Não Existe";
      case "outro": return "Outro";
      default: return tipo;
    }
  };

  const pendentes = denuncias.filter(d => d.status === "pendente" || d.status === "em_analise");
  const resolvidas = denuncias.filter(d => d.status === "resolvida" || d.status === "rejeitada");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Minhas Denúncias</h1>
            <p className="text-gray-600">Acompanhe o estado das suas denúncias</p>
          </div>
          <Button onClick={() => onNavigate("reports")} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Nova Denúncia
          </Button>
        </div>

        <Tabs defaultValue="pendentes">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="pendentes">
              Em Andamento ({pendentes.length})
            </TabsTrigger>
            <TabsTrigger value="resolvidas">
              Resolvidas ({resolvidas.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pendentes" className="mt-6">
            {pendentes.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Não tem denúncias em andamento</p>
                  <Button onClick={() => onNavigate("reports")} variant="outline">
                    Criar Denúncia
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendentes.map((denuncia) => (
                  <Card key={denuncia.id_denuncia}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg">{getTipoDenunciaLabel(denuncia.tipo)}</h3>
                            {getStatusBadge(denuncia.status)}
                          </div>
                          <p className="text-sm text-gray-600">
                            Denúncia #{denuncia.id_denuncia}
                            {denuncia.id_anuncio && ` • Anúncio #${denuncia.id_anuncio}`}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-700">{denuncia.descricao}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Enviada em {formatDateTime(denuncia.data_denuncia)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="resolvidas" className="mt-6">
            {resolvidas.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-600">Nenhuma denúncia resolvida</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {resolvidas.map((denuncia) => (
                  <Card key={denuncia.id_denuncia}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg">{getTipoDenunciaLabel(denuncia.tipo)}</h3>
                            {getStatusBadge(denuncia.status)}
                          </div>
                          <p className="text-sm text-gray-600">
                            Denúncia #{denuncia.id_denuncia}
                            {denuncia.id_anuncio && ` • Anúncio #${denuncia.id_anuncio}`}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-700">{denuncia.descricao}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Enviada em {formatDateTime(denuncia.data_denuncia)}</span>
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
