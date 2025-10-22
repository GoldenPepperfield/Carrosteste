import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { User, Mail, Phone, MapPin, FileText, Heart, ShoppingBag, Settings } from "lucide-react";
import type { Utilizador, Vendedor, Comprador } from "../types";
import { isVendedor } from "../lib/auth";

interface ProfilePageProps {
  user: Utilizador;
  onUpdateUser: (user: Utilizador) => void;
}

export function ProfilePage({ user, onUpdateUser }: ProfilePageProps) {
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [telefone, setTelefone] = useState((user as Vendedor).telefone || "");
  const [morada, setMorada] = useState((user as Vendedor).morada || "");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedUser = {
      ...user,
      nome,
      email,
      ...(isVendedor(user) && {
        telefone,
        morada,
      }),
    };
    
    onUpdateUser(updatedUser);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">A Minha Conta</h1>
          <p className="text-gray-600">Gerir as suas informações pessoais e preferências</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.fotografia} />
                    <AvatarFallback className="text-xl">
                      {getInitials(user.nome)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mb-1">{user.nome}</h3>
                  <p className="text-sm text-gray-600 mb-3">{user.email}</p>
                  <Badge variant={user.tipo === "vendedor" ? "default" : "secondary"}>
                    {user.tipo === "vendedor" ? "Vendedor" : "Comprador"}
                  </Badge>
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Informações Pessoais
                  </Button>
                  {user.tipo === "comprador" && (
                    <Button variant="ghost" className="w-full justify-start">
                      <Heart className="mr-2 h-4 w-4" />
                      Favoritos
                    </Button>
                  )}
                  <Button variant="ghost" className="w-full justify-start">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    {user.tipo === "vendedor" ? "Meus Anúncios" : "Minhas Reservas"}
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Definições
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="security">Segurança</TabsTrigger>
              </TabsList>

              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>
                      Atualize os seus dados pessoais
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSave} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="nome"
                            className="pl-10"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      {isVendedor(user) && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="telefone">Telefone</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="telefone"
                                className="pl-10"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="morada">Morada</Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="morada"
                                className="pl-10"
                                value={morada}
                                onChange={(e) => setMorada(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="nif">NIF</Label>
                            <div className="relative">
                              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="nif"
                                value={(user as Vendedor).NIF}
                                disabled
                                className="pl-10 bg-gray-50"
                              />
                            </div>
                            <p className="text-xs text-gray-500">
                              O NIF não pode ser alterado
                            </p>
                          </div>
                        </>
                      )}

                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Guardar alterações
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança da Conta</CardTitle>
                    <CardDescription>
                      Altere a sua palavra-passe e configurações de segurança
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Palavra-passe atual</Label>
                      <Input id="current-password" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova palavra-passe</Label>
                      <Input id="new-password" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar palavra-passe</Label>
                      <Input id="confirm-password" type="password" />
                    </div>

                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Atualizar palavra-passe
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
