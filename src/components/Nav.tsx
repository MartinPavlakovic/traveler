import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { navigation, navigationItem, MotionLink } from '../utils/animation';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import ButtonLine from './ButtonLine';
import { useAuth } from '../context/AuthContext';

export default function Nav() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      alert('Signed out successfully');
      if (location.pathname !== '/') {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };
  console.log(user);

  const middleLinks = [
    { name: 'EXPLORE', path: '/explore', protected: false },
    { name: 'CHATS', path: '/chats', protected: true },
    { name: 'PROFILE', path: '/profile', protected: true },
  ];

  const availableLinks = middleLinks.filter(link => {
    if (link.protected && !user) return false;
    return true;
  });

  const location = useLocation();
  const lightTextPages = ['/', '/login', '/register'];
  const isLightText = lightTextPages.includes(location.pathname);

  return (
    <motion.nav
      variants={loading ? {} : navigation}
      initial={loading ? 'visible' : 'hidden'}
      animate="visible"
      className={`flex justify-between items-center w-full font-bold text-lg font-roboto ${
        isLightText ? 'text-white' : 'text-black'
      } p-8 fixed z-2`}>
      {/* Left nav links */}
      <MotionLink to="/" variants={navigationItem}>
        ko task na praks
      </MotionLink>

      {/* Middle nav links */}
      <motion.div className="flex gap-12">
        {availableLinks.map(link => (
          <MotionLink
            key={link.name}
            to={link.path}
            variants={navigationItem}
            className="relative">
            {link.name}
            <ButtonLine />
          </MotionLink>
        ))}
      </motion.div>

      {/* Right nav links */}
      <motion.div className="flex gap-8 mr-8">
        {user ? (
          <motion.button
            onClick={handleLogout}
            variants={navigationItem}
            className="relative cursor-pointer bg-transparent border-none">
            LOG OUT
            <ButtonLine />
          </motion.button>
        ) : (
          <>
            <MotionLink
              to="/login"
              variants={navigationItem}
              className="relative">
              LOG IN
              <ButtonLine />
            </MotionLink>
            <MotionLink
              to="/register"
              variants={navigationItem}
              className="relative">
              SIGN UP
              <ButtonLine />
            </MotionLink>
          </>
        )}
      </motion.div>
    </motion.nav>
  );
}
