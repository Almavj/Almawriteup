import { useCallback, useEffect, useState } from "react";
import { api } from "../api";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const token = api.getToken();
    setIsAuthenticated(!!token);
    setIsInitializing(false);
  }, []);

  const login = useCallback(async (password: string) => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      await api.login(password);
      setIsAuthenticated(true);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setIsLoggingIn(false);
    }
  }, []);

  const logout = useCallback(() => {
    api.logout();
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    login,
    logout,
    loginError,
  };
}
