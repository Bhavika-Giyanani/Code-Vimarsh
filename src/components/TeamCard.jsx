import { motion } from 'framer-motion';
import { Github, Linkedin, User } from 'lucide-react';

const TeamCard = ({ member, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateY: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut'
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      className="group relative"
      variants={cardVariants}
    >
      <div className="relative bg-card border border-border/50 rounded-2xl overflow-hidden card-elevated hover:border-primary/30 transition-all duration-500">
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Profile image area */}
        <div className="relative h-48 bg-gradient-to-br from-navy to-steel overflow-hidden">
          {/* Abstract pattern background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-primary/30 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-secondary/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-accent/10 rounded-full" />
          </div>
          
          {/* Avatar placeholder */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full bg-card border-4 border-card overflow-hidden shadow-lg z-10"
            whileHover="hover"
          >
            <motion.div
              className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
              variants={imageVariants}
            >
              <User className="w-12 h-12 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative pt-16 pb-6 px-6 text-center">
          <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-gradient transition-all duration-300">
            {member.name}
          </h3>
          <p className="text-sm font-medium text-primary mb-3">
            {member.role}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {member.bio}
          </p>

          {/* Social links */}
          <div className="flex items-center justify-center gap-3">
            <motion.a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-background/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
            </motion.a>
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-background/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

export default TeamCard;
