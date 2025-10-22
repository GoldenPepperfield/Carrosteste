import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Users,
  Car,
  FileText,
  TrendingUp,
  Search,
  Trash2,
  Ban,
} from "lucide-react";
import { formatCurrency, formatDate } from "../lib/format";
import type { Denuncia, Anuncio, Utilizador } from "../types";
import { getAllDenuncias, updateDenunciaStatus, getAllUsers, deleteUser, getAllAnuncios } from "../lib/database";

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export function AdminPage({ onNavigate }: AdminPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [utilizadores, setUtilizadores] = useState<Utilizador[]>([]);
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setDenuncias(getAllDenuncias());
    setUtilizadores(getAllUsers());
    setAnuncios(getAllAnuncios());
  };

  const handleApproveDenuncia = (id: number) => {
    updateDenunciaStatus(id, "resolvida");
    loadData();
  };

  const handleRejectDenuncia = (id: number) => {
    updateDenunciaStatus(id, "rejeitada");
    loadData();
  };

  const handleDeleteUser = (id: number) => {
    if (confirm("Tem certeza que deseja eliminar este utilizador?")) {
      deleteUser(id);
      loadData();
    }
  };

  const stats = {
    totalUtilizadores: utilizadores.length,
    totalAnuncios: anuncios.length,
    denunciasPendentes: denuncias.filter(d => d.status === "pendente").length,
    vendasMes: 0,
  };

  const getStatusDenunciaBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge className="bg-yellow-600"><AlertCircle className="h-3 w-3 mr-1" />Pendente</Badge>;
      case "em_analise":
        return <Badge className="bg-blue-600"><Search className="h-3 w-3 mr-1" />Em Análise</Badge>;
      case "resolvida":
        return <Badge className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Resolvida</Badge>;
      case "rejeitada":
        return <Badge variant="secondary"><XCircle className="h-3 w-3 mr-1" />Rejeitada</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTipoDenunciaLabel = (tipo: string) => {
    switch (tipo) {
      case "anuncio_fraudulento": return "Anúncio Fraudulento";
      case "conteudo_inapropriado": return "Conteúdo Inapropriado";
      case "preco_suspeito": return "Preço Suspeito";
      case "outro": return "Outro";
      default: return tipo;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">Painel de Administração</h1>
          <p className="text-gray-600">Gerir utilizadores, anúncios e denúncias</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                Total de Utilizadores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">{stats.totalUtilizadores}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Car className="h-4 w-4 text-green-600" />
                Anúncios Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">{stats.totalAnuncios}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                Denúncias Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">{stats.denunciasPendentes}</p>
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
              <p className="text-3xl">{stats.vendasMes}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="denuncias">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="denuncias">Denúncias</TabsTrigger>
            <TabsTrigger value="anuncios">Anúncios</TabsTrigger>
            <TabsTrigger value="utilizadores">Utilizadores</TabsTrigger>
          </TabsList>

          <TabsContent value="denuncias" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Denúncias</CardTitle>
                <CardDescription>Gerir denúncias de utilizadores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Procurar denúncias..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Anúncio</TableHead>
                        <TableHead>Denunciante</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {denuncias.map((denuncia) => {
                        const user = utilizadores.find(u => u.id_utilizador === denuncia.id_utilizador);
                        return (
                          <TableRow key={denuncia.id_denuncia}>
                            <TableCell>#{denuncia.id_denuncia}</TableCell>
                            <TableCell>{getTipoDenunciaLabel(denuncia.tipo)}</TableCell>
                            <TableCell>{denuncia.id_anuncio ? `#${denuncia.id_anuncio}` : "-"}</TableCell>
                            <TableCell>{user?.nome || "Desconhecido"}</TableCell>
                            <TableCell>{formatDate(denuncia.data_denuncia)}</TableCell>
                            <TableCell>{getStatusDenunciaBadge(denuncia.status)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {denuncia.status === "pendente" && (
                                  <>
                                    <Button 
                                      size="sm" 
                                      className="bg-green-600 hover:bg-green-700"
                                      onClick={() => handleApproveDenuncia(denuncia.id_denuncia)}
                                    >
                                      <CheckCircle className="h-3 w-3" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="destructive"
                                      onClick={() => handleRejectDenuncia(denuncia.id_denuncia)}
                                    >
                                      <XCircle className="h-3 w-3" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="anuncios" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Anúncios</CardTitle>
                <CardDescription>Gerir todos os anúncios da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Procurar anúncios..." className="pl-10" />
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Vendedor</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Visualizações</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {anuncios.map((anuncio) => (
                        <TableRow key={anuncio.id_anuncio}>
                          <TableCell>#{anuncio.id_anuncio}</TableCell>
                          <TableCell>{anuncio.titulo}</TableCell>
                          <TableCell>ID: {anuncio.id_vendedor}</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>{anuncio.visualizacoes || 0}</TableCell>
                          <TableCell>{formatDate(anuncio.data_publicacao)}</TableCell>
                          <TableCell>
                            <Badge className={anuncio.status === "ativo" ? "bg-green-600" : "bg-gray-600"}>
                              {anuncio.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">Ver</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="utilizadores" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Utilizadores</CardTitle>
                <CardDescription>Gerir utilizadores da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Procurar utilizadores..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {utilizadores
                        .filter(u => 
                          u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((user) => (
                          <TableRow key={user.id_utilizador}>
                            <TableCell>#{user.id_utilizador}</TableCell>
                            <TableCell>{user.nome}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant={
                                user.tipo === "administrador" ? "default" :
                                user.tipo === "vendedor" ? "secondary" : "outline"
                              }>
                                {user.tipo}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {user.tipo !== "administrador" && (
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => handleDeleteUser(user.id_utilizador)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
