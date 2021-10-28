import { Link } from 'react-router-dom';
import { AuthRoutes } from '../../../routes';

export function SignupLink() {
  return (
    <div className="max-w-lg mx-auto text-center mt-12 mb-6">
      <p className="text-white">
        Não tem uma conta?
        {' '}
        <Link to={AuthRoutes.SignUp}>
          <span className="font-bold hover:underline">Cadastrar</span>
          .
        </Link>
      </p>
    </div>
  );
}

export default SignupLink;
