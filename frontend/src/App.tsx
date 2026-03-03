import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Shield, Download, ArrowRight, CheckCircle, Award, Cloud, Lock, Target, Linkedin, Github, Mail, Menu, X, ExternalLink, Briefcase } from 'lucide-react';
import profileImage from './assets/ee626f234f95b52ba15b8f756a049a5ff9af9aee.png';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const { scrollYProgress } = useScroll();
  
  // Move useTransform to top level - MUST be before any conditional returns
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    // Loading animation
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Track active section
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'expertise', 'credentials', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const companies = [
    { name: 'Kyndryl', role: 'Technical Support Specialist', period: '2022-2023', description: 'Cloud infrastructure management and enterprise support' },
    { name: 'K-DEMS Consulting', role: 'SOC Analyst', period: '2023-2024', description: 'Security operations and incident response' },
    { name: 'Deloitte', role: 'Security Consultant', period: 'Enterprise', description: 'Security advisory and compliance auditing' },
  ];

  const expertise = [
    {
      icon: Shield,
      title: 'SOC Operations',
      description: 'Real-time SIEM monitoring, security event analysis, incident investigation, and proactive threat hunting across enterprise environments.',
      skills: ['Splunk', 'QRadar', 'Log Analysis', 'Incident Response'],
    },
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description: 'Multi-cloud deployment and management across Azure, AWS, and GCP with security-first architecture and compliance adherence.',
      skills: ['Azure', 'AWS', 'GCP', 'Infrastructure as Code'],
    },
    {
      icon: Lock,
      title: 'Vulnerability Management',
      description: 'Comprehensive risk analysis, security assessments, penetration testing, and compliance auditing for regulatory standards.',
      skills: ['Risk Analysis', 'Pen Testing', 'Compliance', 'NIST'],
    },
  ];

  const projects = [
    {
      title: 'Enterprise SIEM Implementation',
      company: 'Financial Services',
      description: 'Deployed comprehensive security monitoring solution with real-time threat detection and automated incident response.',
      technologies: ['Splunk', 'Python', 'AWS', 'Automation'],
      impact: '95% reduction in MTTD',
      link: '#'
    },
    {
      title: 'Multi-Cloud Security Architecture',
      company: 'Healthcare Provider',
      description: 'Designed and implemented secure cloud infrastructure across Azure and AWS with compliance controls.',
      technologies: ['Azure', 'AWS', 'Terraform', 'Security Hub'],
      impact: 'HIPAA compliance achieved',
      link: '#'
    },
    {
      title: 'Vulnerability Assessment Program',
      company: 'Tech Startup',
      description: 'Established comprehensive vulnerability management program with continuous monitoring and remediation workflows.',
      technologies: ['Nessus', 'JIRA', 'ServiceNow'],
      impact: '70% reduction in vulnerabilities',
      link: '#'
    },
  ];

  const certifications = [
    { name: 'Microsoft Azure Security Engineer', status: 'Certified', year: '2024' },
    { name: 'AWS Certified Security - Specialty', status: 'Certified', year: '2023' },
    { name: 'CompTIA Security+', status: 'Certified', year: '2022' },
    { name: 'SIEM & Threat Detection', status: 'Specialized', year: '2023' },
  ];

  const technicalStack = [
    { category: 'Security Tools', items: ['Splunk', 'QRadar', 'Nessus', 'Burp Suite'] },
    { category: 'Cloud Platforms', items: ['Azure', 'AWS', 'GCP', 'Terraform'] },
    { category: 'Networking', items: ['TCP/IP', 'DNS', 'Active Directory', 'VPN'] },
    { category: 'Frameworks', items: ['NIST', 'ISO 27001', 'Agile', 'ITSM'] },
  ];

  const handleGetCV = () => {
    // In production, this would trigger actual CV download
    console.log('Downloading CV...');
    alert('CV download functionality would be implemented here');
  };

  const handleViewPortfolio = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Counter animation for stats
  const Counter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (!hasAnimated) {
        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          
          setCount(Math.floor(progress * end));

          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
          } else {
            setHasAnimated(true);
          }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
      }
    }, [end, duration, hasAnimated]);

    return <>{count}</>;
  };

  const navLinks = [
    { href: '#expertise', label: 'Expertise' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#credentials', label: 'Credentials' },
    { href: '#contact', label: 'Contact' },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0f0f0f] flex items-center justify-center z-[100]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto border-2 border-white/10 border-t-blue-400 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-sm tracking-widest uppercase"
          >
            Loading Portfolio
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white antialiased">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Subtle noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-50" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")' }}>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/90 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#hero" className="group">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-serif text-white tracking-tight" style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}>
                    Cloud & Security
                  </span>
                  <div className="w-1 h-1 bg-blue-400 rounded-full opacity-60"></div>
                </div>
                <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-blue-400 to-transparent transition-all duration-500"></div>
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden md:flex items-center space-x-10"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm transition-colors duration-300 tracking-wide group ${
                    activeSection === link.href.substring(1) ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${
                    activeSection === link.href.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </a>
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/[0.06] bg-[#0f0f0f]"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-slate-400 hover:text-white transition-colors py-2"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax effect */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroParallaxY }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/50 via-[#0f0f0f]/80 to-[#0f0f0f] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-transparent to-[#0f0f0f] z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80"
            alt="Modern Data Center"
            className="w-full h-full object-cover opacity-30 blur-md scale-110"
          />
        </motion.div>

        {/* Refined grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)] z-10"></div>

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: Text Content */}
            <div className="lg:col-span-7 space-y-10">
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center space-x-3 px-4 py-2.5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-full"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                </div>
                <span className="text-[11px] uppercase tracking-[0.15em] text-slate-300 font-medium">
                  Available for Consulting
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                {/* Eyebrow Text */}
                <div className="flex items-center space-x-4">
                  <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent"></div>
                  <span className="text-sm text-blue-400 tracking-[0.2em] uppercase font-medium">
                    BEng, Computer Engineering
                  </span>
                </div>

                <h1 
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[1.05] tracking-tight"
                  style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
                >
                  Cloud Systems &
                  <br />
                  <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600">
                      Security Engineer
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent blur-2xl"></div>
                  </span>
                </h1>
              </motion.div>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl md:text-2xl text-slate-400 leading-[1.6] max-w-2xl tracking-tight"
              >
                Specialist in <span className="text-white font-medium">Vulnerability Management</span> & <span className="text-white font-medium">SOC Operations</span>. 
                <span className="block mt-2 text-slate-500">
                  Engineering resilient infrastructure for global enterprises.
                </span>
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <button
                  onClick={handleViewPortfolio}
                  className="group relative px-9 py-4 bg-white text-[#0f0f0f] rounded-lg font-medium transition-all duration-500 flex items-center justify-center space-x-3 hover:shadow-2xl hover:shadow-white/20 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative text-base tracking-wide">View Projects</span>
                  <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <a
                  href="#contact"
                  className="group px-9 py-4 bg-white/[0.03] border border-white/[0.08] text-white rounded-lg font-medium hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 flex items-center justify-center space-x-3"
                >
                  <span className="relative text-base tracking-wide">Get in Touch</span>
                  <Mail className="w-5 h-5" />
                </a>
              </motion.div>

              {/* Animated Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-3 gap-8 pt-12 border-t border-white/[0.06]"
              >
                {[
                  { value: 3, suffix: '+', label: 'Years Experience' },
                  { value: 50, suffix: '+', label: 'Security Projects' },
                  { value: 99, suffix: '.9%', label: 'Uptime Achieved' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div 
                      className="text-4xl font-serif text-white mb-2 tracking-tight"
                      style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
                    >
                      <Counter end={stat.value} />{stat.suffix}
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-[0.1em]">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative max-w-md mx-auto lg:ml-auto">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10 blur-3xl"></div>
                
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 via-transparent to-transparent z-10"></div>
                  <img
                    src={profileImage}
                    alt="Cloud Systems & Security Engineer"
                    className="w-full h-auto object-cover"
                    loading="eager"
                  />
                </div>

                {/* Education Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 right-6 px-6 py-4 bg-[#1a1a1a]/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center border border-white/10">
                        <Award className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white tracking-tight">BEng (Hons)</div>
                        <div className="text-xs text-slate-500 tracking-wide">Computer Engineering</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 uppercase tracking-wider">Graduate</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden lg:flex"
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-600">Scroll</div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-slate-600 to-transparent"
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-24 border-t border-white/[0.06] bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 mb-3">
              Professional Experience
            </p>
            <h2 
              className="text-3xl md:text-4xl font-serif text-white tracking-tight"
              style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              Trusted by Leading Organizations
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-8 bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-xl hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 rounded-xl transition-all duration-500"></div>
                <div className="relative space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                  </div>
                  <div 
                    className="text-2xl font-serif text-white tracking-tight"
                    style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
                  >
                    {company.name}
                  </div>
                  <div className="text-sm text-slate-400 leading-relaxed">{company.role}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{company.description}</div>
                  <div className="text-xs text-slate-600 uppercase tracking-wider pt-2 border-t border-white/[0.06]">{company.period}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 mb-3">
              Core Capabilities
            </p>
            <h2 
              className="text-4xl md:text-5xl font-serif text-white mb-6 tracking-tight"
              style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              Technical Expertise
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Comprehensive security solutions with precision engineering
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group relative"
              >
                <div className="relative p-10 bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 rounded-2xl transition-all duration-500"></div>
                  
                  <div className="relative space-y-6">
                    <div className="w-16 h-16 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/20 group-hover:scale-110 transition-all duration-500">
                      <item.icon className="w-8 h-8 text-blue-400" strokeWidth={1.5} />
                    </div>

                    <h3 
                      className="text-2xl font-serif text-white tracking-tight"
                      style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
                    >
                      {item.title}
                    </h3>

                    <p className="text-slate-400 leading-relaxed text-[15px]">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-4">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded-md text-xs text-slate-400 tracking-wide hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 mb-3">
              Portfolio
            </p>
            <h2 
              className="text-4xl md:text-5xl font-serif text-white mb-6 tracking-tight"
              style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              Featured Projects
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Real-world security implementations and infrastructure deployments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-8 bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 rounded-2xl transition-all duration-500"></div>
                
                <div className="relative space-y-5">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-serif text-white tracking-tight flex-1" style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}>
                      {project.title}
                    </h3>
                    <a 
                      href={project.link}
                      className="w-9 h-9 bg-white/[0.03] border border-white/[0.08] rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="text-sm text-blue-400">{project.company}</div>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/[0.03] border border-white/[0.06] rounded text-xs text-slate-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-slate-300">{project.impact}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section id="credentials" className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 mb-3">
              Qualifications
            </p>
            <h2 
              className="text-4xl md:text-5xl font-serif text-white tracking-tight"
              style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              Credentials & Skills
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-10 bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl"
            >
              <div className="flex items-center space-x-3 mb-8">
                <Award className="w-6 h-6 text-blue-400" />
                <h3 
                  className="text-2xl font-serif text-white tracking-tight"
                  style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
                >
                  Certifications
                </h3>
              </div>
              <div className="space-y-5">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-start space-x-4 group">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-base text-white">{cert.name}</div>
                        <div className="text-xs text-slate-600">{cert.year}</div>
                      </div>
                      <div className="text-xs text-slate-600 uppercase tracking-wider">{cert.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technical Stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-10 bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl"
            >
              <div className="flex items-center space-x-3 mb-8">
                <Target className="w-6 h-6 text-blue-400" />
                <h3 
                  className="text-2xl font-serif text-white tracking-tight"
                  style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
                >
                  Technical Stack
                </h3>
              </div>
              <div className="space-y-6">
                {technicalStack.map((stack) => (
                  <div key={stack.category}>
                    <div className="text-xs text-slate-600 uppercase tracking-wider mb-3">{stack.category}</div>
                    <div className="flex flex-wrap gap-2">
                      {stack.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-slate-300 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-10"
          >
            <div className="space-y-6">
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight tracking-tight"
                style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
              >
                Let's Build Something
                <br />
                <span className="text-slate-500">Secure Together</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Ready to strengthen your security posture? Let's discuss how I can help protect your infrastructure.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href="mailto:contact@example.com"
                className="group px-9 py-4 bg-white text-[#0f0f0f] rounded-lg font-medium hover:shadow-2xl hover:shadow-white/20 transition-all duration-500 flex items-center justify-center space-x-3"
              >
                <span className="tracking-wide">Send Email</span>
                <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center space-x-6 pt-8">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-white/[0.03] border border-white/[0.08] rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Linkedin className="w-5 h-5 relative z-10" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-white/[0.03] border border-white/[0.08] rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Github className="w-5 h-5 relative z-10" />
              </a>
              <a 
                href="mailto:contact@example.com"
                className="group w-12 h-12 bg-white/[0.03] border border-white/[0.08] rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Mail className="w-5 h-5 relative z-10" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">© 2026</span>
              <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
              <span className="text-sm text-slate-600">Cloud Systems & Security Engineer</span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors uppercase tracking-wider">
                Privacy
              </a>
              <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors uppercase tracking-wider">
                Terms
              </a>
              <a href="#contact" className="text-xs text-slate-600 hover:text-slate-400 transition-colors uppercase tracking-wider">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;