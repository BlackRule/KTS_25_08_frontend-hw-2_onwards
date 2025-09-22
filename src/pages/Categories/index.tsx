import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PagePadding from 'components/PagePadding'
import Text from 'components/Text'
import Loader from 'components/Loader'
import { getCategories, Category } from 'api'

const Categories = () => {
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const list = await getCategories()
        if (mounted) setCategories(list)
      } catch (e) {
        if (mounted) setError('Failed to load categories')
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <PagePadding>
      <Text tag="h1" view="title">Categories</Text>
      {error && <Text tag="p" color="error">{error}</Text>}
      {!categories && !error && <Loader />}
      {categories && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
          {categories.map((c) => (
            <li key={c.id} style={{ marginBottom: 8 }}>
              {/* Link to root with sc[0]=id to trigger Products filter */}
              <Link to={`/?sc[0]=${encodeURIComponent(String(c.id))}`}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PagePadding>
  )
}

export default Categories
