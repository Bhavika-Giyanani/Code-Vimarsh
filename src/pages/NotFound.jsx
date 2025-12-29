import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <main className="min-h-screen flex items-center justify-center relative pt-20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <motion.div
        className="text-center px-4 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-8"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertTriangle className="w-10 h-10 text-primary" />
        </motion.div>

        <h1 className="text-8xl md:text-9xl font-bold text-gradient mb-4">
          404
        </h1>
        
        <p className="text-xl text-muted-foreground mb-2">
          Page not found
        </p>
        
        <p className="text-muted-foreground font-mono mb-8">
          {"// Error: The requested route doesn't exist"}
        </p>

        <Link to="/">
          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
};

export default NotFound;
