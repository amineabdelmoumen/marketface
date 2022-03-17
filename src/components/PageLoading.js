import React from 'react';

function PageLoading(props) {
  return (
    <div className="position-fixed top-0 start-0 bottom-0 end-0 bg-white">
      <div className="d-flex w-100 h-100 justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default PageLoading;