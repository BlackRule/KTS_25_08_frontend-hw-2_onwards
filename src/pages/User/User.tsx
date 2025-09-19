import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from 'components/Button'
import {translation} from 'utils/translation'
import styles from './User.module.scss'

const User=()=> {
  const language='en'
  // const user = useUser() TODO
  const navigate = useNavigate()
  const handleLogout = useCallback(
    () => { //TODO
      /*   signOut(auth).then(() => {
        // Sign-out successful.
        navigate('/')
        console.log('Signed out successfully')
      }).catch((error) => {
        // An error happened.
      })*/
    },
    [navigate],
  )
  return <nav className={styles.nav}>
    {user === null ?  <Button onClick={()=>
      navigate('/login')}>
      {translation[language].login}
    </Button> :
      <Button onClick={handleLogout}>
        {translation[language].logout}
      </Button>}
  </nav>
}

export default User