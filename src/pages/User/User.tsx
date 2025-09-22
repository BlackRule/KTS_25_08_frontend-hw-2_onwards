import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Button from 'components/Button'
import rootStore from 'stores/RootStore'
import {translation} from 'utils/translation'
import styles from './User.module.scss'

const User = observer(() => {
  const language='en'
  const user = rootStore.auth.user
  const navigate = useNavigate()
  const handleLogout = useCallback(
    () => {
      rootStore.auth.signOut()
      navigate('/')
    },
    [navigate],
  )
  return <nav className={styles.nav}>
    {user === null ? (
      <Button onClick={() => navigate('/login')}>
        {translation[language].login}
      </Button>
    ) : (
      <div>
        <div>
          <strong>{translation[language].email}:</strong> {user.email}
        </div>
        <div>
          <strong>{translation[language].login_label}:</strong> {user.username}
        </div>
        <Button onClick={handleLogout}>
          {translation[language].logout}
        </Button>
      </div>
    )}
  </nav>
})

export default User