import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Car, Mail, Lock, User, Phone, MapPin, FileText, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import type { Utilizador, Vendedor, Comprador } from "../types";
import { setCurrentUser } from "../lib/auth";
import { getUserByEmail, saveUser, generateUserId } from "../lib/database";

interface LoginPageProps {
  onLogin: (user: Utilizador) => void;
  onNavigate: (page: string) => void;
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [registoNome, setRegistoNome] = useState("");
  const [registoEmail, setRegistoEmail] = useState("");
  const [registoPassword, setRegistoPassword] = useState("");
  const [registoConfirmPassword, setRegistoConfirmPassword] = useState("");
  const [registoTipo, setRegistoTipo] = useState<"comprador" | "vendedor">("comprador");
  const [registoTelefone, setRegistoTelefone] = useState("");
  const [registoMorada, setRegistoMorada] = useState("");
  const [registoNIF, setRegistoNIF] = useState("");
  const [registoError, setRegistoError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    const user = getUserByEmail(loginEmail);
    
    if (!user) {
      setLoginError("Email não encontrado");
      return;
    }
    
    if (user.password !== loginPassword) {
      setLoginError("Palavra-passe incorreta");
      return;
    }
    
    setCurrentUser(user);
    onLogin(user);
    onNavigate("home");
  };

  const handleRegisto = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistoError("");
    
    // Validações
    if (registoPassword !== registoConfirmPassword) {
      setRegistoError("As palavras-passe não coincidem");
      return;
    }
    
    if (registoPassword.length < 6) {
      setRegistoError("A palavra-passe deve ter pelo menos 6 caracteres");
      return;
    }
    
    // Verificar se email já existe
    const existingUser = getUserByEmail(registoEmail);
    if (existingUser) {
      setRegistoError("Este email já está registado");
      return;
    }
    
    // Criar novo utilizador
    const newUserId = generateUserId();
    let newUser: Utilizador;
    
    if (registoTipo === "vendedor") {
      if (!registoNIF || !registoMorada || !registoTelefone) {
        setRegistoError("Preencha todos os campos obrigatórios para vendedor");
        return;
      }
      
      newUser = {
        id_utilizador: newUserId,
        nome: registoNome,
        email: registoEmail,
        password: registoPassword,
        tipo: "vendedor",
        NIF: registoNIF,
        morada: registoMorada,
        telefone: registoTelefone,
        data_registro: new Date(),
      } as Vendedor;
    } else {
      newUser = {
        id_utilizador: newUserId,
        nome: registoNome,
        email: registoEmail,
        password: registoPassword,
        tipo: "comprador",
        marcas_favoritas: [],
        data_registro: new Date(),
      } as Comprador;
    }
    
    saveUser(newUser);
    setCurrentUser(newUser);
    onLogin(newUser);
    onNavigate("home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Car className="h-12 w-12 text-white" />
            <span className="text-3xl text-white">AutoPremium</span>
          </div>
          <p className="text-white/90">A sua plataforma de compra e venda de automóveis</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sessão</TabsTrigger>
            <TabsTrigger value="registo">Registar</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Bem-vindo de volta</CardTitle>
                <CardDescription>Inicie sessão na sua conta</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.pt"
                        className="pl-10"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Palavra-passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Entrar
                  </Button>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-gray-700 mb-2">💡 Credenciais de teste:</p>
                    <p className="text-xs text-gray-600">Admin: admin@autopremium.pt / admin123</p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registo">
            <Card>
              <CardHeader>
                <CardTitle>Criar conta</CardTitle>
                <CardDescription>Registe-se para começar</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegisto} className="space-y-4">
                  {registoError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{registoError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="nome"
                          placeholder="O seu nome"
                          className="pl-10"
                          value={registoNome}
                          onChange={(e) => setRegistoNome(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registo-email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="registo-email"
                          type="email"
                          placeholder="seu@email.pt"
                          className="pl-10"
                          value={registoEmail}
                          onChange={(e) => setRegistoEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="registo-password">Palavra-passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="registo-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={registoPassword}
                          onChange={(e) => setRegistoPassword(e.target.value)}
                          required
                          minLength={6}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Palavra-passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={registoConfirmPassword}
                          onChange={(e) => setRegistoConfirmPassword(e.target.value)}
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de conta</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setRegistoTipo("comprador")}
                        className={`p-4 border rounded-lg text-left transition-colors ${
                          registoTipo === "comprador"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <p className="text-sm">Comprador</p>
                        <p className="text-xs text-gray-600 mt-1">Quero comprar um carro</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegistoTipo("vendedor")}
                        className={`p-4 border rounded-lg text-left transition-colors ${
                          registoTipo === "vendedor"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <p className="text-sm">Vendedor</p>
                        <p className="text-xs text-gray-600 mt-1">Quero vender carros</p>
                      </button>
                    </div>
                  </div>

                  {registoTipo === "vendedor" && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="telefone">Telefone</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="telefone"
                              placeholder="+351 912 345 678"
                              className="pl-10"
                              value={registoTelefone}
                              onChange={(e) => setRegistoTelefone(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nif">NIF</Label>
                          <div className="relative">
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="nif"
                              placeholder="123456789"
                              className="pl-10"
                              value={registoNIF}
                              onChange={(e) => setRegistoNIF(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="morada">Morada</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="morada"
                            placeholder="Rua, Número, Código Postal, Cidade"
                            className="pl-10"
                            value={registoMorada}
                            onChange={(e) => setRegistoMorada(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Criar conta
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
