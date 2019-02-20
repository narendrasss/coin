import * as React from 'react';
import style from './Error.module.scss';
import { Link } from '@reach/router';

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

const Error: React.FC<Props> = ({ code }) => (
  <div className={style.container}>{parseError(code)}</div>
);

export default Error;
