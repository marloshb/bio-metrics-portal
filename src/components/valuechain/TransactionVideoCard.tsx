
import React, { useState } from 'react';
import { DollarSign, Calendar, PlayCircle } from 'lucide-react';
import { MarketplaceTransaction } from '@/types/valueChainTypes';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface TransactionVideoCardProps {
  transaction: MarketplaceTransaction;
}

const TransactionVideoCard: React.FC<TransactionVideoCardProps> = ({ transaction }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Vendido':
        return 'bg-green-100 text-green-800';
      case 'Disponível':
        return 'bg-amber-100 text-amber-800';
      case 'Em negociação':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 duration-200 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <DollarSign className={`h-12 w-12 text-gray-400 transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
        </div>
        
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <PlayCircle className="h-16 w-16 text-white/90" />
        </div>
        
        <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
          <h3 className="font-medium text-lg truncate">{transaction.productName}</h3>
          <p className="text-sm text-gray-200">
            {transaction.seller} → {transaction.buyer || 'Aguardando comprador'}
          </p>
        </div>
        
        <Badge className={`absolute top-2 right-2 ${getStatusColor(transaction.status)}`}>
          {transaction.status}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg">{transaction.productName}</h3>
          <Badge className={getStatusColor(transaction.status)}>
            {transaction.status}
          </Badge>
        </div>

        <div className="mt-2 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Vendedor:</span>
            <span className="font-medium">{transaction.seller}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Comprador:</span>
            <span className="font-medium">{transaction.buyer || '—'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Quantidade:</span>
            <span>{transaction.quantity} {transaction.unit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Valor Total:</span>
            <span className="font-medium">{formatCurrency(transaction.totalValue || transaction.initialPrice * transaction.quantity)}</span>
          </div>
        </div>

        {transaction.traceabilityCode && (
          <div className="mt-3 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center justify-between">
            <span>Código de Rastreabilidade:</span>
            <span className="font-mono">{transaction.traceabilityCode}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between border-t">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3.5 h-3.5 mr-1" />
          <span>{new Date(transaction.date || transaction.createdAt).toLocaleDateString('pt-BR')}</span>
        </div>

        <Button 
          size="sm" 
          variant="outline" 
          className="text-[#0078D4] border-[#0078D4] hover:bg-[#0078D4] hover:text-white"
        >
          Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionVideoCard;
