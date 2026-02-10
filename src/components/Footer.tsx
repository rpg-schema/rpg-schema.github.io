import logo from "@/assets/rpg-schema-logo.png";

const Footer = () => {
  return (
    <footer id="contribute" className="bg-brown text-parchment py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <img src={logo} alt="RPG-Schema.org" className="h-16 w-auto mb-4 opacity-90" />
            <p className="text-parchment/70 text-sm max-w-md">
              An open vocabulary for describing tabletop roleplaying game elements, 
              built on Schema.org standards for maximum interoperability.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-gold-light mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#schemas" className="text-parchment/70 hover:text-parchment transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-parchment/70 hover:text-parchment transition-colors">
                  JSON-LD Context
                </a>
              </li>
              <li>
                <a href="#" className="text-parchment/70 hover:text-parchment transition-colors">
                  Vocabulary Files
                </a>
              </li>
              <li>
                <a href="#" className="text-parchment/70 hover:text-parchment transition-colors">
                  Examples
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-gold-light mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/rpg-schema" target="_blank" rel="noopener noreferrer" className="text-parchment/70 hover:text-parchment transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-parchment/70 hover:text-parchment transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-parchment/70 hover:text-parchment transition-colors">
                  Contributing Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-parchment/70 hover:text-parchment transition-colors">
                  Issue Tracker
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-parchment/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-parchment/50 text-sm">
            © 2026 RPG-Schema.org. Open source under CC BY 4.0 license.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-parchment/50 hover:text-parchment transition-colors">
              Privacy
            </a>
            <a href="#" className="text-parchment/50 hover:text-parchment transition-colors">
              Terms
            </a>
            <a href="https://schema.org" target="_blank" rel="noopener noreferrer" className="text-parchment/50 hover:text-parchment transition-colors">
              Schema.org
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
