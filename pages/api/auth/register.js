import { createClient } from '@supabase/supabase-js';
import { PrivyApi } from '@privy-io/server-auth';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const privy = new PrivyApi({
  appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
  appSecret: process.env.PRIVY_APP_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify Privy token
    const authToken = req.headers.authorization?.replace('Bearer ', '');
    if (!authToken) {
      return res.status(401).json({ error: 'No auth token' });
    }

    const privyUser = await privy.verifyAuthToken(authToken);
    console.log('Verified user:', privyUser);

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*, user_balances(*)')
      .eq('privy_id', privyUser.userId)
      .single();

    if (existingUser) {
      return res.json({
        success: true,
        user: existingUser,
        message: 'Welcome back!',
        isNewUser: false,
      });
    }

    // Generate unique username
    let username = `@user${Math.floor(Math.random() * 10000)}`;
    let attempts = 0;
    while (attempts < 10) {
      const { data: usernameExists } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .single();
      if (!usernameExists) break;
      username = `@user${Math.floor(Math.random() * 100000)}`;
      attempts++;
    }

    // Create user record
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert([
        {
          privy_id: privyUser.userId,
          username: username,
          wallet_address: privyUser.wallet?.address || '',
          email: privyUser.email || '',
          phone: privyUser.phone || '',
          trust_level: 'new',
          trust_points: 0,
        },
      ])
      .select()
      .single();

    if (userError) throw userError;

    // Create balance record
    await supabase.from('user_balances').insert([
      {
        user_id: newUser.id,
        usdc_balance: 0,
        flowpoints_balance: 100, // Welcome bonus
      },
    ]);

    // Record welcome FlowPoints
    await supabase.from('flowpoints').insert([
      {
        user_id: newUser.id,
        points_earned: 100,
        reason: 'welcome_bonus',
      },
    ]);

    res.json({
      success: true,
      user: newUser,
      message: 'Account created successfully!',
      isNewUser: true,
      welcomeBonus: 100,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed',
      details: error.message,
    });
  }
} 