import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginGuruInput from '../compenents/LoginGuruInput';

function LoginGuruPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = 'Username tidak boleh kosong';
    } else if (!/^[a-z.]+$/.test(username)) {
      newErrors.username = 'Username tidak boleh spasi dan menggunakan huruf kecil';
    }

    if (!password) {
      newErrors.password = 'Password tidak boleh kosong';
    } else if (password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    }
    return newErrors;
  };

  const navigate = useNavigate();

  const onLoginGuru = async (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setApiError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password, rememberMe }),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.message || 'Username atau password salah');
        return;
      }

      console.log('Login berhasil:', data);
      // Simpan token dan data user ke localStorage
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      navigate('/dashboardGuru'); 
    } catch (error) {
      setApiError('Terjadi kesalahan jaringan. Silakan coba lagi.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <LoginGuruInput
        username={username}
        password={password}
        errors={errors}
        apiError={apiError}
        isLoading={isLoading}
        rememberMe={rememberMe}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onRememberMeChange={(e) => setRememberMe(e.target.checked)}
        onSubmit={onLoginGuru}
      />
    </div>
  );
}

export default LoginGuruPage;
