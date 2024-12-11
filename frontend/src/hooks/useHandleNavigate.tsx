import { useNavigate } from "react-router";

export default function useHandleNavigate() {
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return handleNavigate;
}
