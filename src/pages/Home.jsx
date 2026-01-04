import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code,
  Users,
  Rocket,
  Globe,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import content from "../data/content.json";
import FormModal from "../components/FormModal";

const Home = () => {
  const { home } = content;
  const heroRef = useRef(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Ensure animations are visible after splash screen
  useEffect(() => {
    setIsReady(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end center"],
  });

  // Softer scroll transforms to reduce jitter
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 50]);

  const icons = {
    code: Code,
    users: Users,
    rocket: Rocket,
    globe: Globe,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <main className="relative overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20"
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs */}
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl"
            animate={{
              x: [0, -25, 0],
              y: [0, -15, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.35, 0.3] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                               linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 container mx-auto px-4 text-center"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isReady ? "visible" : "hidden"}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8"
              variants={itemVariants}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                {home.hero.badge}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
              variants={itemVariants}
            >
              <span className="text-foreground">{"<"}</span>
              <span className="text-gradient glow-text">{home.hero.title}</span>
              <span className="text-foreground">{" />"}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4 font-extrabold"
              variants={itemVariants}
            >
              {home.hero.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-10"
              variants={itemVariants}
            >
              {home.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => setShowJoinModal(true)}
                className="px-8 py-4 rounded-full bg-gradient-primary text-primary-foreground text-lg glow-primary font-extrabold"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
              >
                {home.hero.cta.primary}
              </motion.button>
              <Link to="/events">
                <motion.button
                  className="px-8 py-4 rounded-full border border-border bg-card/50 text-foreground font-semibold text-lg hover:border-primary/50 transition-colors"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {home.hero.cta.secondary}
                </motion.button>
              </Link>
            </motion.div>

            {/* Code snippet preview */}
            <motion.div
              className="mt-16 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              <div className="glass rounded-2xl p-6 text-left overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="w-3 h-3 rounded-full bg-muted" />
                </div>
                <pre className="text-sm md:text-base font-mono text-muted-foreground overflow-x-auto">
                  <code className="whitespace-pre">
                    {home.codeSnippet.code.split("\n").map((line, i) => (
                      <motion.span
                        key={i}
                        className="block"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                      >
                        {line.includes("codeVimarsh") && (
                          <span className="text-primary">{line}</span>
                        )}
                        {line.includes("passion") && (
                          <span className="text-accent">{line}</span>
                        )}
                        {line.includes("members") && (
                          <span className="text-foreground">{line}</span>
                        )}
                        {line.includes("mission") && (
                          <span className="text-primary">{line}</span>
                        )}
                        {line.includes("build") && (
                          <span className="text-accent">{line}</span>
                        )}
                        {line.includes("return") && (
                          <span className="text-foreground">{line}</span>
                        )}
                        {!line.includes("codeVimarsh") &&
                          !line.includes("passion") &&
                          !line.includes("members") &&
                          !line.includes("mission") &&
                          !line.includes("build") &&
                          !line.includes("return") && <span>{line}</span>}
                      </motion.span>
                    ))}
                  </code>
                </pre>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {home.about.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {home.about.subtitle}
            </p>
          </motion.div>

          <motion.p
            className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {home.about.content}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {home.about.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 glass rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                whileHover={{ scale: 1.08, y: -4 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-32 relative bg-secondary">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {home.mission.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {home.mission.points.map((point, i) => {
              const Icon = icons[point.icon];
              return (
                <motion.div
                  key={point.title}
                  className="group relative p-8 bg-card/50 border border-border/50 rounded-2xl hover:border-primary/30 transition-all duration-500"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 glow-primary"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {Icon && (
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    )}
                  </motion.div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gradient transition-all">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {point.description}
                  </p>

                  {/* Decorative number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-foreground/5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative" id="join">
        <div className="container mx-auto px-4">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-card to-accent/10 border border-border/50 p-12 md:p-16 text-center"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <motion.h2
                className="text-3xl md:text-5xl font-bold text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                Ready to Start Your Journey?
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08, duration: 0.4 }}
              >
                Join Code Vimarsh today and become part of a community that's
                shaping the future of technology.
              </motion.p>
              <motion.button
                onClick={() => setShowJoinModal(true)}
                className="px-10 py-5 rounded-full bg-gradient-primary text-primary-foreground font-bold text-lg glow-primary"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
              >
                Join Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Join Club Modal */}
      <FormModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        type="join-club"
      />
    </main>
  );
};

export default Home;
