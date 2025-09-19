import { Alert } from '@mui/material'
import axios from 'axios'
import React, {useState} from 'react'

const instance = axios.create({
  baseURL: 'https://front-school-strapi.ktsdev.ru/api'
})
import {NavLink, useNavigate} from 'react-router-dom'
import Button from 'components/Button'
import Input from 'components/Input'
import {translation} from 'utils/translation'
import styles from './LoginSignup.module.scss'

const LoginSignup = (props:{type:'signIn'|'signUp'}) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const language='en'
  const [error, setError] = useState<null|string>(null)
  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      if (props.type === 'signIn') {
        await instance.post('/auth/local', {
          identifier: email,
          password
        })
        navigate('/')
      } else {
        await instance.post('/auth/local/register', {
          email,
          password,
          username: email.split('@')[0]
        })
        navigate('/login')
      }
    } catch (err) {
      const msg = err?.response?.data?.error?.message ?? err.message
      setError(msg)
    }
  }
  /* case 'auth/invalid-login-credentials':
        setError(translation[language]['auth/invalid-login-credentials'])
        break
      case 'auth/email-already-in-use':
        setError(translation[language]['auth/email-already-in-use'])
        break
      default:
        setError(error_.message)
        break
      }
    })

  }*/
  const sendEmail = async () => {
    try {
      await instance.post('/auth/forgot-password', {
        email
      })
      alert(translation[language]['password_reset_email_sent'])
    } catch (err) {
      const msg = err?.response?.data?.error?.message ?? err.message
      setError(msg)
    }
  }
  return (
    <>
      <main className={styles.main}>
        <form className={styles.form}>
          <Input
            placeholder={translation[language].email}
            name="email"
            required
            type="email"
            onChange={(v) => setEmail(v)}
            value={email}
            className={styles.input}
          />
          {/* helperText="Incorrect entry." todo */ }
          {/* error todo */}
          <Input
            placeholder={translation[language].password}
            name="password"
            required
            type="password"
            onChange={(v) => setPassword(v)}
            value={password}
            className={styles.input}
          />
          {error!==null?<Alert severity="error">{error}</Alert>:null}
          <Button onClick={submit}>
            {translation[language][props.type==='signUp'?'signUp':'login']}
          </Button>
        </form>
        {props.type==='signIn'? <><p>
          {translation[language].noAcc}
          {' '}
          <NavLink to="/signup">
            {translation[language].signUp}
          </NavLink>
        </p><p>
          {translation[language].forgot_password}
          <br/><br/>
          <Button onClick={sendEmail}>
            {translation[language].send_password_reset_email}
          </Button>
        </p></> :
          <p>
            {translation[language].haveAcc}
            {' '}
            <NavLink to="/login">
              {translation[language].login}
            </NavLink>
          </p>
        }
      </main>
    </>
  )
}

export default LoginSignup