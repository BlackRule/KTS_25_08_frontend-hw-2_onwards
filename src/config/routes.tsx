import {Navigate, Route} from 'react-router-dom'
import Product from 'pages/Product'

export type ROUTES_URLparams_TYPES_product={ id: string }

export const ROUTES = {
  product: {
    get: (id: ROUTES_URLparams_TYPES_product['id']) => `/product/${id}`,
    routes: <>
      <Route path="/product/:id" element={<Product />} />
      <Route path="/product" element={<Navigate to="/404" replace />} />
    </>
  },
}