
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/layout/AppLogo';
import { ArrowRight, Check, BarChart3, MessageSquare, Clock, ArrowUpRight, Building2 } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <header className="w-full py-4 px-8 border-b flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10 shadow-sm">
        <div>
          <AppLogo />
        </div>
        
        <nav className="hidden md:flex items-center space-x-10">
          <a href="#features" className="text-gray-700 hover:text-primary transition-colors font-medium">Features</a>
          <a href="#benefits" className="text-gray-700 hover:text-primary transition-colors font-medium">Benefits</a>
          <a href="#testimonials" className="text-gray-700 hover:text-primary transition-colors font-medium">Case Studies</a>
        </nav>
        
        <div>
          <Button 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="hidden md:flex items-center gap-1"
          >
            Try Demo
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-2">
                AI-Powered Property Management
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                Intelligent Solutions for Modern Properties
              </h1>
              
              <p className="text-xl text-gray-600">
                PropertyAI transforms property management with AI agents that automate operations, enhance tenant experiences, and drive better business outcomes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 h-auto font-medium shadow-md hover:shadow-lg transition-all"
                  onClick={() => navigate('/dashboard')}
                >
                  Property Manager Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 h-auto font-medium border-2"
                  onClick={() => navigate('/tenant')}
                >
                  Tenant Interface Preview
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl border shadow-2xl overflow-hidden transform md:rotate-1 hover:rotate-0 transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
                  alt="Property management dashboard preview" 
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section id="features" className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-3">
              Powerful Features
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Streamline Your Property Operations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform revolutionizes property management workflows and enhances tenant communication.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-200 group hover:bg-blue-50">
              <div className="bg-blue-100 p-4 rounded-xl w-fit mb-6 group-hover:bg-blue-200 transition-colors">
                <BarChart3 className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Automated Analytics</h3>
              <p className="text-gray-600 mb-5">
                Real-time insights into property performance, occupancy rates, and financial metrics to make data-driven decisions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Customizable dashboards</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Predictive maintenance</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>ROI tracking</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white border rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-200 group hover:bg-indigo-50">
              <div className="bg-indigo-100 p-4 rounded-xl w-fit mb-6 group-hover:bg-indigo-200 transition-colors">
                <MessageSquare className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Communication</h3>
              <p className="text-gray-600 mb-5">
                Intelligent virtual assistants handle routine tenant inquiries, maintenance requests, and lease renewals.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>24/7 tenant support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Multi-channel communication</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Automated follow-ups</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white border rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-200 group hover:bg-emerald-50">
              <div className="bg-emerald-100 p-4 rounded-xl w-fit mb-6 group-hover:bg-emerald-200 transition-colors">
                <Clock className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Streamlined Operations</h3>
              <p className="text-gray-600 mb-5">
                Automate repetitive tasks and workflows to save time and reduce operational costs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Work order management</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Lease lifecycle automation</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Vendor coordination</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-14">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="font-medium shadow-md hover:shadow-lg transition-all"
            >
              Explore All Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3">
              Why Choose PropertyAI
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transform Your Property Management</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We help property managers save time, reduce costs, and improve tenant satisfaction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80" 
                alt="Property manager using PropertyAI" 
                className="rounded-xl shadow-xl w-full transform hover:scale-[1.02] transition-all duration-300"
              />
            </div>
            
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-4 shadow-md">1</span>
                  Increased Efficiency
                </h3>
                <p className="text-gray-600 pl-14">
                  Reduce manual tasks by up to 70% with our AI-powered automation, allowing your team to focus on high-value activities.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-4 shadow-md">2</span>
                  Enhanced Tenant Experience
                </h3>
                <p className="text-gray-600 pl-14">
                  Provide 24/7 support and instant resolution to tenant inquiries, leading to higher satisfaction and retention rates.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-4 shadow-md">3</span>
                  Data-Driven Decisions
                </h3>
                <p className="text-gray-600 pl-14">
                  Make informed decisions with real-time analytics and predictive insights about your property portfolio.
                </p>
              </div>
              
              <div className="pt-4 pl-14">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/dashboard')}
                  className="font-medium shadow-md hover:shadow-lg transition-all"
                >
                  See Demo Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section (Placeholder) */}
      <section id="testimonials" className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-3">
              Success Stories
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Case Studies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how property management companies have transformed their operations with PropertyAI.
            </p>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-16 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
            <p className="text-gray-500 text-xl font-medium">Case studies coming soon</p>
          </div>
        </div>
      </section>
      
      {/* Social Proof Section (Placeholder) */}
      <section className="py-14 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-white hover:bg-gray-50 transition-colors">
            <p className="text-gray-500 text-lg font-medium">Trusted by leading property management companies</p>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-primary to-accent text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Transform Your Property Management Today
          </h2>
          
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Join forward-thinking property managers who use AI to streamline operations, reduce costs, and enhance tenant satisfaction.
          </p>
          
          <ul className="flex flex-col md:flex-row gap-6 justify-center mb-12">
            <li className="flex items-center justify-center bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <Check className="h-5 w-5 mr-2 text-green-300" />
              <span>Save 15+ hours per week</span>
            </li>
            <li className="flex items-center justify-center bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <Check className="h-5 w-5 mr-2 text-green-300" />
              <span>Reduce operational costs by 30%</span>
            </li>
            <li className="flex items-center justify-center bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <Check className="h-5 w-5 mr-2 text-green-300" />
              <span>Improve tenant satisfaction by 25%</span>
            </li>
          </ul>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-primary text-lg px-10 py-7 h-auto font-medium shadow-xl hover:shadow-2xl transition-all"
              onClick={() => navigate('/dashboard')}
            >
              Try Demo Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-7 h-auto font-medium shadow-xl hover:shadow-2xl transition-all"
              onClick={() => navigate('/tenant')}
            >
              Experience Tenant Interface
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 px-8 bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6 text-white" />
                <span className="font-bold text-xl text-white">PropertyAI</span>
              </div>
              <p className="mb-4 text-gray-400">AI-powered property management solution.</p>
              <p className="text-sm mb-2 text-gray-500">
                Demo For Brandywine Homes USA and Lafayette RE
              </p>
              <p className="text-sm text-gray-500">© 2023 PropertyAI. All rights reserved.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-white text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:info@propertyai.com" className="hover:text-white transition-colors flex items-center"><ArrowUpRight className="h-3 w-3 mr-1" />info@propertyai.com</a></li>
                <li><a href="tel:+1234567890" className="hover:text-white transition-colors flex items-center"><ArrowUpRight className="h-3 w-3 mr-1" />+1 (234) 567-890</a></li>
                <li><address className="not-italic">123 Property St, San Francisco, CA 94103</address></li>
              </ul>
              
              <div className="flex gap-4 mt-6">
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
