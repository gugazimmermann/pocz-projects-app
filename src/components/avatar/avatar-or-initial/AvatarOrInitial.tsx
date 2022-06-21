import { getUserInitials } from '@libs';

export interface AvatarOrInitialProps {
  avatar: string | undefined;
  name: string | undefined;
  avatarStyle: string;
  initialStyle: string;
}

export function AvatarOrInitial({
  avatar,
  name,
  avatarStyle,
  initialStyle,
}: AvatarOrInitialProps) {
  function avatarToShow(a: string) {
    if (a.indexOf('http') === 0 || a.indexOf('blob') === 0) return a;
    return `${process.env.REACT_APP_AVATAR_URL}/${avatar}`;
  }

  return avatar ? (
    <img
      className={`${avatarStyle} rounded-full`}
      src={`${avatarToShow(avatar)}`}
      alt={name}
    />
  ) : (
    <span
      className={`${initialStyle} rounded-full flex justify-center items-center text-center font-bold text-primary-500 bg-primary-50`}
    >
      {name ? getUserInitials(name) : (process.env.REACT_APP_PROJECT_NAME as string)[0]}
    </span>
  );
}

export default AvatarOrInitial;
