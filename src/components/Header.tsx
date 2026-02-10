import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import logo from "@/assets/rpg-schema-logo.png";

const Header = () => {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

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
              href="https://github.com/rpg-schema" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              GitHub
            </a>
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-foreground/80 hover:text-primary"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
