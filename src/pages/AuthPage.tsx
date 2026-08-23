import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

interface AuthPageProps {
  mode: 'login' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
  const { login, signup, navigateTo, user } = useShop();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      navigateTo(user.role === 'admin' ? 'admin' : 'home');
    }
  }, [user, navigateTo]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    if (mode === 'signup') {
      const result = await signup(fullName, email, password);
      setMessage(result.message);
      if (result.success) {
        navigateTo('home');
      }
    } else {
      const result = await login(email, password);
      setMessage(result.message);
      if (result.success) {
        navigateTo('home');
      }
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="rounded-3xl overflow-hidden shadow-xl border border-[#d2c4ba] bg-[#f0ebe3]">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
            alt="Velora editorial"
            className="h-full min-h-[420px] w-full object-cover"
          />
        </div>

        <div className="bg-white border border-[#d2c4ba] p-8 rounded-3xl shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#715a44] font-semibold">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </p>
          <h1 className="font-serif text-4xl mt-2 mb-6 text-[#1b1c1a]">
            {mode === 'login' ? 'Login to Velora' : 'Sign Up for Velora'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#715a44] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-[#d2c4ba] px-4 py-3 text-sm focus:outline-none focus:border-[#1b1c1a]"
                  placeholder="Your full name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#715a44] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#d2c4ba] px-4 py-3 text-sm focus:outline-none focus:border-[#1b1c1a]"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#715a44] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#d2c4ba] px-4 py-3 text-sm focus:outline-none focus:border-[#1b1c1a]"
                placeholder="At least 6 characters"
                required
              />
            </div>

            {message && (
              <div className="rounded border border-[#d2c4ba] bg-[#f5f3ef] px-3 py-2 text-sm text-[#1b1c1a]">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1b1c1a] text-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#2f2f2d] transition-colors disabled:opacity-70"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-sm text-[#5f5e5e]">
            {mode === 'login' ? 'New to Velora?' : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => navigateTo(mode === 'login' ? 'signup' : 'login')}
              className="font-semibold text-[#1b1c1a] hover:text-[#715a44]"
            >
              {mode === 'login' ? 'Create account' : 'Login'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
