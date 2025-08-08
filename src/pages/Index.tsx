import React, { useState } from 'react';
import { FileUpload } from '@/components/ui/file-upload';
import { DataPreview } from '@/components/ui/data-preview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Heart, Upload, CheckCircle } from 'lucide-react';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<Record<string, any> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setExtractedData(null);
    toast({
      title: "Arquivo selecionado",
      description: `${file.name} está pronto para processamento`,
    });
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setExtractedData(null);
  };

  const handleUploadAndExtract = async () => {
    if (!selectedFile) {
      toast({
        title: "Erro",
        description: "Selecione um arquivo PDF antes de continuar",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('arquivo', selectedFile);

      // Simulação de API call (substitua pela sua API real)
      // const response = await fetch('http://localhost:3000/api/upload-doacao', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();

      // Dados simulados para demonstração
      await new Promise(resolve => setTimeout(resolve, 2000));
      const simulatedData = {
        nomeDoador: "João Silva Santos",
        cpfCnpj: "123.456.789-00",
        endereco: "Rua das Flores, 123, Centro",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01234-567",
        telefone: "(11) 99999-9999",
        email: "joao.silva@email.com",
        valorDoacao: "R$ 1.000,00",
        dataDoacao: "08/01/2025",
        tipoDoacao: "Dinheiro",
        finalidade: "Assistência Social",
        observacoes: "Doação mensal recorrente",
        statusVerificacao: "Aprovado"
      };

      setExtractedData(simulatedData);
      toast({
        title: "Sucesso!",
        description: "Dados extraídos com sucesso do termo de doação",
      });
    } catch (error) {
      toast({
        title: "Erro no processamento",
        description: "Ocorreu um erro ao processar o arquivo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Sistema de Termos de Doação</h1>
          </div>
          <p className="text-center text-white/90 text-lg">
            Upload e extração automática de dados de termos de doação
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Upload Section */}
          <Card className="shadow-soft border-donation-primary-light/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-donation-primary" />
                <span>Upload do Termo de Doação</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-donation-primary text-donation-primary">
                  PDF
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Formato aceito
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onRemoveFile={handleRemoveFile}
              />
              
              {selectedFile && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleUploadAndExtract}
                    disabled={isProcessing}
                    size="lg"
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Extrair Dados
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          {(extractedData || isProcessing) && (
            <DataPreview
              data={extractedData || {}}
              isLoading={isProcessing}
            />
          )}

          {/* Info Section */}
          <Card className="bg-gradient-card border-0">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Como funciona?
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-donation-primary-light rounded-full flex items-center justify-center mx-auto">
                      <span className="text-donation-primary font-bold">1</span>
                    </div>
                    <p>Faça upload do seu PDF do termo de doação</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-donation-primary-light rounded-full flex items-center justify-center mx-auto">
                      <span className="text-donation-primary font-bold">2</span>
                    </div>
                    <p>Nossa IA extrai automaticamente os dados</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-donation-primary-light rounded-full flex items-center justify-center mx-auto">
                      <span className="text-donation-primary font-bold">3</span>
                    </div>
                    <p>Visualize e valide as informações extraídas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;