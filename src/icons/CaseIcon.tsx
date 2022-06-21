import { IconProps } from './iconprops';

export function CaseIcon({ styles, stroke }: IconProps) {
  return (
    <svg
      className={styles}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M14 3v5h5M16 13H8M16 17H8M10 9H8"
      />
    </svg>
  );
}

export default CaseIcon;
