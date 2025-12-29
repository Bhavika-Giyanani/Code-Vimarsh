import { useState } from 'react';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';
import FormModal from '../components/FormModal';
import content from '../data/content.json';

const Events = () => {
  const { events } = content;
  const [selectedEvent, setSelectedEvent] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  return (
    <main className="relative pt-24 pb-20 min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl"
          animate={{
            x: [0, -50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
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
            className="inline-block px-4 py-2 rounded-full glass border border-primary/20 text-sm font-medium text-muted-foreground mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            📅 Mark Your Calendar
          </motion.span>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            <span className="text-gradient">{events.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {events.subtitle}
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {events.items.map((event, index) => (
            <EventCard 
              key={event.id} 
              event={event} 
              index={index}
              onRegister={() => setSelectedEvent(event)}
            />
          ))}
        </motion.div>

        {/* Empty state / More coming soon */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-block px-6 py-4 rounded-2xl glass border border-border/50">
            <p className="text-muted-foreground font-mono text-sm">
              // More events coming soon...
            </p>
          </div>
        </motion.div>
      </div>

      {/* Event Registration Modal */}
      <FormModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        type="event-register"
        eventTitle={selectedEvent?.title || ''}
      />
    </main>
  );
};

export default Events;
