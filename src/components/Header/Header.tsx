import {Link} from 'react-router-dom'
import PagePadding from 'components/PagePadding'
import logo from './img/logo.svg'
import styles from './Header.module.scss'
const user=null /*TODO */

const Header = () => {
  return <header className={styles.header}>
    <PagePadding className={styles.header__inner}>
      <input type="checkbox" id={styles.menu__checkbox}/>
      <div className={styles.logoAndBurger}>
        <Link to={'/'} className={styles.logo}>
          <img src={logo} alt=""/>
          <span>Lalasia</span>
        </Link>
        <label htmlFor={styles.menu__checkbox} className={styles.burger}><div/></label>
      </div>
      <nav className={styles.nav}>
        <Link to={'/'} className={styles.current}>Products</Link>
        <Link to={'#'}>Categories</Link>
        <Link to={'#'}>About Us</Link>
      </nav>
      <div className={styles.right}>
        <Link to={'#'} className={styles.bag}/>
        <Link to={user === null ?'/login':'/user'} className={styles.user}/>
      </div>
    </PagePadding>
  </header>
}
export default Header