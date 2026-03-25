import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Background from '../components/Background';
import GoogleIcon from '../components/GoogleIcon';
import { buttonAnim, MotionLink } from '../utils/animation';
import { auth, db } from '../firebase/config';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/" />;

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        alert('Invalid email or password');
      } else {
        alert('Something went wrong');
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, provider);
      const [firstName = '', ...rest] = user.displayName?.split(' ') || [];
      const lastName = rest.join(' ');
      const userRef = doc(db, 'users', user.uid);

      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email,
          firstName: firstName,
          lastName: lastName,
        },
        { merge: true },
      );
      navigate('/');
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        alert(err.message);
      }
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <Background />
      <motion.form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md px-6 py-10 bg-white rounded-xl shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500">Log in to your account</p>
        </div>

        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 hover:border-aqua focus:border-aqua focus:outline-none rounded-lg mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 hover:border-aqua focus:border-aqua focus:outline-none rounded-lg mb-4"
          />
        </div>

        <motion.button
          {...buttonAnim}
          type="submit"
          className="w-full py-3 bg-linear-to-r from-aqua to-peach text-gray-800 font-semibold rounded-lg cursor-pointer mb-4">
          Login
        </motion.button>

        <motion.button
          {...buttonAnim}
          type="submit"
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-white text-gray-800 border font-semibold rounded-lg cursor-pointer mb-4 flex items-center justify-center">
          <GoogleIcon />
          Sign up with google
        </motion.button>

        <MotionLink
          {...buttonAnim}
          to="/register"
          className="block py-2 text-gray-600 font-medium cursor-pointer text-center">
          Don't have an account? Sign up
        </MotionLink>
      </motion.form>
    </div>
  );
}
