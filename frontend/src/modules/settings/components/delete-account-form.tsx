import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DeleteAccountFormProps {
  isLoading: boolean;
}

export function DeleteAccountForm({ isLoading }: DeleteAccountFormProps) {
  const [confirmText, setConfirmText] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const toast = useToast();

  const handleDeleteAccount = async () => {
    if (confirmText !== 'DELETAR') {
      toast.error('Erro', 'Digite "DELETAR" para confirmar a exclusão da conta');
      return;
    }

    try {
      // Aqui você implementaria a chamada para a API de exclusão
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Conta excluída com sucesso!');
      // Redirecionar para login ou home
    } catch (error) {
      toast.error('Erro ao excluir conta', 'Tente novamente mais tarde');
    }
  };

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setConfirmText('');
  };

  return (
    <Card className="w-full border-red-200 dark:border-red-800">
      <CardHeader className="space-y-1.5">
        <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <Trash2 className="h-5 w-5" />
          Excluir Conta
        </CardTitle>
        <CardDescription className="text-red-600 dark:text-red-400">
          Esta ação é irreversível. Todos os seus dados serão permanentemente removidos.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showConfirmation ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                  Atenção: Esta ação não pode ser desfeita
                </p>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  <li>• Todos os seus dados pessoais serão removidos</li>
                  <li>• Seu histórico de atividades será perdido</li>
                  <li>• Você não poderá recuperar sua conta</li>
                </ul>
              </div>
            </div>
            
            <Button
              onClick={handleShowConfirmation}
              variant="outline"
              size="default"
              className="w-full border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 hover:text-red-800 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900 dark:hover:border-red-500 dark:hover:text-red-200"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir Minha Conta
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">
                Para confirmar a exclusão, digite <strong>DELETAR</strong> no campo abaixo:
              </p>
              <Label htmlFor="confirmDelete" className="text-sm font-medium text-red-700 dark:text-red-300">
                Digite "DELETAR" para confirmar
              </Label>
              <Input
                id="confirmDelete"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETAR"
                className="mt-2 border-red-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleDeleteAccount}
                disabled={isLoading || confirmText !== 'DELETAR'}
                variant="destructive"
                size="default"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {isLoading ? 'Excluindo...' : 'Confirmar Exclusão'}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                size="default"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
