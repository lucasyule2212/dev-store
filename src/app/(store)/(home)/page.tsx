import FeaturedProduct from '@/components/featuredProduct/featuredProduct';
import HighlightedProduct from '@/components/highlightedProduct/highlightedProduct';
import api from '@/data/api';
import type { Product } from '@/data/types/product';

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api({
    path: '/products/featured',
    init: {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    },
  });

  const products = (await response.json()) as Product[];

  return products;
}

export default async function HomePage() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts();

  return (
    <div className="grid max-h-[600px] grid-cols-9 grid-rows-6 gap-6">
      <HighlightedProduct
        title={highlightedProduct?.title ?? ''}
        image={highlightedProduct?.image ?? ''}
        price={highlightedProduct?.price ?? 0}
        slug={highlightedProduct?.slug ?? ''}
      />

      {otherProducts.map((product) => (
        <FeaturedProduct
          key={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
          slug={product.slug}
        />
      ))}
    </div>
  );
}
