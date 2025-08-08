import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from './button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemoveFile: () => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  onRemoveFile,
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
      setDragActive(false);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  if (selectedFile) {
    return (
      <div className={cn(
        "bg-gradient-card border border-donation-primary-light rounded-xl p-6 animate-scale-in",
        className
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-donation-primary-light rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-donation-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveFile}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300",
        isDragActive || dragActive
          ? "border-donation-primary bg-donation-primary-light/20 scale-[1.02]"
          : "border-border hover:border-donation-primary hover:bg-donation-primary-light/10",
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-donation-primary-light rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-donation-primary" />
        </div>
        <div>
          <p className="text-lg font-medium text-foreground mb-2">
            {isDragActive ? 'Solte o arquivo aqui...' : 'Arraste seu PDF aqui'}
          </p>
          <p className="text-muted-foreground mb-4">
            ou clique para selecionar um arquivo
          </p>
          <p className="text-sm text-muted-foreground">
            Apenas arquivos PDF são aceitos
          </p>
        </div>
      </div>
    </div>
  );
};