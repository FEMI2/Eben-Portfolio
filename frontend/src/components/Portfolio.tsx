import { motion } from 'motion/react';
import { Shield, Cloud, Activity, CheckCircle, ArrowRight } from 'lucide-react';

export function Portfolio() {
  const caseStudies = [
    {
      icon: Shield,
      title: 'Security Alert Investigation',
      category: 'Incident Response',
      challenge: 'A mid-sized company detected unusual user activity that triggered multiple security alerts across their Microsoft Defender system.',
      solution: 'Conducted thorough investigation of the alerts, analyzed user behavior patterns, identified compromised credentials, and implemented multi-factor authentication with conditional access policies.',
      results: [
        'Identified and neutralized the threat within 4 hours',
        'Implemented stronger authentication settings',
        'Created incident response playbook for future events',
        'Zero data exfiltration or business impact',
      ],
      tags: ['Microsoft Defender', 'Incident Response', 'MFA', 'Azure AD'],
    },
    {
      icon: Cloud,
      title: 'Cloud Setup for a Small Business',
      category: 'Cloud Infrastructure',
      challenge: 'A growing startup needed a secure, scalable cloud environment but lacked in-house expertise to set it up properly.',
      solution: 'Built a complete AWS/Azure environment from scratch with proper IAM policies, network segmentation, automated backups, and security best practices. Configured monitoring and alerting systems.',
      results: [
        'Fully operational cloud infrastructure in 2 weeks',
        'Implemented least-privilege access controls',
        'Automated daily backups with 30-day retention',
        'Reduced infrastructure costs by 35%',
      ],
      tags: ['AWS', 'Azure', 'IAM', 'Backup', 'Cost Optimization'],
    },
    {
      icon: Activity,
      title: 'Log Analysis for a Growing Company',
      category: 'SIEM & Monitoring',
      challenge: 'A company with 50+ employees had no centralized logging or security monitoring, making threat detection nearly impossible.',
      solution: 'Deployed and configured Wazuh SIEM system, integrated all endpoints and servers, created custom detection rules, and set up automated alerting for suspicious activities.',
      results: [
        'Discovered 12 misconfigured systems in first week',
        'Identified multiple shadow IT applications',
        'Reduced mean time to detect (MTTD) from days to minutes',
        'Created comprehensive security dashboards',
      ],
      tags: ['Wazuh', 'SIEM', 'Log Analysis', 'Threat Detection'],
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
              <span className="text-blue-400">Success Stories</span>
            </div>
            <h1 className="text-slate-100 mb-6">Portfolio & Case Studies</h1>
            <p className="text-slate-300 text-xl max-w-3xl mx-auto">
              Real-world examples of how I've helped businesses strengthen their security posture and optimize their IT infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors"
              >
                <div className="p-8 lg:p-12">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                      <study.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-blue-400 mb-2">{study.category}</div>
                      <h2 className="text-slate-100 mb-4">{study.title}</h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-slate-100 mb-3">The Challenge</h3>
                      <p className="text-slate-300 leading-relaxed">{study.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-slate-100 mb-3">The Solution</h3>
                      <p className="text-slate-300 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
                    <h3 className="text-slate-100 mb-4">Results & Impact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-700/50 text-slate-300 px-4 py-2 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-white mb-4">Ready to Transform Your Security?</h2>
              <p className="text-blue-100 text-xl">
                Let's discuss how I can help solve your unique security and infrastructure challenges.
              </p>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center">
            <h3 className="text-slate-100 mb-3">Need More Information?</h3>
            <p className="text-slate-300 mb-4">
              These case studies represent just a sample of the work I do. Each project is confidential and details have been generalized to protect client privacy.
            </p>
            <p className="text-slate-400">
              I'm happy to discuss specific scenarios and how my expertise can apply to your unique situation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
