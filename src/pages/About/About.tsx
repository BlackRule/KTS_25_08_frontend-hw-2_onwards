import PagePadding from 'components/PagePadding'
import styles from './About.module.scss'

const About = () => {
  return (
    <main className={styles.about}>
      <PagePadding className={styles.inner}>
        <h1>About Lalasia</h1>
        <p>
          Lalasia began as a small idea at a kitchen table: create everyday objects that feel delightful, last
          longer, and tread lighter on the planet. Today, that spark guides everything we do. From thoughtful materials
          to simple, human-centered design, we craft products meant to be used, loved, and repaired—not replaced.
        </p>
        <p>
          We’re a fictional company with a very real obsession for details. Our teams prototype relentlessly, test with
          real people, and iterate until it just feels right. No loud logos, no throwaway trends—just quiet quality that
          earns its place in your home.
        </p>
        <p>
          Lalasia is also a community. We partner with small manufacturers, celebrate transparent supply chains, and
          publish repair guides so you can extend the life of what you own. Because the most sustainable product is the
          one you keep.
        </p>
        <p>
          Whether you’re discovering us for the first time or have been here since those early kitchen-table days—thanks
          for being part of Lalasia. We’re glad you’re here.
        </p>
      </PagePadding>
    </main>
  )
}

export default About
