import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(smoothProgress, [0, 0.5], [0, 150]);

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
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
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
          {/* Gradient orbs with parallax */}
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />

          {/* Animated grid pattern */}
          <motion.div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                               linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "60px 60px"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 container mx-auto px-4 text-center"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge with pulse effect */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm font-medium text-muted-foreground">
                Where Ideas Transform Into Reality
              </span>
            </motion.div>

            {/* Title with stagger effect */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
              variants={itemVariants}
            >
              <motion.span
                className="text-foreground inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {"<"}
              </motion.span>
              <motion.span
                className="text-gradient glow-text inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                {home.hero.title}
              </motion.span>
              <motion.span
                className="text-foreground inline-block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                {" />"}
              </motion.span>
            </motion.h1>

            {/* Subtitle with fade up */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4 font-light"
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

            {/* CTAs with spring animation */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => setShowJoinModal(true)}
                className="px-8 py-4 rounded-full bg-gradient-primary text-primary-foreground font-semibold text-lg glow-primary relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">{home.hero.cta.primary}</span>
              </motion.button>
              <Link to="/events">
                <motion.button
                  className="px-8 py-4 rounded-full border border-border bg-card/50 text-foreground font-semibold text-lg hover:border-primary/50 transition-colors"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {home.hero.cta.secondary}
                </motion.button>
              </Link>
            </motion.div>

            {/* Code snippet with typing effect */}
            <motion.div
              className="mt-16 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              <motion.div
                className="glass rounded-2xl p-6 text-left overflow-hidden"
                whileHover={{
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                  y: -5,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-primary"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-accent"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-muted"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <pre className="text-sm md:text-base font-mono text-muted-foreground overflow-x-auto">
                  <code className="whitespace-pre">
                    {home.codeSnippet.code.split("\n").map((line, i) => (
                      <motion.span
                        key={i}
                        className="block"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 1.2 + i * 0.15,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
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
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator with bounce */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{
              y: [0, 15, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {home.about.title}
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {home.about.subtitle}
            </motion.p>
          </motion.div>

          <motion.p
            className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {home.about.content}
          </motion.p>

          {/* Stats with counter animation */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {home.about.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 glass rounded-2xl relative overflow-hidden group"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 * i,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-gradient mb-2 relative z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2 * i,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground font-medium relative z-10">
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
          <motion.div
            className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"
            animate={{
              x: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
                  initial={{ opacity: 0, y: 60, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.15 * i,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -15,
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {/* Icon with rotation */}
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 glow-primary"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {Icon && (
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    )}
                  </motion.div>

                  <motion.h3
                    className="text-xl font-bold text-foreground mb-3 group-hover:text-gradient transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 * i + 0.2 }}
                  >
                    {point.title}
                  </motion.h3>
                  <motion.p
                    className="text-muted-foreground text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 * i + 0.3 }}
                  >
                    {point.description}
                  </motion.p>

                  {/* Decorative number */}
                  <motion.div
                    className="absolute top-4 right-4 text-6xl font-bold text-foreground/5"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 * i + 0.1 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.div>

                  {/* Hover effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                    transition={{ duration: 0.3 }}
                  />
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
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 15, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [360, 180, 0],
                }}
                transition={{ duration: 12, repeat: Infinity }}
              />
            </div>

            <div className="relative z-10">
              <motion.h2
                className="text-3xl md:text-5xl font-bold text-foreground mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Ready to Start Your Journey?
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Join Code Vimarsh today and become part of a community that's
                shaping the future of technology.
              </motion.p>
              <motion.button
                onClick={() => setShowJoinModal(true)}
                className="px-10 py-5 rounded-full bg-gradient-primary text-primary-foreground font-bold text-lg glow-primary relative overflow-hidden group"
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%", skewX: -15 }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Join Now</span>
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
