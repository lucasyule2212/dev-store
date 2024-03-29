import AddToCartButton from '@/components/addToCartButton/addToCartButton';
import ProductQtdInput from '@/components/productQtdInput/productQtdInput';
import ProductSizeButton from '@/components/productSizeButton/productSizeButton';
import api from '@/data/api';
import { type Product } from '@/data/types/product';
import { type Metadata } from 'next';
import Image from 'next/image';
interface ProductPageProps {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-dynamic';

async function getProductBySlug({ slug }: { slug: string }): Promise<Product> {
  const response = await api({
    path: `/products/${slug}`,
    init: {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    },
  });

  const product = (await response.json()) as Product;

  return product;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug({ slug: params.slug });

  return {
    title: product.title,
  };
}

export async function generateStaticParams(): Promise<ProductPageProps[]> {
  const response = await api({
    path: '/products',
  });

  const products = (await response.json()) as Product[];

  return products.map((product) => ({
    params: {
      slug: product.slug,
    },
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug({
    slug: params.slug,
  });

  return (
    <div className="relative grid max-h-[860vh] grid-cols-3">
      <div className="col-span-2 flex  justify-center overflow-hidden">
        <Image
          className="relative"
          src={product?.image ?? ''}
          alt=""
          width={610}
          height={610}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">
          {product?.title ?? ''}
        </h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description ?? ''}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price?.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x sem juros de{' '}
            {(product.price / 12).toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="mt-8 space-y-4 ">
          <span className="block font-semibold">Tamanhos</span>
          <div className="flex gap-2">
            <ProductSizeButton size="P" />
            <ProductSizeButton size="M" />
            <ProductSizeButton size="G" />
            <ProductSizeButton size="GG" />
          </div>
        </div>
        <ProductQtdInput />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
