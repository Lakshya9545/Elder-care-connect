import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Phone, Activity, Shield, Users, Star, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from './Dashboard';

export default function Home() {
  const { user } = useAuth();

  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="relative">
              <Heart className="w-16 h-16 text-blue-600 enhanced-beat" />
              <div className="absolute inset-0 bg-blue-100 rounded-full -z-10 enhanced-beat delay-100"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent gradient-flow">
            ElderCare Connect
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Empowering seniors with comprehensive healthcare management and daily wellness tracking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/auth"
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover-lift relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <a
              href="#features"
              className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg shadow-lg hover-lift border-2 border-blue-100"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Animated Features Section */}
        <div className="relative mb-32">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-3xl -z-10"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">24/7 Monitoring</h3>
              </div>
              <p className="text-gray-600">Continuous health tracking and emergency response system</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Shield className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Secure Platform</h3>
              </div>
              <p className="text-gray-600">Enterprise-grade security for your medical information</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Family Access</h3>
              </div>
              <p className="text-gray-600">Keep loved ones informed and connected to your care</p>
            </div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div id="features" className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl transform rotate-3 scale-95 -z-10"></div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <FeatureIcon icon={<Heart className="w-8 h-8" />} color="text-red-500" />
                <FeatureIcon icon={<Calendar className="w-8 h-8" />} color="text-blue-500" />
                <FeatureIcon icon={<Phone className="w-8 h-8" />} color="text-green-500" />
                <FeatureIcon icon={<Activity className="w-8 h-8" />} color="text-purple-500" />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Comprehensive Care Management</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our platform provides a complete suite of tools designed specifically for senior care:
            </p>
            <ul className="space-y-4">
              {[
                'Medication tracking with smart reminders',
                'Appointment scheduling and calendar management',
                'Emergency contact system with quick access',
                'Daily activity monitoring and health insights'
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 p-px rounded-2xl">
            <div className="bg-white rounded-2xl px-12 py-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to take control of your health?
              </h2>
              <Link
                to="/auth"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover-lift"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureIcon({ icon, color }: { icon: React.ReactNode; color: string }) {
  return (
    <div className="relative group">
      <div className={`${color} enhanced-float`}>
        <div className="p-4 bg-white rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
          {icon}
        </div>
      </div>
    </div>
  );
}