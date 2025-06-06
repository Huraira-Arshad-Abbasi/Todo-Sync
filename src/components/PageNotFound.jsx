// import React from 'react';
import '../css/PageNotFound.css'; 
import { useNavigate } from 'react-router-dom';
function PageNotFound() {

 const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="pageNfound-container">
      <h1>404 - Page Not Found</h1>
      <p>
        Oops! The page you{"'"}re looking for doesn{"'"}t exist. 
      </p>
     
      <div className="button-group">
        <button  onClick={handleReload}>
          Reload Page
        </button>
        <button  onClick={() => navigate('/')}>
          Go to home Page
        </button>
        <button  onClick={() => navigate('/register')}>
          Go to Log In Page
        </button>
      </div>
    </div>
  );
}
export default PageNotFound;
