import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, Phone, MessageSquare, GraduationCap, Code, Calendar } from 'lucide-react';

const FormModal = ({ isOpen, onClose, type, eventTitle = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    year: '',
    branch: '',
    skills: '',
    experience: '',
    motivation: '',
    role: '',
    portfolio: '',
    github: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formConfig = {
    'join-club': {
      title: 'Join Code Vimarsh',
      subtitle: 'Become a part of our coding community',
      fields: ['name', 'email', 'phone', 'year', 'branch', 'motivation'],
      storageKey: 'member_applications',
    },
    'join-team': {
      title: 'Join Our Team',
      subtitle: 'Help us build something amazing',
      fields: ['name', 'email', 'phone', 'year', 'branch', 'role', 'skills', 'experience', 'portfolio', 'github'],
      storageKey: 'team_applications',
    },
    'event-register': {
      title: `Register for ${eventTitle}`,
      subtitle: 'Secure your spot now',
      fields: ['name', 'email', 'phone', 'year', 'branch'],
      storageKey: 'event_registrations',
    },
  };

  const config = formConfig[type] || formConfig['join-club'];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Store in localStorage
    const existingData = JSON.parse(localStorage.getItem(config.storageKey) || '[]');
    const newEntry = {
      ...formData,
      submittedAt: new Date().toISOString(),
      eventTitle: type === 'event-register' ? eventTitle : undefined,
    };
    existingData.push(newEntry);
    localStorage.setItem(config.storageKey, JSON.stringify(existingData));

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        year: '',
        branch: '',
        skills: '',
        experience: '',
        motivation: '',
        role: '',
        portfolio: '',
        github: '',
      });
    }, 2000);
  };

  const fieldComponents = {
    name: (
      <div key="name" className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <User className="w-4 h-4 text-primary" /> Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
          placeholder="Enter your full name"
        />
      </div>
    ),
    email: (
      <div key="email" className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" /> Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
          placeholder="your@email.com"
        />
      </div>
    ),
    phone: (
      <div key="phone" className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Phone className="w-4 h-4 text-primary" /> Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
          placeholder="+91 98765 43210"
        />
      </div>
    ),
    year: (
      <div key="year" className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-primary" /> Year of Study
        </label>
        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
        >
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>
      </div>
    ),
    branch: (
      <div key="branch" className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Code className="w-4 h-4 text-primary" /> Branch/Department
        </label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
          placeholder="e.g., Computer Science"
        />
      </div>
    ),
    skills: (
      <div key="skills" className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Code className="w-4 h-4 text-primary" /> Technical Skills
        </label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
          placeholder="e.g., React, Python, Node.js"
        />
      </div>
    ),
    experience: (
      <div key="experience" className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" /> Experience
        </label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Describe your relevant experience..."
        />
      </div>
    ),
    motivation: (
      <div key="motivation" className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" /> Why do you want to join?
        </label>
        <textarea
          name="motivation"
          value={formData.motivation}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Tell us about your motivation..."
        />
      </div>
    ),
    role: (
      <div key="role" className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <User className="w-4 h-4 text-primary" /> Preferred Role
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
        >
          <option value="">Select Role</option>
          <option value="Technical Lead">Technical Lead</option>
          <option value="Web Developer">Web Developer</option>
          <option value="App Developer">App Developer</option>
          <option value="Content Writer">Content Writer</option>
          <option value="Graphic Designer">Graphic Designer</option>
          <option value="Event Coordinator">Event Coordinator</option>
          <option value="Social Media Manager">Social Media Manager</option>
        </select>
      </div>
    ),
    portfolio: (
      <div key="portfolio" className="space-y-2">
        <label className="text-sm font-medium text-foreground">Portfolio URL (optional)</label>
        <input
          type="url"
          name="portfolio"
          value={formData.portfolio}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
          placeholder="https://yourportfolio.com"
        />
      </div>
    ),
    github: (
      <div key="github" className="space-y-2">
        <label className="text-sm font-medium text-foreground">GitHub Profile</label>
        <input
          type="url"
          name="github"
          value={formData.github}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
          placeholder="https://github.com/username"
        />
      </div>
    ),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-6 md:p-8">
              {isSuccess ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                    >
                      <Send className="w-10 h-10 text-primary" />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Submitted Successfully!</h3>
                  <p className="text-muted-foreground">We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-2">{config.title}</h2>
                    <p className="text-muted-foreground">{config.subtitle}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {config.fields.map(field => fieldComponents[field])}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-50 glow-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Application
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormModal;
