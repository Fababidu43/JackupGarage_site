import React from 'react';
import { Facebook, Instagram, Phone, Mail, Wrench, FileText, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-base-900 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center mr-3">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-text-primary">JackUp Garage</h3>
                <p className="text-brand-500 font-medium text-sm">Mobile Mechanic</p>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Professional mobile mechanic service in Haute-Loire (43) and Loire (42). 
              Quick intervention and free quotes.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com/jackupgarage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-base-800 hover:bg-brand-500 flex items-center justify-center text-text-muted hover:text-white rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/jackupgarage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-base-800 hover:bg-brand-500 flex items-center justify-center text-text-muted hover:text-white rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-display font-semibold text-text-primary mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center text-text-muted">
                <Phone className="w-5 h-5 mr-3 text-brand-500" />
                <a 
                  href="tel:+33123456789"
                  className="hover:text-brand-400 transition-colors"
                >
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-center text-text-muted">
                <Mail className="w-5 h-5 mr-3 text-brand-500" />
                <a 
                  href="mailto:contact@jackupgarage.fr"
                  className="hover:text-brand-400 transition-colors"
                >
                  contact@jackupgarage.fr
                </a>
              </div>
            </div>
            <div className="mt-6 p-4 bg-base-800 rounded-lg">
              <p className="text-xs text-text-muted">
                <span className="font-semibold text-brand-500">Quick Response:</span><br />
                Within 12h by phone or email
              </p>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-display font-semibold text-text-primary mb-6">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/cgv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-text-muted hover:text-brand-400 transition-colors text-sm"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a 
                  href="/legal"
                  className="flex items-center text-text-muted hover:text-brand-400 transition-colors text-sm"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Legal Notice
                </a>
              </li>
              <li>
                <a 
                  href="/privacy"
                  className="flex items-center text-text-muted hover:text-brand-400 transition-colors text-sm"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-text-muted text-sm">
            © 2024 JackUp Garage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;