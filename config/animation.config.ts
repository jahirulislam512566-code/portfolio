export const animationConfig = {
  // Global animation settings
  global: {
    duration: 0.5,
    delay: 0.1,
    ease: "easeInOut" as const

,
    once: true,
    amount: 0.1,
    reset: false,
  },

  // Scroll animations
  scroll: {
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: "easeOut" as const

 },
    },
    fadeInUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, ease: "easeOut" as const

 },
    },
    fadeInDown: {
      initial: { opacity: 0, y: -40 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, ease: "easeOut" as const

 },
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -40 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.7, ease: "easeOut" as const

 },
    },
    fadeInRight: {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.7, ease: "easeOut" as const

 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, ease: "easeOut" as const

 },
    },
    slideUp: {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, ease: "easeOut" as const

 },
    },
  },

  // Stagger animations for lists
  stagger: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut" as const

,
        },
      },
    },
  },

  // Hover animations
  hover: {
    scale: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    lift: {
      y: -5,
      transition: { duration: 0.2 },
    },
    glow: {
      boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
      transition: { duration: 0.3 },
    },
    rotate: {
      rotate: 3,
      transition: { duration: 0.2 },
    },
  },

  // Page transitions
  page: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 },
    },
    slideIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3 },
    },
    slideInRight: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { duration: 0.3 },
    },
  },

  // Loading animations
  loading: {
    spinner: {
      animate: { rotate: 360 },
      transition: { repeat: Infinity, duration: 1, ease: "linear" },
    },
    pulse: {
      animate: { opacity: [0.5, 1, 0.5] },
      transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" as const

 },
    },
    shimmer: {
      initial: { backgroundPosition: "-200% 0" },
      animate: { backgroundPosition: "200% 0" },
      transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
    },
  },

  // Particle effects
  particles: {
    default: {
      quantity: 50,
      staticity: 30,
      ease: 50,
      size: 4,
      color: "#6366f1",
      refresh: true,
    },
    minimal: {
      quantity: 30,
      staticity: 50,
      ease: 30,
      size: 3,
      color: "#8b5cf6",
      refresh: true,
    },
  },

  // Typing animation
  typing: {
    speed: 50,
    delay: 1000,
    loop: true,
    cursor: true,
    cursorClassName: "typing-cursor",
  },

  // Scroll progress animation
  scrollProgress: {
    height: 3,
    color: "from-purple-600 to-pink-600",
    position: "top-0",
    zIndex: 50,
  },

  // Number counting animation
  counter: {
    duration: 2,
    easing: "easeOut",
    separator: ",",
    suffix: "+",
  },
};

// Animation variants for framer-motion
export const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
};

// Animation delays for child elements
export const delayConfig = {
  children: {
    base: 0.1,
    increment: 0.05,
    start: 0.2,
  },
  sections: {
    base: 0.3,
    increment: 0.1,
    start: 0.2,
  },
  cards: {
    base: 0.1,
    increment: 0.08,
    start: 0.1,
  },
};

// Responsive animation adjustments
export const responsiveAnimations = {
  mobile: {
    enabled: true,
    reduceMotion: true,
    duration: 0.3,
  },
  tablet: {
    enabled: true,
    reduceMotion: false,
    duration: 0.5,
  },
  desktop: {
    enabled: true,
    reduceMotion: false,
    duration: 0.6,
  },
};