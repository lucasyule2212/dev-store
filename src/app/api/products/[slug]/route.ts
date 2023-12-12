import { z } from 'zod';
import data from '../data.json';

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;
  const parsedSlug = z.string().parse(slug);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const product = data.products.find((product) => product.slug === parsedSlug);
  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 400 });
  }
  return Response.json(product);
}
