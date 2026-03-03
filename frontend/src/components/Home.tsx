import { motion } from 'motion/react';
import { Shield, Cloud, Activity, Headphones, Globe, CheckCircle } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const highlights = [
    { icon: Shield, text: 'SOC Monitoring & Incident Response' },
    { icon: Cloud, text: 'Cloud Setup (AWS & Azure)' },
    { icon: Activity, text: 'Security Log Analysis (Wazuh, Splunk)' },
    { icon: Headphones, text: 'Technical Support & Troubleshooting' },
    { icon: Globe, text: 'EU & Global Remote Availability' },
  ];

  const services = [
    'Alert investigation & triage',
    'Microsoft Defender & Sentinel response',
    'Cloud deployment and configuration',
    'System hardening & security checks',
    'Log monitoring and analysis',
    'Remote IT support for businesses',
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-8">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400">Remote Cybersecurity Expert</span>
            </div>

            <h1 className="text-slate-100 mb-6">
              PeakPoint Freelancer — Your Remote Cybersecurity & IT Partner
            </h1>
            
            <p className="text-slate-300 text-xl mb-10 max-w-3xl mx-auto">
              I help businesses stay secure, resolve incidents quickly, and build stable cloud environments. Available remotely worldwide.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-colors"
              >
                📞 Book a Free Call
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('contact')}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-8 py-4 rounded-lg transition-colors"
              >
                🔒 Request a Security Check
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl text-center hover:border-blue-500/50 transition-colors"
              >
                <highlight.icon className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                <p className="text-slate-300">{highlight.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-slate-100 mb-6">What I Do</h2>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <p className="text-slate-300 text-lg">{service}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 border border-blue-500/20 p-8 rounded-2xl">
              <h3 className="text-slate-100 mb-4">About PeakPoint Freelancer</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                PeakPoint Freelancer is an independent IT specialist helping companies secure their systems, analyze threats, and maintain reliable cloud setups.
              </p>
              <p className="text-slate-300 leading-relaxed">
                With expertise in SOC operations, incident response, and cloud infrastructure, I provide businesses with the security and technical support they need to operate confidently in today's digital landscape.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('about')}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Learn More About Me
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-white mb-4">Ready to Secure Your Business?</h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Get expert cybersecurity support and cloud solutions tailored to your needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('services')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
          >
            View All Services
          </motion.button>
        </div>
      </section>
    </div>
  );
}
