import React, { useState, useEffect } from 'react';
import { 
  mockMarketplaceTransactions, 
  mockProductOfferings, 
  mockActors 
} from '@/data/valuechain';
import { MarketplaceTransaction, ProductOffering, Actor } from '@/types/valueChainTypes';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, PackageCheck, User, StoreIcon, TrendingUp, TrendingDown, AlertTriangle, Circle, LucideIcon } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Fix the type issue with the transaction object
const enrichTransactionData = (transaction: MarketplaceTransaction) => {
  const product = mockProductOfferings.find(p => p.id === transaction.productOffering);
  const seller = mockActors.find(a => a.id === transaction.seller);
  const buyer = transaction.buyer ? mockActors.find(a => a.id === transaction.buyer) : null;
  
  return {
    ...transaction,
    product: product || undefined,
    seller: seller || undefined,
    buyer: buyer || undefined
  };
};

// Update the getTransactionDetails function to respect the correct types
const getTransactionDetails = (transaction: MarketplaceTransaction) => {
  const enrichedTransaction = enrichTransactionData(transaction);

  return {
    productName: enrichedTransaction.product?.name || 'Produto não encontrado',
    sellerName: enrichedTransaction.seller?.name || 'Vendedor não encontrado',
    buyerName: enrichedTransaction.buyer?.name || 'Comprador não encontrado',
    initialPrice: enrichedTransaction.initialPrice,
    finalPrice: enrichedTransaction.finalPrice,
    quantity: enrichedTransaction.quantity,
    status: enrichedTransaction.status,
    createdAt: enrichedTransaction.createdAt,
    completedAt: enrichedTransaction.completedAt,
    traceabilityCode: enrichedTransaction.traceabilityCode,
  };
};

export const BioMarketplace = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    // Enrich transaction data when the component mounts
    const enrichedTransactions = mockMarketplaceTransactions.map(transaction =>
      enrichTransactionData(transaction)
    );
    setTransactions(enrichedTransactions);
  }, []);

  const getStatusIcon = (status: string): LucideIcon => {
    switch (status) {
      case 'Disponível':
        return StoreIcon;
      case 'Em negociação':
        return TrendingUp;
      case 'Vendido':
        return PackageCheck;
      case 'Cancelado':
        return AlertTriangle;
      default:
        return Circle;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Disponível':
        return 'text-green-500';
      case 'Em negociação':
        return 'text-yellow-500';
      case 'Vendido':
        return 'text-blue-500';
      case 'Cancelado':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] w-full rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Produto</TableHead>
                  <TableHead>Vendedor</TableHead>
                  <TableHead>Comprador</TableHead>
                  <TableHead>Preço Inicial</TableHead>
                  <TableHead>Preço Final</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Data Criação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => {
                  const details = getTransactionDetails(transaction);
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{details.productName}</TableCell>
                      <TableCell>{details.sellerName}</TableCell>
                      <TableCell>{details.buyerName || 'N/A'}</TableCell>
                      <TableCell>R$ {details.initialPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        {details.finalPrice ? `R$ ${details.finalPrice.toFixed(2)}` : 'N/A'}
                      </TableCell>
                      <TableCell>{details.quantity}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className={getStatusColor(details.status)}>
                            <getStatusIcon(details.status) className="h-4 w-4" />
                          </span>
                          {details.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(details.createdAt).toLocaleDateString('pt-BR')}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Ver Mais</Button>
          <Badge variant="secondary">
            {transactions.length} Transações
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
};
