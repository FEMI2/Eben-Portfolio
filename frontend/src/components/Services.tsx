import { motion } from 'motion/react';
import { 
  Shield, 
  Cloud, 
  Lock, 
  Activity, 
  Headphones, 
  Clock,
  CheckCircle 
} from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Shield,
      title: 'SOC Monitoring & Incident Response',
      description: 'Real-time security operations and incident handling',
      features: [
        'Real-time alert analysis',
        'Threat investigation',
        'Log correlation (Wazuh, Splunk)',
        'Security incident handling',
        'Clear reporting & recommendations',
      ],
    },
    {
      icon: Cloud,
      title: 'Cloud Setup & Configuration (AWS / Azure)',
      description: 'Secure and scalable cloud infrastructure',
      features: [
        'Cloud environment setup',
        'Identity & Access Management',
        'Network configuration',
        'Backup & recovery',
        'Best-practice security',
      ],
    },
    {
      icon: Lock,
      title: 'Security Hardening & Checks',
      description: 'Strengthen your security posture',
      features: [
        'Misconfiguration review',
        'Firewall improvements',
        'Endpoint & server hardening',
        'Patch & update planning',
        'Secure access controls',
      ],
    },
    {
      icon: Activity,
      title: 'Log & SIEM Analysis',
      description: 'Deep insights from your security logs',
      features: [
        'Wazuh configuration',
        'Splunk dashboards',
        'Log review for anomalies',
        'Trending & reporting',
      ],
    },
    {
      icon: Headphones,
      title: 'Technical Support & Troubleshooting',
      description: 'Expert help when you need it',
      features: [
        'Email/Outlook issues',
        'Network problems',
        'Performance fixes',
        'General IT support',
      ],
    },
    {
      icon: Clock,
      title: 'Ongoing Managed Security (Monthly)',
      description: 'Continuous protection and optimization',
      features: [
        'Continuous monitoring',
        'Regular reviews',
        'Cloud optimization',
        'Priority support',
      ],
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-slate-900">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400">Professional Services</span>
            </div>
            <h1 className="text-slate-100 mb-6">Services & Solutions</h1>
            <p className="text-slate-300 text-xl max-w-3xl mx-auto">
              Comprehensive IT and cybersecurity services designed to protect your business and optimize your infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all hover:transform hover:scale-105"
              >
                <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-blue-400" />
                </div>
                
                <h3 className="text-slate-100 mb-3">{service.title}</h3>
                <p className="text-slate-400 mb-6">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white mb-4">Need a Custom Solution?</h2>
            <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
              Every business has unique security needs. Let's discuss how I can help protect and optimize your infrastructure.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get a Custom Quote
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-blue-400 text-4xl mb-2">100+</div>
              <p className="text-slate-300">Security Incidents Resolved</p>
            </div>
            <div>
              <div className="text-blue-400 text-4xl mb-2">24/7</div>
              <p className="text-slate-300">Remote Availability</p>
            </div>
            <div>
              <div className="text-blue-400 text-4xl mb-2">Global</div>
              <p className="text-slate-300">US, UK, EU & Canada Coverage</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
