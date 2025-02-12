// Validation utilities
export const validatePhoneNumber = (phone: string): boolean => {
  // Matches phone numbers in formats:
  // +1-234-567-8901
  // +44-1234-567890
  // 1234567890
  const phoneRegex = /^(\+\d{1,3}[-]?)?\d{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const validateDate = (date: string): boolean => {
  const selectedDate = new Date(date);
  const minDate = new Date('1900-01-01');
  const maxDate = new Date('2100-12-31');
  return selectedDate >= minDate && selectedDate <= maxDate;
};

export const getMaxDate = (): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 5); // Allow scheduling up to 5 years in future
  return date.toISOString().split('T')[0];
};

export const getMinDate = (): string => {
  const date = new Date();
  date.setFullYear(1900); // Reasonable minimum date
  return date.toISOString().split('T')[0];
};