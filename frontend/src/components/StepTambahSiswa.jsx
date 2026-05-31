import React from 'react';

function StepTambahSiswa({ currentStep = 1 }){
    return(
        <div className="flex justify-center items-center gap-3 sm:gap-10 mt-10 max-w-5xl mx-auto px-4">
            <div className="flex flex-col items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base transition-colors duration-500 ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    1
                </div>
                <p className="mt-2 text-[10px] sm:text-sm font-medium whitespace-nowrap">Input Data Siswa</p>
            </div>

            <div className={`flex-1 max-w-[100px] h-1 transition-colors duration-500 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>

            <div className="flex flex-col items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base transition-colors duration-500 ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    2
                </div>
                <p className="mt-2 text-[10px] sm:text-sm font-medium whitespace-nowrap">Prediksi AI</p>
            </div>

            <div className={`flex-1 max-w-[100px] h-1 transition-colors duration-500 ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>

            <div className="flex flex-col items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base transition-colors duration-500 ${currentStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    3
                </div>
                <p className="mt-2 text-[10px] sm:text-sm font-medium whitespace-nowrap">Simpan Data</p>
            </div>
        </div>  
    )
}

export default StepTambahSiswa;