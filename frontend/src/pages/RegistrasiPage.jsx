import React from 'react';
import RegistrasiInput from '../compenents/RegistrasiInput';

function RegistrasiPage() {
    const onRegistrasi = ({ username, email, password }) => {
        console.log('Data registrasi:', { username, email, password });
    };

    return (
        <div className="w-full min-h-screen bg-blue-100 flex items-center justify-center py-10">
            <RegistrasiInput onRegistrasi={onRegistrasi} />
        </div>
    );
}

export default RegistrasiPage;