import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useToast } from "stores/toastStore";

async function login({ username, password, role }) {
  const signInResponse = await signIn("credentials", {
    username,
    password,
    role,
    redirect: false,
  });
  if (!signInResponse.ok) {
    throw signInResponse;
  }
  return signInResponse;
}

export function loginMutation({ username, password, role }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [toastSuccess, toastError] = useToast();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(() => login({ password, username, role }), {
    onError: (response) => toastError(response.error),
    onSuccess: () => toastSuccess("Successfully logged in"),
  });
}
