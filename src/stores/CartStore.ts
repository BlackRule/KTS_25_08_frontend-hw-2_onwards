import { makeAutoObservable, runInAction } from 'mobx'
import { Product, getCart as apiGetCart, postCartAdd, postCartRemove, findProductNumericIdByDocumentId } from 'api'

export type CartItem = {
  product: Product
  qty: number
  originalProductId?: number
}

export default class CartStore {
  items: Map<Product['id'], CartItem> = new Map()

  constructor() {
    makeAutoObservable(this)
  }

  get count(): number {
    let c = 0
    for (const it of this.items.values()) c += it.qty
    return c
  }

  get total(): number {
    let sum = 0
    for (const it of this.items.values()) sum += (it.product.price ?? 0) * it.qty
    return sum
  }

  get list(): CartItem[] {
    return Array.from(this.items.values())
  }

  async fetch() {
    try {
      const items = await apiGetCart()
      runInAction(() => {
        this.items.clear()
        for (const it of items) {
          this.items.set(it.product.id, { product: it.product, qty: it.qty, originalProductId: it.originalProductId })
        }
      })
    } catch (e) {
      // ignore fetch errors for now
      // console.warn('Failed to fetch cart', e)
    }
  }

  async add(product: Product, qty: number = 1) {
    try {
      // API expects numeric id; resolve by documentId (our product.id)
      const numericId = await findProductNumericIdByDocumentId(product.id)
      if (numericId == null) {
        // Fallback to optimistic update if cannot resolve
        const existing = this.items.get(product.id)
        if (existing) {
          existing.qty += qty
          this.items.set(product.id, { ...existing })
        } else {
          this.items.set(product.id, { product, qty })
        }
        return
      }
      await postCartAdd({ product: numericId, quantity: qty })
      await this.fetch()
    } catch (e) {
      // Optimistic local add on failure to avoid breaking UX
      const existing = this.items.get(product.id)
      if (existing) {
        existing.qty += qty
        this.items.set(product.id, { ...existing })
      } else {
        this.items.set(product.id, { product, qty })
      }
    }
  }

  async remove(productId: Product['id'], qty: number = 1) {
    const existing = this.items.get(productId)
    if (!existing) {
      return
    }
    try {
      const originalId = existing.originalProductId
      if (originalId != null) {
        await postCartRemove({ product: originalId, quantity: qty })
        await this.fetch()
        return
      }
      // If we don't know the original numeric id, try to resolve by documentId
      const numericId = await findProductNumericIdByDocumentId(productId)
      if (numericId != null) {
        await postCartRemove({ product: numericId, quantity: qty })
        await this.fetch()
        return
      }
    } catch (e) {
      // fall through to local update
    }
    // Local update fallback
    if (existing.qty <= qty) this.items.delete(productId)
    else this.items.set(productId, { ...existing, qty: existing.qty - qty })
  }

  async clear() {
    // Try to clear on server by removing each item with its quantity
    const items = Array.from(this.items.values())
    for (const it of items) {
      if (it.originalProductId != null) {
        try {
          await postCartRemove({ product: it.originalProductId, quantity: it.qty })
        } catch (_) { /* ignore */ }
      }
    }
    await this.fetch()
  }
}
