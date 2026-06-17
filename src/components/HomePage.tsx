import React from 'react';
import { FileText, Download, Smartphone, ArrowRight, Users, Clock, Shield, TrendingUp, Mail, Linkedin, User } from 'lucide-react';
import BlogSection from './BlogSection';
import ComparisonSection from './ComparisonSection';

interface HomePageProps {
  onGetStarted: () => void;
  onReadMore?: (postId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted, onReadMore }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 font-display hidden sm:block">Building You</h1>
              </div>
              <a
                href="https://digitalheroesco.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
              >
                Built for Digital Heroes
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="#connect-section"
                className="hidden sm:flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>Connect</span>
              </a>
              <button
                onClick={onGetStarted}
                className="bg-blue-600 text-white px-3 py-2 sm:px-6 sm:py-2 rounded-full hover:bg-blue-700 hover:shadow-md transition-colors font-medium text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Get Started Free</span>
                <span className="sm:hidden">Start Free</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 font-display mb-4 sm:mb-6 leading-tight">
            Create Your Perfect
            <span className="text-transparent bg-clip-text bg-blue-600 block sm:inline"> Resume</span>
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-2 text-slate-600">in Minutes, Not Hours</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Professional resume builder designed specifically for students and freshers. 
            Create stunning resumes with multiple templates - completely free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 sm:mb-8 px-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-sm hover:shadow-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-flex items-center justify-center space-x-2"
            >
              <span>Build My Resume Free</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <div className="flex items-center space-x-2 text-slate-600 text-sm sm:text-base">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span>No signup required • 100% Free</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto px-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-blue-600">50K+</div>
              <div className="text-xs sm:text-sm text-slate-600">Resumes Created</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-teal-600">95%</div>
              <div className="text-xs sm:text-sm text-slate-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-purple-600">2 Min</div>
              <div className="text-xs sm:text-sm text-slate-600">Average Time</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-orange-600">100%</div>
              <div className="text-xs sm:text-sm text-slate-600">Free Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display text-center mb-4">
            Why Choose Building You's Free Resume Builder?
          </h3>
          <p className="text-slate-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Join thousands of students and freshers who've successfully landed their dream jobs using our professional resume builder
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
              <div className="bg-blue-600 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-slate-900 font-display mb-2">Professional Templates</h4>
              <p className="text-slate-600 text-sm sm:text-base">
                Choose from multiple professionally designed templates tailored for different industries and roles
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-shadow">
              <div className="bg-orange-600 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-slate-900 font-display mb-2">Instant PDF Download</h4>
              <p className="text-slate-600 text-sm sm:text-base">
                Download your resume as a high-quality PDF instantly, ready for job applications and interviews
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="bg-purple-600 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-slate-900 font-display mb-2">Mobile Optimized</h4>
              <p className="text-slate-600 text-sm sm:text-base">
                Create and edit your resume on any device with our fully responsive and mobile-friendly design
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display text-center mb-8 sm:mb-12">
            How It Works - Simple as 1-2-3
          </h3>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold tracking-tight text-lg sm:text-xl">
                1
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-slate-900 font-display mb-2">Fill Your Details</h4>
              <p className="text-slate-600 text-sm sm:text-base">
                Enter your personal information, education, experience, and projects in our easy-to-use form
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold tracking-tight text-lg sm:text-xl">
                2
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-slate-900 font-display mb-2">Choose Template</h4>
              <p className="text-slate-600 text-sm sm:text-base">
                Select from our collection of professional templates designed for different career paths
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold tracking-tight text-lg sm:text-xl">
                3
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-slate-900 font-display mb-2">Download & Apply</h4>
              <p className="text-slate-600 text-sm sm:text-base">
                Preview your resume and download as PDF ready for job applications
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display text-center mb-8 sm:mb-12">
            Perfect for Students & Freshers
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 sm:p-3 rounded-2xl flex-shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-900 font-display mb-2">Student-Friendly</h4>
                <p className="text-slate-600 text-sm sm:text-base">Designed specifically for college students and recent graduates with limited work experience</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-2xl flex-shrink-0">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-900 font-display mb-2">Quick & Easy</h4>
                <p className="text-slate-600 text-sm sm:text-base">Create a professional resume in just 2-3 minutes without any design skills required</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 sm:col-span-2 lg:col-span-1">
              <div className="bg-purple-100 p-2 sm:p-3 rounded-2xl flex-shrink-0">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-900 font-display mb-2">ATS Optimized</h4>
                <p className="text-slate-600 text-sm sm:text-base">Our templates are optimized for Applicant Tracking Systems used by most companies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <div id="blog">
        <BlogSection onReadMore={onReadMore} />
      </div>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display text-center mb-8 sm:mb-12">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-slate-50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-base sm:text-lg font-semibold text-slate-900 font-display mb-2">Is this resume builder really free?</h4>
              <p className="text-slate-600 text-sm sm:text-base">Yes! Our resume builder is completely free to use. You can create unlimited resumes and download PDFs without any cost or hidden fees.</p>
            </div>
            <div className="bg-slate-50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-base sm:text-lg font-semibold text-slate-900 font-display mb-2">Do I need to create an account?</h4>
              <p className="text-slate-600 text-sm sm:text-base">No signup required! You can start building your resume immediately without creating an account or providing any personal information beyond what goes in your resume.</p>
            </div>
            <div className="bg-slate-50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-base sm:text-lg font-semibold text-slate-900 font-display mb-2">How many templates are available?</h4>
              <p className="text-slate-600 text-sm sm:text-base">We offer 6 professional templates including Modern, Classic, Minimal, Executive, Academic, and Technical designs to suit different career paths and preferences.</p>
            </div>
            <div className="bg-slate-50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-base sm:text-lg font-semibold text-slate-900 font-display mb-2">Are the resume templates ATS-friendly?</h4>
              <p className="text-slate-600 text-sm sm:text-base">Yes! All our templates are designed to be ATS (Applicant Tracking System) compatible, ensuring your resume gets past automated screening systems used by most companies.</p>
            </div>
            <div className="bg-slate-50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-base sm:text-lg font-semibold text-slate-900 font-display mb-2">Can I edit my resume after downloading?</h4>
              <p className="text-slate-600 text-sm sm:text-base">While the PDF is final, you can always come back to our website and recreate your resume with updates. We recommend keeping your information handy for future edits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 sm:mb-6">
            Ready to Build Your Dream Resume?
          </h3>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 px-4">
            Join over 50,000 students who've successfully landed their dream jobs with Building You's free resume builder
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-600 px-8 sm:px-10 py-3 sm:py-4 hover:bg-slate-50 rounded-full text-base sm:text-lg font-semibold shadow-sm hover:shadow-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-flex items-center space-x-2"
          >
            <span>Start Building Now - It's Free!</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <p className="text-blue-100 text-xs sm:text-sm mt-4">No signup required • Takes less than 3 minutes • 100% Free Forever</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                <span className="text-xl sm:text-2xl font-bold tracking-tight tracking-tight">Building You</span>
              </div>
              <p className="text-slate-400 mb-6 text-sm sm:text-base leading-relaxed">
                Empowering students and freshers to create professional resumes. 
                Completely free, no signup required, and optimized for job success.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <a href="#" className="text-slate-500 hover:text-white transition-colors font-medium">Privacy Policy</a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors font-medium">Terms of Service</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-6 text-slate-400 uppercase tracking-wider">Features</h4>
              <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
                <li>Professional Templates</li>
                <li>PDF Download</li>
                <li>Mobile Responsive</li>
                <li>ATS Optimized</li>
                <li>Photo Support</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-6 text-slate-400 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
                <li>Resume Tips</li>
                <li>Interview Guide</li>
                <li>Career Advice</li>
                <li>Job Search Tips</li>
                <li>Success Stories</li>
              </ul>
            </div>
            <div id="connect-section">
              <h4 className="text-sm font-semibold mb-6 text-slate-400 uppercase tracking-wider">Connect</h4>
              <ul className="space-y-4 text-gray-300 text-sm sm:text-base">
                <li className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                  <span>Kavinesh S R</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                  <a href="mailto:karaja1612@gmail.com" className="hover:text-blue-400 transition-colors">
                    karaja1612@gmail.com
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <Linkedin className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                  <a href="https://linkedin.com/in/kavineshsr" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    linkedin.com/in/kavineshsr
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 sm:mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center text-slate-500 text-sm gap-6">
            <p>Made with ❤️ for students worldwide.</p>
            <div className="flex flex-col sm:flex-row items-center">
              <a
                href="https://digitalheroesco.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20"
              >
                Built for Digital Heroes
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;