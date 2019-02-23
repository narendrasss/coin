import * as React from 'react';
import Button from './Button/Button';

const SubmitButton: React.FC = ({ children }) => (
  <Button style={{ display: 'flex', justifyContent: 'center' }} type="submit">
    {children}
  </Button>
);

export default SubmitButton;
