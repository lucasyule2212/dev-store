import { type NextRequest } from 'next/server';
import { z } from 'zod';
import data from '../data.json';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const query = z.string().parse(searchParams.get('q'));
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const products = data.products.filter((product) =>
    product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );

  if (products.length === 0) {
    return Response.json(
      {
        message: 'No product matching the query was found',
      },
      { status: 400 },
    );
  }

  return Response.json(products);
}
