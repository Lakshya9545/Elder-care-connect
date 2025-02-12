import React from 'react'


const Medications = () => {
  const [newMedication, setNewMedication] = React.useState({
    start_date: new Date().toISOString().slice(0, 10),
    end_date: '',
  });

  const validateDate = (date: string) => {
    const now = new Date();
    const selectedDate = new Date(date);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 5);

    if (selectedDate >= now && selectedDate <= maxDate) {
      return true;
    }
    return false;
  };

  const getMinDate = () => {
    return new Date().toISOString().slice(0, 10);
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 5);
    return maxDate.toISOString().slice(0, 10);
  };

  return (
    <>
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Start Date
    </label>
    <input
      type="date"
      value={newMedication.start_date}
      onChange={(e) => {
        if (validateDate(e.target.value)) {
          setNewMedication({ ...newMedication, start_date: e.target.value });
        }
      }}
      min={getMinDate()}
      max={getMaxDate()}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">
      End Date (Optional)
    </label>
    <input
      type="date"
      value={newMedication.end_date}
      onChange={(e) => {
        if (validateDate(e.target.value)) {
          setNewMedication({ ...newMedication, end_date: e.target.value });
        }
      }}
      min={newMedication.start_date || getMinDate()}
      max={getMaxDate()}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
    <p className="mt-1 text-sm text-gray-500">Must be after start date</p>
  </div>
</>

  )
}

export default Medications