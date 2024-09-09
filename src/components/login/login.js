import React, { useState } from 'react';
import { Button } from 'primereact/button';        // Importar corretamente o componente Button
import { Checkbox } from 'primereact/checkbox';    // Importar corretamente o componente Checkbox
import { InputText } from 'primereact/inputtext';  // Importar corretamente o componente InputText
import { Card } from 'primereact/card';            // Importar corretamente o componente Card
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';                   // Certifique-se de ter a dependência js-cookie instalada

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simular o redirecionamento após o login
        if (rememberMe) {
            Cookies.set('username', username, { expires: 7 }); // Cookie expira em 7 dias
        } else {
            localStorage.setItem('username', username);
        }
        navigate('/ListarParceiros'); // Redireciona para a página inicial
    };

    return (
        <div className="login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card title="Login" style={{ width: '300px' }}>
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="username">Usuário</label>
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Senha</label>
                        <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="field-checkbox">
                        <Checkbox inputId="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.checked)} />
                        <label htmlFor="rememberMe">Manter Conectado</label>
                    </div>
                    <Button label="Entrar" onClick={handleLogin} className="p-mt-3" />
                </div>
            </Card>
        </div>
    );
}
