import * as React from 'react';
import { Link } from '@reach/router';
import Error from './Error/Error';

type Props = {
  code: number;
};

const parseError = (code: number) => {
  switch (code) {
    case 404:
      return (
        <p>
          Looks like that email does not exist.{' '}
          <Link style={{ textDecoration: 'underline' }} to="/register">
            Want to try registering?
          </Link>
        </p>
      );
    default:
      break;
  }
};

const FetchError: React.FC<Props> = ({ code }) => <Error>{parseError(code)}</Error>;

export default FetchError;
