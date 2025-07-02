
import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  if (isSignIn) {
    return <SignIn onSwitchToSignUp={() => setIsSignIn(false)} />;
  } else {
    return <SignUp onSwitchToSignIn={() => setIsSignIn(true)} />;
  }
};

export default AuthPage;
