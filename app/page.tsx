'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronDown, Mail, Phone, MapPin } from 'lucide-react'

const productCategories = [
  {
    title: 'Protective Wear',
    items: [
      { name: 'Ordinary Worksuit', description: 'All sizes and colors available' },
      { name: 'Acid-Proof Worksuit', description: 'All sizes and colors available' },
      { name: 'Fire-Proof Worksuit', description: 'All sizes and colors available' }
    ]
  },
  {
    title: 'Dust Coats',
    items: [
      { name: 'Dust Coat', description: 'Professional dust coats for various industries' },
      { name: 'Lab Coat', description: 'Standard and premium lab coats' }
    ]
  },
  {
    title: 'Head Gear',
    items: [
      { name: 'Helmets', description: 'Safety helmets for construction and industry' },
      { name: 'Baseball Cap', description: 'Custom branded baseball caps' },
      { name: 'Sun Hat', description: 'Protective sun hats' }
    ]
  },
  {
    title: 'Protective Gloves',
    items: [
      { name: 'Cleaning Gloves', description: 'Durable cleaning gloves' },
      { name: 'Sports Gloves', description: 'Athletic and sports gloves' },
      { name: 'Construction Gloves', description: 'Heavy-duty construction gloves' }
    ]
  },
  {
    title: 'Goggles',
    items: [
      { name: 'Welding Goggles', description: 'Professional welding protection' },
      { name: 'UV Goggles', description: 'UV protection goggles' },
      { name: 'Protective Goggles', description: 'General protective eyewear' }
    ]
  },
  {
    title: 'Safety Shoes',
    items: [
      { name: 'Low Cut Safety Shoe', description: 'Comfortable low-cut safety footwear' },
      { name: 'High Cut Safety Boots', description: 'High-cut protective boots' },
      { name: 'Safety Shoe', description: 'Standard safety shoes' }
    ]
  },
  {
    title: 'Ladies Formal Wear',
    items: [
      { name: "Women's Formal Suit", description: 'Professional business suits' },
      { name: "Women's Formal Pants", description: 'Elegant formal trousers' },
      { name: "Women's Wear", description: 'Complete women\'s formal collection' }
    ]
  },
  {
    title: 'T-Shirts',
    items: [
      { name: 'Round Neck T-Shirt', description: 'Classic round neck design' },
      { name: 'V Neck T-Shirt', description: 'Stylish V-neck t-shirts' },
      { name: 'T-Shirt', description: 'Custom promotional t-shirts' }
    ]
  },
  {
    title: 'School Wear',
    items: [
      { name: "Boys Uniform", description: 'Complete boys school uniforms' },
      { name: "Girl's Uniform", description: 'Complete girls school uniforms' },
      { name: "Tunic & Boys Shorts", description: 'School tunics and shorts' }
    ]
  },
  {
    title: 'Reflective Vests & Jackets',
    items: [
      { name: 'Reflective Half Jacket', description: 'High-visibility half jackets' },
      { name: "Miner's Reflective Jacket", description: 'Mining industry reflective wear' },
      { name: 'Work Reflective Jacket', description: 'General work reflective jackets' }
    ]
  },
  {
    title: 'Safari Wear',
    items: [
      { name: 'Safari Shirt', description: 'Classic safari shirts' },
      { name: 'Safari Multi Pocket Half Jacket', description: 'Functional safari jackets' },
      { name: 'Safari Shorts', description: 'Durable safari shorts' }
    ]
  },
  {
    title: 'Golf T-Shirts',
    items: [
      { name: 'Golf T-Shirt', description: 'Classic golf shirts' },
      { name: 'Slim Fit Golf T-Shirt', description: 'Modern slim-fit golf shirts' }
    ]
  },
  {
    title: "Chef's Uniform",
    items: [
      { name: 'Chefs Top Wear', description: 'Professional chef jackets' },
      { name: 'Chefs Apron', description: 'Durable chef aprons' },
      { name: 'Chefs Pants', description: 'Comfortable chef pants' }
    ]
  },
  {
    title: 'Gumboots & Rubber Boots',
    items: [
      { name: 'Gumboots', description: 'Standard gumboots' },
      { name: 'Gumboots Low Cut', description: 'Low-cut rubber boots' }
    ]
  },
  {
    title: 'Formal Wear',
    items: [
      { name: 'Short Sleeved Shirt', description: 'Formal short-sleeved shirts' },
      { name: 'Long Sleeve Shirt', description: 'Formal long-sleeved shirts' },
      { name: 'Ladies Blouse', description: 'Professional ladies blouses' }
    ]
  },
  {
    title: 'Security Uniform',
    items: [
      { name: "Security's Long Sleeved Shirt", description: 'Professional security shirts' },
      { name: "Security's Pants", description: 'Durable security pants' },
      { name: "Security's Jacket", description: 'Security jackets' }
    ]
  },
  {
    title: "Security's Accessories",
    items: [
      { name: 'Hand Cuffs', description: 'Professional handcuffs' },
      { name: 'Sun Glasses', description: 'Security sunglasses' },
      { name: 'Button Stick', description: 'Security batons' }
    ]
  },
  {
    title: 'Hospital Wear',
    items: [
      { name: "Nurse's Top Wear", description: 'Professional nursing tops' },
      { name: "Nurse's Pants", description: 'Comfortable nursing pants' },
      { name: 'Theatre Gown', description: 'Surgical theatre gowns' }
    ]
  },
  {
    title: 'Branding & Banners',
    items: [
      { name: 'Custom Branding', description: 'Professional branding services' },
      { name: 'Promotional Gifts', description: 'Custom promotional items' },
      { name: 'Banners', description: 'Custom banners and signage' },
      { name: 'Tear Drop Banner', description: 'Eye-catching tear drop banners' }
    ]
  }
]

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return { ref, isVisible }
}

