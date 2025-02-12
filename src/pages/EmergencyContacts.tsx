import React from 'react'


const EmergencyContacts = () => {
  const [newContact, setNewContact] = React.useState({
    phone_number: '',
  });
  const formatPhoneNumber = (value: string) => {
    const match = value.slice(0, 10).match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };
  return (
   <>
   
<div>
  <label className="block text-sm font-medium text-gray-700">
    Phone Number
  </label>
  <input
    type="tel"
    value={newContact.phone_number}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
      setNewContact({ ...newContact, phone_number: formatPhoneNumber(value) });
    }}
    pattern="\+?\d{0,3}[-]?\d{10}"
    maxLength={12}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    required
    placeholder="123-456-7890"
  />
  <p className="mt-1 text-sm text-gray-500">Enter a 10-digit phone number</p>
</div>
   </>
  )
}

export default EmergencyContacts