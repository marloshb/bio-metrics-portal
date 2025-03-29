
import React, { useState } from 'react';
import { ShoppingBag, MapPin, Calendar, Award, PlayCircle, Star } from 'lucide-react';
import { ProductOffering } from '@/types/valueChainTypes';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface ProductVideoCardProps {
  product: ProductOffering;
  onSelect: (product: ProductOffering) => void;
}

const ProductVideoCard: React.FC<ProductVideoCardProps> = ({ product, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 duration-200 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(product)}
    >
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <ShoppingBag className={`h-12 w-12 text-gray-400 transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
        </div>
        
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <PlayCircle className="h-16 w-16 text-white/90" />
        </div>
        
        <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
          <h3 className="font-medium text-lg truncate">{product.name}</h3>
          <p className="text-sm text-gray-200 line-clamp-2">{product.description}</p>
        </div>
        
        <Badge className="absolute top-2 right-2 bg-[#0078D4] hover:bg-[#0078D4]">
          {product.category}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <Badge className={`${product.category === 'Orgânico' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            {product.category}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 mt-1.5 text-gray-600">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-xs">{product.location}</span>
        </div>

        <div className="mt-3">
          <div className="flex justify-between items-baseline">
            <div className="text-lg font-semibold">{formatCurrency(product.price)}</div>
            <div className="text-xs text-gray-500">/ {product.unit}</div>
          </div>
        </div>

        {product.certifications && product.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.certifications.map((cert, index) => (
              <div key={index} className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded-sm flex items-center">
                <Award className="w-3 h-3 mr-1" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between border-t">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3.5 h-3.5 mr-1" />
          <span>{new Date(product.listedDate || '').toLocaleDateString('pt-BR')}</span>
        </div>

        <Button size="sm" className="bg-[#0078D4] hover:bg-[#005A9C]">
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductVideoCard;
