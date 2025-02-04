import React from 'react';
import { Plus } from 'lucide-react';

export default function Activities() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Daily Activities</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          Log Activity
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center py-8 text-gray-500">
          No activities logged yet. Click the button above to log your first activity.
        </div>
      </div>
    </div>
  );
}