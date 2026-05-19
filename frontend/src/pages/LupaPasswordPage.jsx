import React from 'react';

import { NavLink } from 'react-router-dom';

function LupaPasswordPage() {
  return (
     <div className="mx-auto w-150 h-130 m-10 px-8 pt-10 pb-10 bg-white rounded-3xl border-2 border-gray-100 shadow-lg">
            <div className="flex items-center gap-3">
                <i className="ri-brain-fill ri-2x leading-none text-sky-600"></i>
                <h1 className="text-3xl font-semibold text-blue-800">EduPredict</h1>
            </div>
            <h1 className="text-4xl font-semibold mt-4">Lupa Password?</h1>
            <p className="text-lg mt-4 opacity-75">Masukkan email yang terdaftar untuk reset password</p>
            {/*input lupa passwod*/}
            <div className="mt-8">
                <label className="text-lg font-medium">Email</label>
                <input className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" placeholder="masukkan email anda"/>
            </div>
            {/*input lupa passwod*/}

            <div className="mt-8 flex flex-col gap-y-4">
                <button className="bg-blue-900 text-white py-3 rounded-xl hover:bg-stone-900"><i class="ri-mail-line"></i> Kirim</button>
                <div className="mt-4 text-center">
                    <i class="ri-arrow-left-long-line"></i>
                    <NavLink to="/login-guru" className="font-medium text-base text-blue-500"> Kembali ke login</NavLink>
                </div>
            </div>
        </div>
  );
}

export default LupaPasswordPage;