// Utility functions for the application

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const smoothScroll = (element: HTMLElement | null) => {
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const formatPhoneNumber = (phone: string): string => {
  return phone
    .replace(/\D/g, '')
    .replace(/^(\d{3})(\d{3})(\d{4})$/, '+1 ($1) $2-$3');
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
