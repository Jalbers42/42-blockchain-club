import React, { useContext } from 'react'
import OAuthCallback from './OAuthCallback'
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { userData } = useContext(UserContext);

  if (!userData)
    return <OAuthCallback />;

  return (
    <div className="w-[100] flex flex-col items-center justify-center">
        <h1 className="text-t_green font-bold underline">Account Data</h1>
        <pre className="text-t_green text-xs">{JSON.stringify(userData, null, 2)}</pre>
    </div>
  )
}

export default Home