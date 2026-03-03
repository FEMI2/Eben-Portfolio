import { motion } from 'motion/react';
import { Shield, Cloud, Activity, Target, Heart, Zap, CheckCircle } from 'lucide-react';

export function About() {
  const tools = [
    'AWS & Azure Cloud Platforms',
    'Microsoft Defender & Sentinel',
    'Wazuh SIEM',
    'Splunk',
    'Wireshark',
    'Security Information & Event Management',
    'Incident Response Tools',
    'Identity & Access Management',
  ];

  const values = [
    {
      icon: Zap,
      title: 'Fast Response',
      description: 'Quick turnaround on security incidents and technical issues. When threats emerge, every minute counts.',
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Consistent, dependable service you can count on. I treat your security as seriously as you do.',
    },
    {
      icon: Heart,
      title: 'Transparency',
      description: 'Clear communication and honest assessments. No jargon, no hidden costs, just straightforward expertise.',
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
              <span className="text-blue-400">About Me</span>
            </div>
            <h1 className="text-slate-100 mb-6">Meet Your Security Partner</h1>
            <p className="text-slate-300 text-xl max-w-3xl mx-auto">
              Dedicated to helping businesses stay secure and operate smoothly in an increasingly complex digital world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-slate-100 mb-6">About PeakPoint Freelancer</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  I'm the founder of <strong className="text-blue-400">PeakPoint Freelancer</strong>, an independent cybersecurity and IT consulting service built on years of hands-on experience in security operations, cloud infrastructure, and incident response.
                </p>
                <p>
                  My background spans across multiple critical areas of IT and cybersecurity, including SOC operations, threat analysis, log monitoring, and cloud architecture. I've worked with businesses of all sizes, from startups building their first secure infrastructure to established companies responding to complex security incidents.
                </p>
                <p>
                  What sets me apart is my ability to combine deep technical expertise with clear, jargon-free communication. I believe that security shouldn't be a black box — my clients always understand what I'm doing, why it matters, and how it protects their business.
                </p>
              </div>
            </motion.div>

            {/* Mission & Approach */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 border border-blue-500/20 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-blue-400" />
                <h3 className="text-slate-100">My Mission</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-8">
                To help businesses stay secure and stable by providing expert cybersecurity services, cloud solutions, and technical support that are accessible, transparent, and effective.
              </p>
              
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                <div className="text-blue-400 mb-3">Personal Note</div>
                <p className="text-slate-300 italic">
                  "I combine technical expertise with clear communication, helping clients understand their security posture without the jargon. My goal is to be the trusted advisor you can rely on, whether you're dealing with an urgent incident or planning long-term infrastructure improvements."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Tools & Expertise */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <Activity className="w-8 h-8 text-blue-400" />
              <h2 className="text-slate-100">Tools & Technologies</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-slate-900/50 p-4 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-slate-300">{tool}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Values */}
          <div className="mb-12">
            <div className="text-center mb-12">
              <h2 className="text-slate-100 mb-4">My Core Values</h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                These principles guide every project I take on and every client relationship I build.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-colors"
                >
                  <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-slate-100 mb-3">{value.title}</h3>
                  <p className="text-slate-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
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
            <h2 className="text-white mb-4">Let's Work Together</h2>
            <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
              Whether you need help with a security incident, cloud setup, or ongoing IT support, I'm here to help.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Location & Availability */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Cloud className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                <h3 className="text-slate-100 mb-2">100% Remote</h3>
                <p className="text-slate-300">
                  Work with clients worldwide via secure remote access
                </p>
              </div>
              <div>
                <Shield className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                <h3 className="text-slate-100 mb-2">Global Coverage</h3>
                <p className="text-slate-300">
                  Serving clients in US, UK, EU, Canada, and beyond
                </p>
              </div>
              <div>
                <Activity className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                <h3 className="text-slate-100 mb-2">Flexible Hours</h3>
                <p className="text-slate-300">
                  Available across multiple time zones for your convenience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
