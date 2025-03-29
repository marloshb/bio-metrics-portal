
import React from 'react';
import { Star, Award, MapPin, Calendar, Play } from 'lucide-react';
import { ProductOffering } from '@/types/valueChainTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

interface ProductVideoCardProps {
  product: ProductOffering;
  onSelect: (product: ProductOffering) => void;
}

const ProductVideoCard = ({ product, onSelect }: ProductVideoCardProps) => {
  return (
    <Card 
      className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg"
      onClick={() => onSelect(product)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gray-100 overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200">
              <span className="text-gray-400">Sem imagem</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-2">
              <Play className="h-8 w-8 text-[#0078D4]" />
            </div>
          </div>
          
          <div className="absolute top-2 right-2">
            {product.certifications && product.certifications.length > 0 && (
              <Badge className="bg-green-500 text-white flex items-center gap-1">
                <Award className="h-3 w-3" />
                Certificado
              </Badge>
            )}
          </div>
          
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-white/90 text-[#0078D4] hover:bg-white">
              {product.category}
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900">{product.name}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm ml-1 font-medium">{product.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{product.location}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Disponível desde {new Date(product.listedDate || '').toLocaleDateString('pt-BR')}</span>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div>
              <span className="font-semibold text-lg">{formatCurrency(product.price)}</span>
              <span className="text-gray-500 text-sm"> /{product.unit}</span>
            </div>
            <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
              {product.availableQuantity} disponíveis
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductVideoCard;