function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0 
}: { 
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function Page() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.5

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-semibold tracking-tight text-foreground">
            CYCLENET
          </div>
          <div className="flex items-center gap-8">
            <a href="#products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Products
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        />
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-foreground mb-6 text-balance">
            Crafted to perfection.
            <br />
            Designed for you.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-balance leading-relaxed">
            Custom made clothing and promotional wear, manufactured with precision and delivered with care.
          </p>
          <Button 
            size="lg" 
            className="rounded-full px-8 h-12 text-base"
            asChild
          >
            <a href="#products">Explore Our Collection</a>
          </Button>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl font-semibold tracking-tight text-foreground mb-6 text-balance">
                  Quality. Innovation. Excellence.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Founded in 2012, Cyclenet Supplies has grown from a small toll manufacturing business to a leading manufacturer of customized uniforms and promotional wear in Bulawayo.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We combine cutting-edge production equipment with skilled craftsmanship to deliver products that exceed expectations. Our commitment to quality control and dependable delivery has made us the trusted choice for businesses across industries.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-8 bg-card border-border hover:shadow-lg transition-shadow">
                  <div className="text-4xl font-semibold text-foreground mb-2">2012</div>
                  <div className="text-sm text-muted-foreground">Established</div>
                </Card>
                <Card className="p-8 bg-card border-border hover:shadow-lg transition-shadow">
                  <div className="text-4xl font-semibold text-foreground mb-2">19+</div>
                  <div className="text-sm text-muted-foreground">Product Lines</div>
                </Card>
                <Card className="p-8 bg-card border-border hover:shadow-lg transition-shadow col-span-2">
                  <div className="text-4xl font-semibold text-foreground mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Custom Manufacturing</div>
                </Card>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-6 text-balance">
              Our Complete Collection
            </h2>
            <p className="text-xl text-muted-foreground text-balance">
              From protective wear to formal attire, we craft everything your business needs.
            </p>
          </AnimatedSection>

          <div className="space-y-32">
            {productCategories.map((category, categoryIndex) => (
              <AnimatedSection key={category.title} delay={categoryIndex * 50}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
                      {category.title}
                    </h3>
                    <div className="h-1 w-20 bg-primary rounded-full" />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.items.map((item, itemIndex) => (
                      <Card 
                        key={item.name}
                        className="group p-6 bg-card border-border hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                        style={{ transitionDelay: `${itemIndex * 50}ms` }}
                      >
                        <div className="space-y-3">
                          <h4 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-balance">
              Ready to elevate your brand?
            </h2>
            <p className="text-lg mb-10 opacity-90 text-balance leading-relaxed">
              Get in touch with our team to discuss your custom uniform and promotional wear needs.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="rounded-full px-8 h-12 text-base"
              asChild
            >
              <a href="#contact">Contact Us Today</a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground text-balance">
              We&apos;re here to help bring your vision to life.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 bg-card border-border text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-medium text-foreground mb-3">Phone</h3>
                <p className="text-sm text-muted-foreground mb-1">+263 772 357 054</p>
                <p className="text-sm text-muted-foreground mb-1">+263 774 677 950</p>
                <p className="text-sm text-muted-foreground">+263 29 246 1309</p>
              </Card>

              <Card className="p-8 bg-card border-border text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-medium text-foreground mb-3">Email</h3>
                <p className="text-sm text-muted-foreground break-all">
                  cyclenetsupplies@gmail.com
                </p>
              </Card>

              <Card className="p-8 bg-card border-border text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-medium text-foreground mb-3">Address</h3>
                <p className="text-sm text-muted-foreground">
                  Unit 4 Johnson Building
                  <br />
                  23rd Avenue & Vanguard Street
                  <br />
                  Belmont, Bulawayo
                </p>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cyclenet Supplies. Crafting quality since 2012.
          </p>
        </div>
      </footer>
    </div>
  )
}
