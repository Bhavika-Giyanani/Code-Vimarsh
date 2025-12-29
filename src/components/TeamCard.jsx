import { motion } from 'framer-motion';
import { Github, Linkedin, User } from 'lucide-react';

const TeamCard = ({ member, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.08,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const contentVariants = {
    hover: {
      y: -4,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const socialVariants = {
    hover: {
      y: -2,
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className="group relative"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="relative bg-gradient-to-br from-card via-card to-muted/20 border border-border/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:border-primary/40">
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        {/* Glowing effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>

        {/* Profile image area */}
        <div className="relative h-80 xl:h-96 overflow-hidden">
          {member.image ? (
            <motion.img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 w-full h-[27rem] md:h-96 xl:h-[29rem] object-cover object-center"
              variants={imageVariants}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary/50">
              {/* Abstract pattern background */}
              <div className="absolute inset-0 opacity-30">
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-primary/40 rounded-full"
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-accent/30 rounded-full"
                  animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-primary/20 rounded-full"
                  animate={{ rotate: 360, scale: [1, 1.08, 1] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <User className="w-20 h-20 text-muted-foreground/60" />
                </motion.div>
              </div>
            </div>
          )}
          
          {/* Gradient overlay at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card via-card/80 to-transparent" />
        </div>

        {/* Content */}
        <motion.div 
          className="relative pt-4 pb-8 px-6 text-center"
          variants={contentVariants}
        >
          <motion.h3 
            className="text-xl xl:text-2xl font-bold text-foreground mb-2 tracking-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {member.name}
          </motion.h3>
          <p className="text-sm xl:text-base font-semibold text-primary/90 mb-6">
            {member.role}
          </p>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4">
            <motion.a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-background to-muted/50 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors duration-300 overflow-hidden group/social"
              variants={socialVariants}
              whileTap={{ scale: 0.9 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
              <Github className="w-5 h-5 relative z-10" />
            </motion.a>
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-background to-muted/50 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors duration-300 overflow-hidden group/social"
              variants={socialVariants}
              whileTap={{ scale: 0.9 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
              <Linkedin className="w-5 h-5 relative z-10" />
            </motion.a>
          </div>
        </motion.div>

        {/* Animated accent line */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        
        {/* Bottom glow effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </motion.div>
  );
};

export default TeamCard;