import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold font-heading mb-4">Taco Fiesta</h3>
            <p className="mb-4">Authentic Mexican cuisine with a modern twist.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-secondary transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                <Twitter size={24} />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <p>123 Taco Street, Burrito City</p>
            <p>Phone: (555) 123-4567</p>
            <p>Email: hola@tacofiesta.com</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="hover:text-secondary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center">
          <p>&copy; {new Date().getFullYear()} Taco Fiesta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

