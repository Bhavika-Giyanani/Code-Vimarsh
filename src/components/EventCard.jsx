import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

const EventCard = ({ event, index }) => {
  const typeColors = {
    Workshop: 'bg-accent text-accent-foreground',
    Hackathon: 'bg-primary text-primary-foreground',
    Community: 'bg-secondary text-secondary-foreground',
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden card-elevated hover:border-primary/30 transition-all duration-500"
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative p-6 md:p-8">
        {/* Event type badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColors[event.type] || 'bg-muted text-muted-foreground'}`}>
            {event.type}
          </span>
          <motion.div
            className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ rotate: 45 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-gradient transition-all duration-300">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
          {event.description}
        </p>

        {/* Meta info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Register button */}
        <motion.button
          className="mt-6 w-full py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Register Now
        </motion.button>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default EventCard;
