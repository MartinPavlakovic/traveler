export const navigation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 0.2,
    },
  },
};

export const navigationItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export const lineAnim = {
  initial: { x: 'calc(0% - 8px)' },
  hovered: { x: 'calc(100% + 8px)' },
};
