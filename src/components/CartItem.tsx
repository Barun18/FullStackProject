import type {Product} from '../Type/Product'

type Props = {
  items: Product[];
  cart: { [key: number]: number };
};

function CartItem({ items, cart }: Props) {
  return (
    <div>
      <h2>Here is your all cart Items.</h2>

      {items.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>₹{item.price}</p>
          <p>Qty: {cart[item.id]}</p>
        </div>
      ))}
    </div>
  );
}

export default CartItem;