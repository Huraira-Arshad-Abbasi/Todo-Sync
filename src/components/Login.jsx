import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <div className="flex mx-auto items-center">
                <form onSubmit={handleSubmit} className='flex flex-col justify-center h-[80vh] w-[50vw] mx-auto p-9 bg-blue-100'>
                    <label htmlFor='email' className='text-center font-extrabold text-slate-600 font-mono my-4'>Email</label>
                    <input
                        className='outline-none rounded'
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor='password' className='text-center font-extrabold text-slate-600 font-mono my-4'>Password</label>
                    <input
                        className='outline-none rounded'
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='bg-slate-300 my-4 transition-all hover:bg-slate-400' type="submit">Login</button>
                </form>
                <div className="image w-[50vw] bg-slate-50 flex justify-center items-center">here is the image of todolist app</div>
            </div>
        </>
    );
}

export default Login;
