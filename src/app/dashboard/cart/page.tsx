import { WidgetItem } from "@/components/widget-item/WidgetItem";
import { Product, products } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart/components/ItemCart";
import { cookies } from "next/headers"

export const metadata = {
  title:'Carrito de compras',
  description: 'SEO Carrito'
}

interface ProdcutInCart {
  product: Product;
  quantity: number;
}

const getProductInCart = (cart: { [id: string]: number }): ProdcutInCart[] => {
  const productsInCart: ProdcutInCart [] = [];

  for(const id of Object.keys(cart)) {
    const product = products.find(prod => prod.id === id);

    if (product) {
      productsInCart.push({product: product, quantity: cart[id]})
    }
  }

  return productsInCart;
};

export default function HomeCart() {

  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as {[id: string]: number};
  const productsInCart = getProductInCart(cart);

  const totalToPay = productsInCart.reduce((prev, current) => (current.product.price * current.quantity) + prev, 0)
 
  return (
    <div>
      <h1 className="text-2xl"> Productos en el carrito</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a pagar">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">
                $ {(totalToPay * 1.15).toFixed(2)}
              </h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              {" "}
              Impuesto 15%: $ {(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}