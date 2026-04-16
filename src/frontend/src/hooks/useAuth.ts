import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const {
    identity,
    login,
    clear: logout,
    loginStatus,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginError,
  } = useInternetIdentity();

  const principal = identity?.getPrincipal();

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    login,
    logout,
    loginStatus,
    loginError,
    identity,
    principal,
    principalText: principal?.toText(),
  };
}
