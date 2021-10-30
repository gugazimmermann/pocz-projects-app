import { Link as RouterLink } from 'react-router-dom';

interface AuthLinkProps {
  link: string;
  text: string;
}

export function AuthLink({ link, text }: AuthLinkProps) {
  return (
    <div className="flex justify-end">
      <RouterLink to={link} data-testid="routerlinkTestId">
        <div className="text-sm text-primary-600 hover:text-primary-700 hover:underline mb-6">
          {text}
        </div>
      </RouterLink>
    </div>
  );
}

export default AuthLink;
