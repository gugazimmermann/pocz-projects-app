import { Link } from 'react-router-dom';
import { Lang } from '@lang';
import { AuthRoutes } from '@routes';

export function SignupLink() {
  return (
    <div className="max-w-lg mx-auto text-center mt-12 mb-6">
      <p className="text-white">
        {Lang.Auth.NoAccount}
        {' '}
        <Link to={AuthRoutes.SignUp} data-testid="signupLinkId">
          <span className="font-bold hover:underline">{Lang.Auth.SignUp.SignUp}</span>
          .
        </Link>
      </p>
    </div>
  );
}

export default SignupLink;
