import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './components.css';
import CreateLesson from './create-lesson';
import CreateCategory from './create-category';
import CreateTopic from './create-topic';
import withAuth from './withAuth';

const CMS = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const authorizeAdmin = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`/authenticate/get-user-roles/${accessToken}`);
        const data = await response.json();
        setIsAuthorized(data); // Assuming the API response is a boolean value
      } catch (error) {
        console.error('Error:', error.message);
        // Handle the error, display a message to the user, or log it for debugging
      }
    };

    authorizeAdmin();
  }, [getAccessTokenSilently]);

  if (!isAuthorized) {
    // User is not authorized, render a message or redirect to an error page
    return <div>You are not authorized to access this content.</div>;
  }

  // User is authorized, render the components
  return (
    <div className="cms-container">
      <div className="grid-item">
        <CreateCategory />
      </div>
      <div className="grid-item">
        <CreateTopic />
      </div>
      <div className="grid-item">
        <CreateLesson />
      </div>
    </div>
  );
};

export default withAuth(CMS);
