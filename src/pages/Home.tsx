import BackgroundImage from '../assets/background.jpg';
import { motion } from 'motion/react';
import { navigation, navigationItem } from '../utils/animation';

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <motion.img
        initial={{ filter: 'blur(10px)', scale: 1.1 }}
        animate={{ filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        src={BackgroundImage}
        alt="BackgroundImage"
        className="absolute w-full h-full object-cover -z-1"
      />
      <motion.div
        className="w-full h-full"
        variants={navigation}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, ease: 'easeOut' }}>
        <div className="w-1/2 h-full flex flex-col items-start justify-center pl-40">
          <motion.h1
            variants={navigationItem}
            className="text-7xl font-bold text-white mb-4">
            Sydney
          </motion.h1>
          <motion.p variants={navigationItem} className="text-xl text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            sapiente.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
