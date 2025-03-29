
import { MarketplaceTransaction } from '@/types/valueChainTypes';

export const mockMarketplaceTransactions: MarketplaceTransaction[] = [
  {
    id: "tx1",
    productOffering: "p1",
    seller: "1",
    buyer: "",
    initialPrice: 35,
    quantity: 50,
    status: "Disponível",
    createdAt: "2024-06-10T10:30:00Z",
    updatedAt: "2024-06-10T10:30:00Z",
    // Added fields for compatibility with BioMarketplace.tsx
    date: "2024-06-10T10:30:00Z",
    productName: "Mel Orgânico",
    unit: "kg",
    totalValue: 35 * 50
  },
  {
    id: "tx2",
    productOffering: "p3",
    seller: "2",
    buyer: "6",
    initialPrice: 120,
    finalPrice: 115,
    quantity: 20,
    status: "Vendido",
    createdAt: "2024-06-05T14:20:00Z",
    updatedAt: "2024-06-07T09:45:00Z",
    completedAt: "2024-06-07T09:45:00Z",
    traceabilityCode: "TX2207090945",
    date: "2024-06-07T09:45:00Z",
    productName: "Óleo Essencial de Copaíba",
    unit: "L",
    totalValue: 115 * 20
  },
  {
    id: "tx3",
    productOffering: "p5",
    seller: "3",
    buyer: "",
    initialPrice: 18,
    quantity: 500,
    status: "Em negociação",
    createdAt: "2024-06-08T11:15:00Z",
    updatedAt: "2024-06-09T16:30:00Z",
    date: "2024-06-09T16:30:00Z",
    productName: "Castanha-do-Brasil",
    unit: "kg",
    totalValue: 18 * 500
  },
  {
    id: "tx4",
    productOffering: "p7",
    seller: "4",
    buyer: "",
    initialPrice: 1800,
    quantity: 10,
    status: "Disponível",
    createdAt: "2024-06-01T09:20:00Z",
    updatedAt: "2024-06-01T09:20:00Z",
    date: "2024-06-01T09:20:00Z",
    productName: "Madeira Certificada",
    unit: "m³",
    totalValue: 1800 * 10
  },
  {
    id: "tx5",
    productOffering: "p8",
    seller: "5",
    buyer: "1",
    initialPrice: 65,
    finalPrice: 60,
    quantity: 100,
    status: "Vendido",
    createdAt: "2024-05-28T13:40:00Z",
    updatedAt: "2024-06-02T10:15:00Z",
    completedAt: "2024-06-02T10:15:00Z",
    traceabilityCode: "TX0206021015",
    date: "2024-06-02T10:15:00Z",
    productName: "Baru",
    unit: "kg",
    totalValue: 60 * 100
  }
];
