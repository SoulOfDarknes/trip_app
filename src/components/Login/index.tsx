import React, { useState } from 'react';
import { auth, googleAuthProvider, signInWithPopup } from '../../firebaseConfig';
import './styles.css';

export const Login = () => {
   const [userPhoto, setUserPhoto] = useState<string | null>(null);


  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      setUserPhoto(user.photoURL);
    } catch (error) {
      console.error('Login Failed:', error);
    }
  };

  return (
    <div className='login' onClick={signInWithGoogle}>
      {userPhoto ? (
        <img src={userPhoto} alt="User avatar" className="user-avatar login" />
      ) : (
        <div>Login</div>
      )}
    </div>
  );
};
