import React from 'react'


const Appointments = () => {
  const [newAppointment, setNewAppointment] = React.useState({
    appointment_date: new Date().toISOString().slice(0, 16),
  });
  return (
    <>
    // Update the date input in the form section
<div>
  <label className="block text-sm font-medium text-gray-700">
    Date & Time
  </label>
  <input
    type="datetime-local"
    value={newAppointment.appointment_date}
    onChange={(e) => {
      const selectedDate = new Date(e.target.value);
      const now = new Date();
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 5);

      if (selectedDate >= now && selectedDate <= maxDate) {
        setNewAppointment({ ...newAppointment, appointment_date: e.target.value });
      }
    }}
    min={new Date().toISOString().slice(0, 16)}
    max={new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    required
  />
  <p className="mt-1 text-sm text-gray-500">Schedule up to 5 years in advance</p>
</div>
    </>
  )
}

export default Appointments