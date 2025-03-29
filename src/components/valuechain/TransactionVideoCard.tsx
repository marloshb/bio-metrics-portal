
import React from 'react';
import { Calendar, DollarSign, CheckCircle2, Clock, XCircle, BarChart2, Package } from 'lucide-react';
import { MarketplaceTransaction } from '@/types/valueChainTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

interface TransactionVideoCardProps {
  transaction: MarketplaceTransaction;
}

const TransactionVideoCard = ({ transaction }: TransactionVideoCardProps) => {
  // Status styling and icons
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Vendido':
        return { 
          icon: CheckCircle2, 
          color: 'bg-green-100 text-green-700 border-green-200',
          iconColor: 'text-green-500'
        };
      case 'Em negociação':
        return { 
          icon: Clock, 
          color: 'bg-amber-100 text-amber-700 border-amber-200',
          iconColor: 'text-amber-500'
        };
      case 'Cancelado':
        return { 
          icon: XCircle, 
          color: 'bg-red-100 text-red-700 border-red-200',
          iconColor: 'text-red-500'
        };
      case 'Disponível':
      default:
        return { 
          icon: Package, 
          color: 'bg-blue-100 text-blue-700 border-blue-200',
          iconColor: 'text-blue-500'
        };
    }
  };

  const { icon: StatusIcon, color: statusColor, iconColor } = getStatusInfo(transaction.status);

  // Random visualization image for transactions
  const getRandomImage = () => {
    const images = [
      "https://images.unsplash.com/photo-1587049352847-de8e5e973666", // Castanhas
      "https://images.unsplash.com/photo-1587049352851-8d4e89133924", // Mel
      "https://images.unsplash.com/photo-1617952431087-4ea1829e4e05", // Óleo
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88", // Madeira
      "https://images.unsplash.com/photo-1599321329467-80d1cf266633", // Sementes
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <Card className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative h-40 bg-gray-100 overflow-hidden">
          <img 
            src={getRandomImage()} 
            alt={transaction.productName} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
            <h3 className="font-medium text-white">{transaction.productName}</h3>
            <div className="flex justify-between items-center mt-1">
              <Badge className={`${statusColor} border flex items-center gap-1`}>
                <StatusIcon className={`h-3 w-3 ${iconColor}`} />
                {transaction.status}
              </Badge>
              
              <Badge className="bg-white/80 text-gray-800">
                {transaction.quantity} {transaction.unit}
              </Badge>
            </div>
          </div>

          <div className="absolute top-2 right-2">
            {transaction.traceabilityCode && (
              <Badge className="bg-white/90 text-green-700 hover:bg-white flex items-center gap-1">
                <BarChart2 className="h-3 w-3" />
                Rastreável
              </Badge>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            <span>{new Date(transaction.date || '').toLocaleDateString('pt-BR')}</span>
          </div>
          
          <div className="flex items-center text-gray-900 text-lg font-semibold">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>{formatCurrency(transaction.finalPrice || transaction.initialPrice)}</span>
            <span className="text-sm font-normal text-gray-500 ml-1">/{transaction.unit}</span>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <Badge variant="outline" className="text-gray-500">
              Total: {formatCurrency(transaction.totalValue || 0)}
            </Badge>
            
            {transaction.buyer && (
              <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
                Comprador: ID {transaction.buyer.substring(0, 3)}...
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionVideoCard;
