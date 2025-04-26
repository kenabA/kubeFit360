import useHandleNavigate from "@/hooks/useHandleNavigate";

export function useRedirectAfterLogin(role: string) {
  const handleNavigate = useHandleNavigate();
  switch (role) {
    case "maintainer":
      handleNavigate("/maintainer-dashboard");
      break;
    case "admin":
      handleNavigate("/admin-dashboard");
      break;
  }
}
