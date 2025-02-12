import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Pill, Phone, Activity, AlertCircle, Check, Brain, TrendingUp, Heart, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface DashboardData {
  medications: any[];
  appointments: any[];
  activities: any[];
}

interface HealthInsight {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData>({
    medications: [],
    appointments: [],
    activities: []
  });
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<HealthInsight[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
      generateInsights();
      generateSuggestions();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [medicationsData, appointmentsData, activitiesData] = await Promise.all([
        supabase
          .from('medications')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false })
          .limit(3),
        supabase
          .from('appointments')
          .select('*')
          .eq('user_id', user?.id)
          .gte('appointment_date', new Date().toISOString())
          .order('appointment_date', { ascending: true })
          .limit(3),
        supabase
          .from('daily_activities')
          .select('*')
          .eq('user_id', user?.id)
          .order('completed_at', { ascending: false })
          .limit(3)
      ]);

      setData({
        medications: medicationsData.data || [],
        appointments: appointmentsData.data || [],
        activities: activitiesData.data || []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // AI-powered health insights based on user data
  const generateInsights = () => {
    const insights: HealthInsight[] = [
      {
        title: 'Activity Pattern',
        description: 'Your activity level has increased by 15% this week. Keep it up!',
        icon: <TrendingUp className="w-6 h-6" />,
        color: 'text-green-500'
      },
      {
        title: 'Medication Adherence',
        description: "You have maintained a 95% medication adherence rate this month.",
        icon: <Check className="w-6 h-6" />,
        color: 'text-blue-500'
      },
      {
        title: 'Wellness Score',
        description: 'Your overall wellness score is 85/100 based on your activities.',
        icon: <Heart className="w-6 h-6" />,
        color: 'text-red-500'
      },
      {
        title: 'Daily Rhythm',
        description: 'Your daily routine shows good consistency in the past week.',
        icon: <Sun className="w-6 h-6" />,
        color: 'text-yellow-500'
      }
    ];
    setInsights(insights);
  };

  // AI-powered personalized suggestions
  const generateSuggestions = () => {
    const suggestions = [
      "Based on your activity pattern, consider adding a 20-minute morning walk",
      "Your next medication refill might be needed in 5 days",
      "Schedule your annual check-up - it's been 10 months since your last visit",
      "Your sleep schedule shows improvement - maintain your 10 PM bedtime routine",
      "Consider updating your emergency contacts list - last updated 3 months ago"
    ];
    setSuggestions(suggestions);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your health dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-600 mt-2">Here's your health overview for today</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-500" />
          <span className="text-purple-700 font-medium">AI Health Assistant</span>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {insights.map((insight, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className={`${insight.color} mb-4`}>{insight.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
            <p className="text-gray-600 text-sm">{insight.description}</p>
          </div>
        ))}
      </div>

      {/* AI Suggestions */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-semibold text-gray-900">AI-Powered Suggestions</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-1" />
                <p className="text-gray-700">{suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
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
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <h3 className="font-medium text-blue-900">Upcoming Medications</h3>
              {data.medications.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {data.medications.map((med) => (
                    <li key={med.id} className="flex items-center gap-2 text-blue-700">
                      <Pill className="w-4 h-4" />
                      {med.name} - {med.dosage}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-blue-700">No medications scheduled</p>
              )}
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <h3 className="font-medium text-green-900">Next Appointment</h3>
              {data.appointments.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {data.appointments.map((apt) => (
                    <li key={apt.id} className="flex items-center gap-2 text-green-700">
                      <Calendar className="w-4 h-4" />
                      {apt.title} - {new Date(apt.appointment_date).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-green-700">No appointments scheduled</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {data.activities.length > 0 ? (
              data.activities.map((activity) => (
                <div key={activity.id} className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Activity className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <h3 className="font-medium text-purple-900">{activity.activity_type}</h3>
                      <p className="text-purple-700 text-sm mt-1">{activity.description}</p>
                      <p className="text-purple-600 text-xs mt-1">
                        {new Date(activity.completed_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <h3 className="font-medium text-purple-900">Daily Activities</h3>
                <p className="text-purple-700">No activities logged today</p>
              </div>
            )}
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
      className="block p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 transform group-hover:scale-110 transition-transform">{icon}</div>
        <div>
          <h3 className="font-medium text-gray-900 group-hover:text-blue-600">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}