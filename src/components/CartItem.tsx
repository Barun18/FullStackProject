import useCartStore from '../store/useCartStore';

function Item() {
    const items = useCartStore((state) => state.items)
    return (
        <div>
            <h2>Here is your all cart Items.</h2>
           
            {items.map((item) =>(
            <div key={item.id}>
                <p>{item.id}</p>
                <p>{item.title}</p>
                <p>{item.price}</p>
            </div>
            ))}
        </div>
    )
}


export default Item;