import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { navigation, navigationItem, lineAnim } from '../utils/animation';

const MotionLink = motion.create(Link);

export default function Nav() {
  const middleLinks = [
    { name: 'EXPLORE', path: '/explore' },
    { name: 'CHATS', path: '/chats' },
    { name: 'PROFILE', path: '/profile' },
  ];

  const rightLinks = [
    { name: 'LOG IN', path: '/login' },
    { name: 'SIGN UP', path: '/register' },
  ];

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <motion.nav
      variants={navigation}
      initial="hidden"
      animate="visible"
      className={`flex justify-between align-center w-full font-bold text-lg font-roboto ${isHomePage ? 'text-black' : 'text-white'} p-8 fixed z-2`}>
      {/* Left nav links */}
      <div>
        <MotionLink to="/" variants={navigationItem}>
          ko task na praks
        </MotionLink>
      </div>
      {/* Middle nav links*/}
      <div className="flex gap-12">
        {middleLinks.map(link => (
          <MotionLink
            key={link.name}
            to={link.path}
            variants={navigationItem}
            className="relative">
            {link.name}
            <motion.div
              className="absolute inset-0 z-20"
              initial="initial"
              whileHover="hovered">
              <motion.div
                className="absolute inset-0 z-10 border-l-2"
                variants={lineAnim}
              />
            </motion.div>
          </MotionLink>
        ))}
      </div>
      {/* Right nav links */}
      <div className="flex gap-8 mr-8">
        {rightLinks.map(link => (
          <MotionLink
            key={link.name}
            to={link.path}
            variants={navigationItem}
            className="relative">
            {link.name}
            <motion.div
              className="absolute inset-0 z-20"
              initial="initial"
              whileHover="hovered">
              <motion.div
                className="absolute inset-0 z-10 border-l-2"
                variants={lineAnim}
              />
            </motion.div>
          </MotionLink>
        ))}
      </div>
    </motion.nav>
  );
}
