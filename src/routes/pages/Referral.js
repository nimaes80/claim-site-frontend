import React from 'react';
import { Navigate, useParams } from "react-router-dom";

function Referral() {
    let uuid = useParams().uuid;
    localStorage.setItem('ref', uuid);
  return (
    <Navigate to='/' />
  );
};

export default Referral;