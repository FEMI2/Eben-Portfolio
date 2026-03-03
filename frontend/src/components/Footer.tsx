import { Shield, Mail, Globe, Linkedin, Github } from 'lucide-react';
import logoImg from 'figma:asset/897dafc264f8ec1861961ecca882b98579e1677b.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const services = [
    'SOC Monitoring',
    'Cloud Setup',
    'Security Hardening',
    'Log Analysis',
    'Technical Support',
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img src={logoImg} alt="PeakPoint Freelancer" className="h-12 w-auto mb-4" />
            <p className="text-slate-400 mb-6">
              Your trusted partner for cybersecurity and IT solutions worldwide.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@peakpoint.com"
                className="text-slate-400 hover:text-blue-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-100 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-slate-100 mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-slate-100 mb-4">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <Globe className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
                <span>Remote Services Worldwide</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <Shield className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
                <span>US, UK, EU & Canada Coverage</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
                <span>24-48 Hour Response Time</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400">
              © {currentYear} PeakPoint Freelancer. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('contact')}
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600" />
    </footer>
  );
}
