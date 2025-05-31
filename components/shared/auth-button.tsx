import React from "react";
import { AuthorizationModal } from "@/components/shared/modals";
import { UserMenu } from "@/components/shared/user-menu";
import { useSession } from "next-auth/react";

export const AuthButton: React.FC = () => {
  const { data: session } = useSession();

  return !session ? <AuthorizationModal /> : <UserMenu session={session} />;
};
