import { observer } from 'mobx-react-lite'
import PagePadding from 'components/PagePadding'
import Text from 'components/Text'
import Button from 'components/Button'
import rootStore from 'stores/RootStore'
import { useEffect } from 'react'

const Cart = observer(() => {
  const cart = rootStore.cart
  const items = cart.list

  useEffect(() => {
    cart.fetch()
  }, [cart])

  return (
    <PagePadding>
      <Text tag="h1" view="title">Your Cart</Text>
      {items.length === 0 ? (
        <Text tag="p" view="p-20">Your cart is empty.</Text>
      ) : (
        <div>
          {items.map(({ product, qty }) => (
            <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <img src={product.images?.[0] ?? ''} alt={product.title} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <Text tag="h3" view="p-20">{product.title}</Text>
                <Text tag="p" color="secondary" view="p-16">${product.price} x {qty}</Text>
              </div>
              <Text tag="p" view="p-20">${(product.price ?? 0) * qty}</Text>
              <Button onClick={() => cart.remove(product.id)}>Remove</Button>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, paddingTop: 16 }}>
            <Text tag="p" view="p-20">Total: ${cart.total}</Text>
            <Button onClick={() => cart.clear()}>Clear cart</Button>
          </div>
        </div>
      )}
    </PagePadding>
  )
})

export default Cart
