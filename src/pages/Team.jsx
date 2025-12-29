import { motion } from 'framer-motion';
import TeamCard from '../components/TeamCard';
import content from '../data/content.json';

const Team = () => {
  const { team } = content;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  return (
    <main className="relative pt-24 pb-20 min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl"
          animate={{
            y: [0, 50, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-40 left-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass border border-secondary/20 text-sm font-medium text-muted-foreground mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            👋 Get to Know Us
          </motion.span>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            <span className="text-gradient-secondary">{team.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {team.subtitle}
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {team.members.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </motion.div>

        {/* Join the team CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="inline-block p-8 rounded-3xl glass border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Want to be part of the team?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We're always looking for passionate individuals to join our community.
            </p>
            <motion.button
              className="px-8 py-3 rounded-full bg-gradient-secondary text-secondary-foreground font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Team;
