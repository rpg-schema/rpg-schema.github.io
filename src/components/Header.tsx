import logo from "@/assets/rpg-schema-logo.png";

const Header = () => {
  return (
    <header className="bg-gradient-parchment border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={logo} 
              alt="RPG-Schema.org" 
              className="h-12 w-auto"
            />
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#schemas" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Schemas
            </a>
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="#contribute" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Contribute
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
