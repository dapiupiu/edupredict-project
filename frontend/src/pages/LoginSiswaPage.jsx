import React, { useState } from 'react';
import BASE_URL from '../utils/api';
//import { useNavigate } from 'react-router-dom';
import LoginSiswaInput from '../compenents/LoginSiswaInput';

function LoginSiswaPage() {
  const [NISN, setNISN] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  const [errors, setErrors] = useState({});

  //const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!NISN.trim()) {
      newErrors.NISN = 'NISN wajib diisi, tidak boleh kosong';
    } else if (!/^[0-9]{8}$/.test(NISN)) { 
      newErrors.NISN = 'NISN harus terdiri dari 8 digit angka';
    }
    return newErrors;
  };

  // Handler untuk memastikan input hanya angka dan maksimal 8 karakter
  const handleNISNChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 8) {
      setNISN(value);
    }
  };

  const onCheckNISN = async (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setApiError('');
      setApiSuccess('');
      return;
    }

    setErrors({});
    setApiError('');
    setApiSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/student/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nisn: NISN }),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.message || 'Terjadi kesalahan saat memeriksa NISN.');
        setApiSuccess('');
        return;
      }

      setApiSuccess(`NISN ${NISN} ditemukan. Selamat datang, ${data.data.siswa.nama}!`);
      setApiError('');
      console.log('NISN ditemukan:', data);
      
      //navigate('/dashboard-siswa', { state: { studentData: data.data } });
    } catch (error) {
      setApiError('Terjadi kesalahan jaringan. Silakan coba lagi.');
      setApiSuccess('');
      console.error('Error checking NISN:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <LoginSiswaInput
        NISN={NISN}
        errors={errors}
        apiError={apiError}
        apiSuccess={apiSuccess}
        isLoading={isLoading}
        onNISNChange={handleNISNChange}
        onSubmit={onCheckNISN}
      />
  </div>
  );
};

export default LoginSiswaPage;
