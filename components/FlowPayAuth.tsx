"use client";
import { usePrivy } from '@privy-io/react-auth';
import { useState, useEffect } from 'react';

export default function FlowPayAuth() {
  const {
    ready,
    authenticated,
    user,
    login,
    logout,
    getAccessToken,
    createWallet,
  } = usePrivy();

  const [isRegistering, setIsRegistering] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (authenticated && user && !userProfile && !isRegistering) {
      handleUserRegistration();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, user]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleUserRegistration = async () => {
    setIsRegistering(true);
    try {
      const token = await getAccessToken();
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.success) {
        setUserProfile(result.user);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
    setIsRegistering(false);
  };

  if (!ready) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <span className="ml-2">Loading FlowPay...</span>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to FlowPay</h2>
          <p className="text-gray-600 mb-6">
            Send money instantly to friends with just their @username. 
            Earn FlowPoints with every transaction.
          </p>
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            Get Started - Auto Wallet Created! 🚀
          </button>
          <p className="text-xs text-gray-500 mt-4">
            Sign in with email, social accounts, or your existing wallet. 
            We'll create a secure crypto wallet for you automatically.
          </p>
        </div>
      </div>
    );
  }

  if (isRegistering) {
    return (
      <div className="max-w-md mx-auto p-6 border rounded-lg">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold mb-2">Setting up your FlowPay account...</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>✓ Creating your crypto wallet</p>
            <p>✓ Generating your @username</p>
            <p>✓ Adding welcome FlowPoints</p>
          </div>
        </div>
      </div>
    );
  }

  if (authenticated && userProfile) {
    return (
      <div className="max-w-md mx-auto p-6 border rounded-lg bg-green-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-green-800 mb-4">🎉 Welcome to FlowPay!</h2>
          <div className="bg-white p-4 rounded-lg mb-4">
            <div className="text-left space-y-2">
              <p><strong>Username:</strong> {userProfile.username}</p>
              <p><strong>Email:</strong> {user?.email?.address}</p>
              <p><strong>Wallet:</strong> {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}</p>
              <p><strong>Login Method:</strong> {user?.linkedAccounts?.map((acc: any) => acc.type).join(', ')}</p>
            </div>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg mb-4">
            <p className="text-yellow-800 font-semibold">🎁 Welcome bonus: 100 FlowPoints!</p>
            <p className="text-yellow-700 text-sm">Start sending money to earn more points</p>
          </div>
          <div className="space-y-2">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Go to Dashboard
            </button>
            <button 
              onClick={logout}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div>Loading user data...</div>;
} 