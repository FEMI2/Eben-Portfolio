import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, User, Building2, MessageSquare, Send, CheckCircle, Globe } from 'lucide-react';

function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('company', formData.company);
    data.append('message', formData.message);

    try {
      const response = await fetch('/contact/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken') || '',
        },
        body: data,
      });

      if (response.ok || response.redirected) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', company: '', message: '' });
        }, 3000);
      } else {
        console.error('Form submission failed');
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              <Mail className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400">Get in Touch</span>
            </div>
            <h1 className="text-slate-100 mb-6">Contact Me</h1>
            <p className="text-slate-300 text-xl max-w-3xl mx-auto">
              Ready to secure your business? Let's discuss how I can help with your cybersecurity and IT needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8"
            >
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-slate-100 mb-3">Message Sent!</h3>
                  <p className="text-slate-300">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-slate-300 mb-2">
                      Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-slate-300 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-slate-300 mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Your company (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-slate-300 mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        placeholder="Tell me about your security needs..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Request a Free Consultation
                    </motion.button>
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white px-6 py-4 rounded-lg transition-colors"
                  >
                    Get a Quote
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 border border-blue-500/20 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-8 h-8 text-blue-400" />
                  <h3 className="text-slate-100">Remote Availability</h3>
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Available for remote freelance work worldwide. I work with clients across the US, UK, EU, Canada, and beyond.
                </p>
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                  <p className="text-blue-400 mb-2">⏰ Flexible scheduling</p>
                  <p className="text-slate-300">
                    I accommodate multiple time zones to ensure smooth communication and support.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                <h3 className="text-slate-100 mb-4">What to Expect</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-slate-100 mb-1">Quick Response</div>
                      <p className="text-slate-400">
                        I typically respond within 24 hours on business days
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-slate-100 mb-1">Free Consultation</div>
                      <p className="text-slate-400">
                        Initial call to understand your needs and discuss solutions
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-slate-100 mb-1">Custom Proposals</div>
                      <p className="text-slate-400">
                        Tailored solutions and clear pricing for your specific requirements
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-slate-100 mb-1">Confidential</div>
                      <p className="text-slate-400">
                        All communications and project details are kept strictly confidential
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                <h3 className="text-slate-100 mb-4">Common Inquiries</h3>
                <ul className="space-y-3 text-slate-300">
                  <li>• Security incident response</li>
                  <li>• Cloud migration & setup</li>
                  <li>• SIEM implementation</li>
                  <li>• Ongoing managed security</li>
                  <li>• Security assessments</li>
                  <li>• Technical support retainers</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional CTA */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center">
            <h2 className="text-white mb-4">Urgent Security Issue?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              For time-sensitive security incidents, please mention "URGENT" in your message subject to ensure priority handling.
            </p>
            <div className="flex items-center justify-center gap-3 text-blue-100">
              <CheckCircle className="w-5 h-5" />
              <span>I prioritize security incidents and emergency support requests</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
