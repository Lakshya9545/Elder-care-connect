import React, { useState, useEffect } from 'react';
import { Plus, X, Activity, Search, Filter, Calendar, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { format, isToday, isYesterday, isThisWeek } from 'date-fns';

interface DailyActivity {
  id: string;
  activity_type: string;
  description: string;
  completed_at: string;
}

export default function Activities() {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [activities, setActivities] = useState<DailyActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'today' | 'week'>('today');
  const [newActivity, setNewActivity] = useState({
    activity_type: '',
    description: '',
    completed_at: format(new Date(), "yyyy-MM-dd'T'HH:mm")
  });

  useEffect(() => {
    if (user) {
      fetchActivities();
    }
  }, [user]);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('daily_activities')
        .select('*')
        .eq('user_id', user?.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('daily_activities')
        .insert([
          {
            user_id: user?.id,
            ...newActivity
          }
        ])
        .select();

      if (error) throw error;

      if (data) {
        setActivities([data[0] as DailyActivity, ...activities]);
        setShowAddForm(false);
        setNewActivity({
          activity_type: '',
          description: '',
          completed_at: format(new Date(), "yyyy-MM-dd'T'HH:mm")
        });
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        const { error } = await supabase
          .from('daily_activities')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setActivities(activities.filter(activity => activity.id !== id));
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.activity_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const activityDate = new Date(activity.completed_at);

    switch (filterPeriod) {
      case 'today':
        return matchesSearch && isToday(activityDate);
      case 'week':
        return matchesSearch && isThisWeek(activityDate, { weekStartsOn: 1 });
      default:
        return matchesSearch;
    }
  });

  const groupActivitiesByDate = () => {
    const groups: { [key: string]: DailyActivity[] } = {};
    filteredActivities.forEach(activity => {
      const date = format(new Date(activity.completed_at), 'yyyy-MM-dd');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
    });
    return groups;
  };

  const groupedActivities = groupActivitiesByDate();

  const getDateDisplay = (date: string) => {
    const activityDate = new Date(date);
    if (isToday(activityDate)) return 'Today';
    if (isYesterday(activityDate)) return 'Yesterday';
    return format(activityDate, 'EEEE, MMMM d, yyyy');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Daily Activities</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Log Activity
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value as 'all' | 'today' | 'week')}
            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Activities</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
          </select>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Log Activity</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Activity Type
                </label>
                <select
                  value={newActivity.activity_type}
                  onChange={(e) => setNewActivity({ ...newActivity, activity_type: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select activity type</option>
                  <option value="Exercise">Exercise</option>
                  <option value="Walking">Walking</option>
                  <option value="Medication">Medication</option>
                  <option value="Meal">Meal</option>
                  <option value="Social">Social Activity</option>
                  <option value="Appointment">Medical Appointment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={newActivity.completed_at}
                  onChange={(e) => setNewActivity({ ...newActivity, completed_at: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Log Activity
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading activities...</p>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm || filterPeriod !== 'all' ? (
              <>
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                No activities found matching your search criteria.
              </>
            ) : (
              <>
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                No activities logged yet. Click the button above to log your first activity.
              </>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedActivities).map(([date, activities]) => (
              <div key={date}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  {getDateDisplay(date)}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Activity className="w-5 h-5 text-blue-500 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{activity.activity_type}</h4>
                              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                <Clock className="w-4 h-4" />
                                {format(new Date(activity.completed_at), 'h:mm a')}
                              </p>
                              <p className="text-sm text-gray-600 mt-2">
                                {activity.description}
                              </p>
                            </div>
                            <button
                              onClick={() => handleDelete(activity.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}