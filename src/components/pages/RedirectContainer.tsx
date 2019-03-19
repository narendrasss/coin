import * as React from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';

const RedirectContainer: React.FC<RouteComponentProps> = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Redirect to="/login" noThrow />;
  }
  return <Redirect to="/home" noThrow />;
};

export default RedirectContainer;
