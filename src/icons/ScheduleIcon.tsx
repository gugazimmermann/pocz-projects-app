import { IconProps } from './iconprops';

export function ScheduleIcon({ styles }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles}
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <line x1="16" y1="3" x2="16" y2="7" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="4" y1="11" x2="20" y2="11" />
      <line x1="11" y1="15" x2="12" y2="15" />
      <line x1="12" y1="15" x2="12" y2="18" />
    </svg>
  );
}

export default ScheduleIcon;