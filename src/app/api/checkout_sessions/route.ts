import { type CartItem } from '@/contexts/cartContext';
import stripe from '@/utils/stripe';
import { headers } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const headersList = headers();
  const cartDetails = (await req.json()) as CartItem[];

  const lineItems = cartDetails.map((item: CartItem) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${headersList.get('origin')}/`,
      cancel_url: `${headersList.get('origin')}/`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Error creating checkout session' });
  }
}
