import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class RegistrasiInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStep: 1,
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            namaLengkap: '',
            nip: '',
            noHp: '',
            jabatan: '',
            namaSekolah: '',
            errors: {},
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onNamaLengkapChange = this.onNamaLengkapChange.bind(this);
        this.onNipChange = this.onNipChange.bind(this);
        this.onNoHpChange = this.onNoHpChange.bind(this);
        this.onJabatanChange = this.onJabatanChange.bind(this);
        this.onNamaSekolahChange = this.onNamaSekolahChange.bind(this);
        this.onNextStep = this.onNextStep.bind(this);
        this.onPrevStep = this.onPrevStep.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onUsernameChange(e) { this.setState({ username: e.target.value }); }
    onEmailChange(e) { this.setState({ email: e.target.value }); }
    onPasswordChange(e) { this.setState({ password: e.target.value }); }
    onConfirmPasswordChange(e) { this.setState({ confirmPassword: e.target.value }); }
    onNamaLengkapChange(e) { this.setState({ namaLengkap: e.target.value }); }
    onNipChange(e) { this.setState({ nip: e.target.value }); }
    onNoHpChange(e) { this.setState({ noHp: e.target.value }); }
    onJabatanChange(e) { this.setState({ jabatan: e.target.value }); }
    onNamaSekolahChange(e) { this.setState({ namaSekolah: e.target.value }); }

    validateStep1() {
        const { username, email, password, confirmPassword } = this.state;
        const errors = {};
        if (!username.trim()) errors.username = 'Username tidak boleh kosong';
        else if (!/^[a-z.]+$/.test(username)) errors.username = 'Username tidak boleh spasi dan menggunakan huruf kecil';
        if (!email.trim()) errors.email = 'Email tidak boleh kosong';
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email)) errors.email = 'Format email tidak valid';
        if (!password) errors.password = 'Password tidak boleh kosong';
        else if (password.length < 8) errors.password = 'Password minimal 8 karakter';
        if (!confirmPassword) errors.confirmPassword = 'Konfirmasi password tidak boleh kosong';
        else if (password !== confirmPassword) errors.confirmPassword = 'Password tidak cocok';
        return errors;
    }

    validateStep2() {
        const { namaLengkap, nip, noHp, jabatan, namaSekolah } = this.state;
        const errors = {};
        if (!namaLengkap.trim()) errors.namaLengkap = 'Nama lengkap tidak boleh kosong';
        if (!nip.trim()) errors.nip = 'NIP tidak boleh kosong';
        else if (!/^[0-9]+$/.test(nip)) errors.nip = 'NIP hanya boleh berisi angka';
        if (!noHp.trim()) errors.noHp = 'No HP tidak boleh kosong';
        else if (!/^[0-9]{10,13}$/.test(noHp)) errors.noHp = 'No HP tidak valid';
        if (!jabatan.trim()) errors.jabatan = 'Jabatan tidak boleh kosong';
        else if (!/^[a-zA-Z\s]+$/.test(jabatan)) errors.jabatan = 'Jabatan hanya boleh berisi huruf';
        if (!namaSekolah.trim()) errors.namaSekolah = 'Nama sekolah tidak boleh kosong';
        return errors;
    }

    onNextStep() {
        const errors = this.validateStep1();
        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }
        this.setState({ errors: {}, currentStep: 2 });
    }

    onPrevStep() {
        this.setState({ currentStep: 1, errors: {} });
    }

    onSubmitHandler(event) {
        event.preventDefault();
        const errors = this.validateStep2();
        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }
        this.setState({ errors: {}, currentStep: 3 });
        if (this.props.onRegistrasi) {
            this.props.onRegistrasi({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                namaLengkap: this.state.namaLengkap,
                nip: this.state.nip,
                noHp: this.state.noHp,
                jabatan: this.state.jabatan,
                namaSekolah: this.state.namaSekolah,
            });
        }
    }

    renderStepIndicator() {
        const { currentStep } = this.state;
        const steps = ['Akun', 'Data Diri', 'Selesai'];
        return (
            <div className="flex items-center w-full mt-8">
                {steps.map((label, i) => (
                    <React.Fragment key={i}>
                        <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep > i + 1 ? 'bg-green-500 text-white' : currentStep === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-black'}`}>
                                {currentStep > i + 1 ? <i className="ri-check-line"></i> : i + 1}
                            </div>
                            <span className="ml-2 font-semibold text-sm">{label}</span>
                        </div>
                        {i < steps.length - 1 && <div className="flex-1 h-px bg-gray-300 mx-4"></div>}
                    </React.Fragment>
                ))}
            </div>
        );
    }

    render() {
        const { currentStep, username, email, password, confirmPassword, namaLengkap, nip, noHp, jabatan, namaSekolah, errors } = this.state;

        return (
            <div className="mx-auto w-150 m-10 px-8 pt-10 pb-10 bg-white rounded-3xl border-2 border-gray-100 shadow-lg">
                <div className="flex items-center gap-3">
                    <i className="ri-brain-fill ri-2x leading-none text-sky-600"></i>
                    <h1 className="text-3xl font-semibold text-blue-800">EduPredict</h1>
                </div>
                <div className="mt-4 inline-flex p-2 font-medium text-blue-800 bg-blue-100 px-4 rounded-3xl gap-2">
                    <i className="ri-computer-line"></i>
                    <h3>Registrasi Guru</h3>
                </div>

                {this.renderStepIndicator()}

                {/* Step 1 - Buat Akun */}
                {currentStep === 1 && (
                    <div>
                        <h1 className="text-4xl font-semibold mt-6">Buat akun baru</h1>
                        <p className="text-lg mt-2 opacity-75">Lengkapi data akun untuk melanjutkan</p>
                        <div className="mt-6">
                            <label className="text-lg font-medium">Username</label>
                            <input type="text" value={username} onChange={this.onUsernameChange} placeholder="masukkan username anda" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                        </div>
                        <div className="mt-4">
                            <label className="text-lg font-medium">Email</label>
                            <input type="email" value={email} onChange={this.onEmailChange} placeholder="masukkan email anda" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>
                        <div className="mt-4">
                            <label className="text-lg font-medium">Password</label>
                            <input type="password" value={password} onChange={this.onPasswordChange} placeholder="masukkan password anda" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                        </div>
                        <div className="mt-4">
                            <label className="text-lg font-medium">Konfirmasi Password</label>
                            <input type="password" value={confirmPassword} onChange={this.onConfirmPasswordChange} placeholder="konfirmasi password anda" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                        </div>
                        <div className="mt-8 flex flex-col gap-y-4">
                            <button type="button" onClick={this.onNextStep} className="bg-blue-900 text-white py-3 rounded-xl hover:bg-stone-900">Lanjut <i className="ri-arrow-right-long-line"></i></button>
                            <div className="mt-2 flex justify-between items-center">
                                <p className="font-medium text-base">Sudah punya akun?</p>
                                <NavLink to="/login-guru" className="font-medium text-base text-blue-500">Masuk</NavLink>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2 - Data Diri */}
                {currentStep === 2 && (
                    <form onSubmit={this.onSubmitHandler}>
                        <h1 className="text-4xl font-semibold mt-6">Data Diri</h1>
                        <p className="text-lg mt-2 opacity-75">Lengkapi data diri untuk mengakses sistem deteksi dini</p>
                            <div className="mt-4">
                                <label className="text-lg font-medium">Nama Lengkap</label>
                                <input type="text" value={namaLengkap} onChange={this.onNamaLengkapChange} placeholder="masukkan nama lengkap" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                                {errors.namaLengkap && <p className="mt-1 text-sm text-red-500">{errors.namaLengkap}</p>}
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-lg font-medium">NIP</label>
                                <input type="text" value={nip} onChange={this.onNipChange} placeholder="masukkan NIP" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                                {errors.nip && <p className="mt-1 text-sm text-red-500">{errors.nip}</p>}
                            </div>
                            <div>
                                <label className="text-lg font-medium">No HP</label>
                                <input type="text" value={noHp} onChange={this.onNoHpChange} placeholder="masukkan no HP" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                                {errors.noHp && <p className="mt-1 text-sm text-red-500">{errors.noHp}</p>}
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-lg font-medium">Jabatan</label>
                                <input type="text" value={jabatan} onChange={this.onJabatanChange} placeholder="masukkan jabatan" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                                {errors.jabatan && <p className="mt-1 text-sm text-red-500">{errors.jabatan}</p>}
                            </div>
                            <div>
                                <label className="text-lg font-medium">Nama Sekolah</label>
                                <input type="text" value={namaSekolah} onChange={this.onNamaSekolahChange} placeholder="masukkan nama sekolah" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                                {errors.namaSekolah && <p className="mt-1 text-sm text-red-500">{errors.namaSekolah}</p>}
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col gap-y-4">
                            <button type="submit" className="bg-blue-900 text-white py-3 rounded-xl hover:bg-stone-900">Daftar <i className="ri-check-line"></i></button>
                            <button type="button" onClick={this.onPrevStep} className="border-2 border-blue-900 text-blue-900 py-3 rounded-xl hover:bg-blue-50"><i className="ri-arrow-left-long-line"></i> Kembali</button>
                        </div>
                    </form>
                )}

                {/* Step 3 - Selesai */}
                {currentStep === 3 && (
                    <div className="flex flex-col items-center text-center py-10">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                            <i className="ri-checkbox-circle-line text-5xl text-green-500"></i>
                        </div>
                        <h1 className="text-3xl font-bold mb-3">Registrasi Berhasil!</h1>
                        <p className="text-lg opacity-75 mb-6">Berikut ringkasan pendaftaran akun kamu.</p>
                        <div className="w-full bg-blue-50 rounded-2xl p-6 text-left border border-blue-100 mb-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-500">Nama Lengkap</p>
                                    <p className="font-semibold">{namaLengkap}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">NIP</p>
                                    <p className="font-semibold">{nip}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Email</p>
                                    <p className="font-semibold">{email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">No HP</p>
                                    <p className="font-semibold">{noHp}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Jabatan</p>
                                    <p className="font-semibold">{jabatan}</p>
                                </div>
                            </div>
                        </div>
                        <NavLink to="/login-guru" className="bg-blue-900 text-white px-8 py-3 rounded-xl hover:bg-stone-900">Kembali ke halaman login</NavLink>
                    </div>
                )}
            </div>
        );
    }
}

RegistrasiInput.propTypes = {
    onRegistrasi: PropTypes.func,
};

export default RegistrasiInput;
