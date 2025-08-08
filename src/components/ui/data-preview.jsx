import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export const DataPreview = ({
  data, 
  isLoading = false, 
  className 
}) => {
  if (isLoading) {
    return (
      <Card className={cn("animate-pulse", className)}>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/3"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const formatValue = (value) => {
    if (value === null || value === undefined) return 'Não informado';
    if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  const getValueIcon = (value) => {
    if (value === null || value === undefined || value === '') {
      return <AlertCircle className="w-4 h-4 text-orange-500" />;
    }
    return <CheckCircle className="w-4 h-4 text-success" />;
  };

  const dataEntries = Object.entries(data);

  return (
    <Card className={cn("animate-fade-in shadow-soft", className)}>
      <CardHeader className="bg-gradient-primary rounded-t-lg">
        <CardTitle className="text-white flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Dados Extraídos do Termo de Doação</span>
        </CardTitle>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-white/20 text-white">
            {dataEntries.length} campos identificados
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {dataEntries.map(([key, value], index) => (
            <div
              key={key}
              className="p-4 hover:bg-muted/50 transition-colors duration-200 flex items-start justify-between group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  {getValueIcon(value)}
                  <h4 className="text-sm font-medium text-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground break-words">
                  {formatValue(value)}
                </p>
              </div>
              <Badge
                variant={value ? "default" : "secondary"}
                className="ml-2 shrink-0"
              >
                {value ? "Preenchido" : "Vazio"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};