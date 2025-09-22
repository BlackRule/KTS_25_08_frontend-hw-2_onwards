import {Alert} from '@mui/material'
import React, {useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {postForgotPassword, postSignIn, postSignUp} from 'api'
import Button from 'components/Button'
import Input from 'components/Input'
import rootStore from 'stores/RootStore'
import {Language, translation} from 'utils/translation'
import styles from './LoginSignup.module.scss'

const LoginSignup = (props: { type: 'signIn' | 'signUp' }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const language: Language = 'en'
  const [error, setError] = useState<null | string>(null)
  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      if (props.type === 'signIn') {
        const resp = await postSignIn(email, password)
        // Strapi returns { jwt, user: { email, username, ... } }
        rootStore.auth.setSignedIn(resp.data)
        navigate('/')
      } else {
        await postSignUp(email, password)
        navigate('/login')
      }
    } catch (err) {
      let msg: string = err?.response?.data?.error?.message ?? err.message
      if (msg in translation[language]) msg = translation[language][msg]
      setError(msg)
    }
  }
  const sendEmail = async () => {
    try {
      const t = await postForgotPassword(email)
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
          <Input placeholder={translation[language].email} name="email" required type="email"
            onChange={(v) => setEmail(v)} value={email} className={styles.input}/>
          {/* helperText="Incorrect entry." todo */}
          {/* error todo */}
          <Input placeholder={translation[language].password} name="password" required type="password"
            onChange={(v) => setPassword(v)} value={password} className={styles.input}/>
          {error !== null ? <Alert severity="error">{error}</Alert> : null}
          <Button onClick={submit}>
            {translation[language][props.type === 'signUp' ? 'signUp' : 'login']}
          </Button>
        </form>
        {props.type === 'signIn' ? <><p>
          {translation[language].noAcc}
          {' '}
          <NavLink to="/signup">
            {translation[language].signUp}
          </NavLink>
        </p>
        {/* TODO:   */}
        {/*<p style={{alignItems: 'center', display: 'flex', gap: '10px'}}>
          {translation[language].forgot_password}
          <Button onClick={sendEmail}>
            {translation[language].send_password_reset_email}
          </Button>
        </p>*/}
        </> :
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