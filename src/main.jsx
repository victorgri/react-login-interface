import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const clientId = '123777442557-c0o4juhrui9sft1bpsbburtpvbkna2ja.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId={clientId}>
    <App />
</GoogleOAuthProvider>

)
