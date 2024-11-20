import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any)=> {
    let user = localStorage.getItem('user');

    if(user) {
      user = JSON.parse(user);
    }
    if (!user) {
      return <Navigate to="/login" />;
    }
    return <WrappedComponent {...props} />;
    
  };
};

export default withAuth;
