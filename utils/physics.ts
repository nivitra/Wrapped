export const physics = {
    // "Heavy Thud" - High stiffness, medium damping for a solid impact
    heavy: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 1.5
    },
    // "Elastic Recoil" - For things that snap back
    elastic: {
        type: "spring",
        stiffness: 400,
        damping: 15,
        mass: 1
    },
    // "Smooth Float" - For ambient motion
    float: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror" as const
    },
    // "Camera Pan" - Slow, linear movement
    pan: {
        duration: 20,
        ease: "linear",
        repeat: Infinity
    }
};
