import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from 'components/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // todo React.StrictMode
    <BrowserRouter>
      <App/>
    </BrowserRouter>
)
