import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  // Code2,
  Heart,
} from "lucide-react";
import content from "../data/content.json";

const Footer = () => {
  const { footer } = content;

  const socialIcons = {
    GitHub: Github,
    LinkedIn: Linkedin,
    Instagram: Instagram,
    Discord: MessageCircle,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative bg-navy-deep border-t border-border/30">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              {/* <Code2 className="w-8 h-8 text-primary" /> */}
              <img src="/logo.png" alt="Code Vimarsh Logo" className="w-12 h-12 relative z-10" />
              <span className="text-2xl font-bold text-white">
                {footer.brand}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {footer.description}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Team
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Connect With Us
            </h3>
            <div className="flex gap-3">
              {footer.socials.map((social) => {
                const Icon = socialIcons[social.platform];
                return (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </motion.a>
                );
              })}
            </div>
            <p className="text-sm font-mono text-muted-foreground">
              // {footer.tagline}
            </p>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

        {/* Copyright */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>{footer.copyright}</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> by
            Code Vimarsh
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
