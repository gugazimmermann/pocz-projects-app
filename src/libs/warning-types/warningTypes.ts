export enum WARNING_TYPES {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
  NONE = '',
}

export function warningTypes(type: WARNING_TYPES | undefined): {
  text: string;
  bg: string;
  border: string;
  bgOpacity: string;
} {
  let text: string;
  let bg: string;
  let bgOpacity: string;
  let border: string;

  if (type === WARNING_TYPES.SUCCESS) {
    text = 'text-white';
    bg = 'bg-green-500';
    bgOpacity = 'bg-green-500/25';
    border = 'border-green-500';
  } else if (type === WARNING_TYPES.WARNING) {
    text = 'text-white';
    bg = 'bg-secondary-500';
    bgOpacity = 'bg-secondary-500/25';
    border = 'border-secondary-500';
  } else if (type === WARNING_TYPES.ERROR) {
    text = 'text-white';
    bg = 'bg-red-500';
    bgOpacity = 'bg-red-500/25';
    border = 'border-red-500';
  } else if (type === WARNING_TYPES.INFO) {
    text = 'text-white';
    bg = 'bg-blue-500';
    bgOpacity = 'bg-blue-500/25';
    border = 'border-blue-500';
  } else {
    text = 'text-white';
    bg = 'bg-primary-500';
    bgOpacity = 'bg-primary-500/25';
    border = 'border-primary-500';
  }

  return {
    text, bg, bgOpacity, border,
  };
}
