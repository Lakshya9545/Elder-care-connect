import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Phone, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to ElderCare Connect
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your comprehensive platform for managing health, appointments, and daily activities
        </p>
        <Link
          to="/auth"
          className="bg-blue-600 text-white text-xl px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <FeatureCard
          icon={<Heart className="w-12 h-12 text-red-500" />}
          title="Medication Management"
          description="Track your medications and never miss a dose"
        />
        <FeatureCard
          icon={<Calendar className="w-12 h-12 text-blue-500" />}
          title="Appointment Tracking"
          description="Keep all your medical appointments organized"
        />
        <FeatureCard
          icon={<Phone className="w-12 h-12 text-green-500" />}
          title="Emergency Contacts"
          description="Quick access to important contacts"
        />
        <FeatureCard
          icon={<Activity className="w-12 h-12 text-purple-500" />}
          title="Daily Activities"
          description="Monitor and track your daily activities"
        />
      </div>

      <img
        src="https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1200&q=80"
        alt="Senior couple using tablet"
        className="w-full h-96 object-cover rounded-xl shadow-lg mb-16"
      />
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}