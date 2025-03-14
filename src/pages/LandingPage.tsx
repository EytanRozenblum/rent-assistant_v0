import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/layout/AppLogo';
import { ArrowRight, Check, BarChart3, MessageSquare, Clock, ArrowUpRight, Building2, Phone, PhoneOff } from 'lucide-react';
import { FaPhone } from "react-icons/fa6";
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
  const navigate = useNavigate();
  const [phoneState, setPhoneState] = useState('contact');
  const [callTime, setCallTime] = useState(0);
  const [showClock, setShowClock] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  
  useEffect(() => {
    // Cleanup timer on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  const startCallSimulation = () => {
    // First transition to calling screen
    setPhoneState('calling');
    
    // After 2 seconds, transition to in-call and start the clock
    setTimeout(() => {
      setPhoneState('in-call');
      setShowClock(true);
      
      // Start the call timer
      timerRef.current = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
      
    }, 2000);
    
    // Start the video after 2 seconds
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 2000);
  };
  
  const endCallSimulation = () => {
    // Stop the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Reset the call state
    setPhoneState('contact');
    setCallTime(0);
    setShowClock(false);
    
    // Pause and reset the video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  
  const formatCallTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  const renderPhoneScreen = () => {
    switch (phoneState) {
      case 'contact':
        return <img src="/phone_screens/contact_screen.png" alt="Contact screen" className="w-full rounded-lg" />;
      case 'calling':
        return <img src="/phone_screens/calling_screen.png" alt="Calling screen" className="w-full rounded-lg" />;
      case 'in-call':
        return (
          <div className="relative">
            <img src="/phone_screens/in_call_screen.png" alt="In-call screen" className="w-full rounded-lg" />
            {showClock && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold">
                {formatCallTime(callTime)}
              </div>
            )}
          </div>
        );
      default:
        return <img src="/phone_screens/contact_screen.png" alt="Contact screen" className="w-full rounded-lg" />;
    }
  };
  
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
          <a href="#demo" className="text-gray-700 hover:text-primary transition-colors font-medium">Demo</a>
          <a href="#testimonials" className="text-gray-700 hover:text-primary transition-colors font-medium">Case Studies</a>
        </nav>
        
        <div>
          <Button 
            size="sm"
            onClick={() => navigate('/login')}
            className="hidden md:flex items-center gap-1"
          >
            Try Demo Dashboard
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
                AI Agents for SFR Property Managers
              </h1>
              <p className="mt-2 text-xl md:text-2xl text-gray-600 font-bold whitespace-nowrap">
                Demo For Brandywine Homes USA and Lafayette RE
              </p>
              
              <p className="text-xl text-gray-600">
                We transform SFR property management with AI agents that automate operations, enhance tenant experiences, and drive better business outcomes.
              </p>
              
              <div className="flex flex-col gap-4 pt-6 items-center">
                <Button 
                  size="lg" 
                  className="text-lg px-6 py-6 h-auto font-medium shadow-md hover:shadow-lg transition-all"
                  onClick={() => navigate('/login')}
                >
                  Property Manager Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                {/* <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-6 py-6 h-auto font-medium border-2"
                  onClick={() => navigate('/login')}
                >
                  Tenant Interface Preview
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button> */}
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-2">
              <div className="bg-white rounded-xl border shadow-2xl overflow-hidden transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" 
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
              onClick={() => navigate('/login')}
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
                  Reduce manual tasks with our AI-powered automation, allowing your team to focus on high-value activities.
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
                  onClick={() => navigate('/login')}
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
      
      {/* Tool Preview Section */}
      <section id="demo" className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">
              Interactive Demo
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See Our AI Call Assistant in Action</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience how our AI handles property inquiries, providing instant, professional responses to potential tenants.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex justify-center items-center">
              {phoneState === 'contact' ? (
                <button 
                  onClick={startCallSimulation}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg transition-all hover:bg-green-600">
                    <Phone className="h-8 w-8 text-white" stroke="white" />
                  </div>
                  <span className="text-xl font-medium text-gray-800">Call Property AI</span>
                </button>
              ) : (
                <button 
                  onClick={endCallSimulation}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg transition-all hover:bg-red-600">
                    <PhoneOff className="h-8 w-8 text-white" stroke="white" />
                  </div>
                  <span className="text-xl font-medium text-gray-800">End Call</span>
                </button>
              )}
            </div>
            
            <Card className="bg-white shadow-lg border rounded-2xl overflow-hidden">
              <CardContent className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-[45%] flex justify-center items-center">
                    <div className="max-w-[280px] mx-auto">
                      {renderPhoneScreen()}
                    </div>
                  </div>
                  
                  <div className="md:w-[55%] flex items-center">
                    <video 
                      ref={videoRef}
                      src="/phone_calls/leasing/lead.mp4" 
                      className="w-full rounded-lg" 
                      preload="auto"
                      controls={false}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section (Placeholder) */}
      <section id="testimonials" className="py-20 px-8 bg-gradient-to-br from-gray-50 to-blue-50">
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
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-16 text-center bg-white hover:bg-gray-100 transition-colors">
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
              <span>Save tens of hours per week</span>
            </li>
            <li className="flex items-center justify-center bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <Check className="h-5 w-5 mr-2 text-green-300" />
              <span>Reduce operational costs</span>
            </li>
            <li className="flex items-center justify-center bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
              <Check className="h-5 w-5 mr-2 text-green-300" />
              <span>Improve tenant satisfaction</span>
            </li>
          </ul>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-primary text-lg px-10 py-7 h-auto font-medium shadow-xl hover:shadow-2xl transition-all"
              onClick={() => navigate('/login')}
            >
              Try Demo Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            {/* <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-7 h-auto font-medium shadow-xl hover:shadow-2xl transition-all"
              onClick={() => navigate('/login')}
            >
              Experience Tenant Interface
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button> */}
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
              <p className="text-sm text-gray-500">© 2025 PropertyAI. All rights reserved.</p>
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
                <li><a href="mailto:rozenblum.eytan@gmail.com" className="hover:text-white transition-colors flex items-center"><ArrowUpRight className="h-3 w-3 mr-1" />rozenblum.eytan@gmail.com</a></li>
                <li><a href="tel:+1234567890" className="hover:text-white transition-colors flex items-center"><ArrowUpRight className="h-3 w-3 mr-1" />+1 (646) 250-3816</a></li>
                <li><address className="not-italic">1E Loop Road, New York, NY 10044</address></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
