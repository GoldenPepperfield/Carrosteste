import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AlertTriangle, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import type { Utilizador, Denuncia } from "../types";
import { saveDenuncia, generateDenunciaId } from "../lib/database";

interface ReportsPageProps {
  onNavigate: (page: string) => void;
  currentUser: Utilizador | null;
}

export function ReportsPage({ onNavigate, currentUser }: ReportsPageProps) {
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [anuncioId, setAnuncioId] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert("Precisa de estar autenticado para enviar uma denúncia");
      onNavigate("login");
      return;
    }

    const newDenuncia: Denuncia = {
      id_denuncia: generateDenunciaId(),
      id_utilizador: currentUser.id_utilizador,
      id_anuncio: anuncioId ? parseInt(anuncioId) : undefined,
      tipo: tipo as Denuncia['tipo'],
      descricao,
      status: "pendente",
      data_denuncia: new Date(),
    };

    saveDenuncia(newDenuncia);
    
    setSuccess(true);
    setTipo("");
    setDescricao("");
    setAnuncioId("");

    setTimeout(() => {
      onNavigate("my-reports");
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">Denunciar Problema</h1>
          <p className="text-gray-600">
            Reporte problemas com anúncios ou comportamentos suspeitos
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Formulário de Denúncia
            </CardTitle>
            <CardDescription>
              Todas as denúncias são analisadas pela nossa equipa
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success && (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Denúncia enviada com sucesso! Será redirecionado para ver as suas denúncias...
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Denúncia</Label>
                <Select value={tipo} onValueChange={setTipo} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anuncio_fraudulento">Anúncio Fraudulento</SelectItem>
                    <SelectItem value="conteudo_inapropriado">Conteúdo Inapropriado</SelectItem>
                    <SelectItem value="preco_suspeito">Preço Suspeito</SelectItem>
                    <SelectItem value="veiculo_nao_existe">Veículo Não Existe</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="anuncio">ID do Anúncio (opcional)</Label>
                <Input
                  id="anuncio"
                  placeholder="Ex: 12345"
                  value={anuncioId}
                  onChange={(e) => setAnuncioId(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Se a denúncia for sobre um anúncio específico, indique o ID
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva detalhadamente o problema..."
                  rows={6}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  Forneça o máximo de detalhes possível para ajudar na análise
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  Informação Importante
                </h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Denúncias falsas podem resultar na suspensão da conta</li>
                  <li>• Todas as denúncias são analisadas em até 48 horas</li>
                  <li>• Não partilhe informações pessoais neste formulário</li>
                  <li>• Em caso de urgência, contacte-nos diretamente</li>
                </ul>
              </div>

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
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Denúncia
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Precisa de ajuda imediata?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Para situações urgentes ou suporte direto, contacte a nossa equipa:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> suporte@autopremium.pt</p>
              <p><strong>Telefone:</strong> +351 210 123 456</p>
              <p className="text-xs text-gray-500">
                Horário: Segunda a Sexta, 9h - 18h
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
