import { motion } from 'motion/react';
import Background from '../components/Background';
import { buttonAnim, MotionLink } from '../utils/animation';
import { setDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { user: authUser, loading } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profileImageURL: '',
  });
  if (loading) return null;
  if (authUser) return <Navigate to='/' />;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const { password, ...newUser } = user;

    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        user.email.trim(),
        user.password.trim(),
      );
      await setDoc(doc(db, 'users', createdUser.user.uid), newUser);
      alert('User created successfully');
      navigate('/');
    } catch {
      alert('sum-ting went-wong');
    }
  };

  return (
    <>
      <div className='relative w-full h-screen overflow-hidden flex items-center justify-center'>
        <Background />
        <motion.form
          onSubmit={handleRegister}
          className='w-full max-w-md px-6 py-10 bg-white rounded-xl'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>
              Welcome to our website
            </h1>
            <p className='text-gray-500'>Register your account</p>
          </div>

          <div className='mb-6'>
            <input
              required
              type='text'
              name='firstName'
              placeholder='First name'
              className='w-full px-4 py-3 border border-gray-300 hover:border-aqua focus:border-aqua focus:outline-none rounded-lg mb-4'
              value={user.firstName}
              onChange={handleInputChange}
            />
            <input
              required
              type='text'
              name='lastName'
              placeholder='Last name'
              className='w-full px-4 py-3 border border-gray-300 hover:border-aqua focus:border-aqua focus:outline-none rounded-lg mb-4'
              value={user.lastName}
              onChange={handleInputChange}
            />
            <input
              required
              type='email'
              name='email'
              placeholder='Email'
              className='w-full px-4 py-3 border border-gray-300 hover:border-aqua focus:border-aqua focus:outline-none rounded-lg mb-4'
              value={user.email}
              onChange={handleInputChange}
            />
            <input
              required
              type='password'
              name='password'
              placeholder='Password'
              className='w-full px-4 py-3 border border-gray-300 hover:border-aqua focus:border-aqua focus:outline-none rounded-lg mb-4'
              value={user.password}
              onChange={handleInputChange}
            />
          </div>

          <motion.button
            {...buttonAnim}
            type='submit'
            className='w-full py-3 bg-linear-to-l from-aqua to-peach text-gray-800 font-semibold rounded-lg cursor-pointer mb-4'>
            Register
          </motion.button>

          <MotionLink
            {...buttonAnim}
            to='/login'
            className='block py-2 text-gray-600 font-medium cursor-pointer text-center'>
            Oops, I already have an account. Log in
          </MotionLink>
        </motion.form>
      </div>
    </>
  );
}
