import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Pill, Phone, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome Back!</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <QuickAction
              to="/medications"
              icon={<Pill className="w-8 h-8 text-blue-500" />}
              title="Medications"
              description="View and manage your medications"
            />
            <QuickAction
              to="/appointments"
              icon={<Calendar className="w-8 h-8 text-green-500" />}
              title="Appointments"
              description="Upcoming medical appointments"
            />
            <QuickAction
              to="/emergency-contacts"
              icon={<Phone className="w-8 h-8 text-red-500" />}
              title="Contacts"
              description="Emergency contact information"
            />
            <QuickAction
              to="/activities"
              icon={<Activity className="w-8 h-8 text-purple-500" />}
              title="Activities"
              description="Track your daily activities"
            />
          </div>
        </div>

        {/* Today's Overview */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Overview</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900">Upcoming Medications</h3>
              <p className="text-blue-700">No medications scheduled for today</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900">Next Appointment</h3>
              <p className="text-green-700">No appointments scheduled</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-900">Daily Activities</h3>
              <p className="text-purple-700">No activities logged today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ to, icon, title, description }: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors group"
    >
      <div className="mb-2">{icon}</div>
      <h3 className="font-medium text-gray-900 group-hover:text-blue-600">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}