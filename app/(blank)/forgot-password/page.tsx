import { Dialog, DialogContent, DialogTitle } from "@/components/ui";
import { FormForgot } from "@/components/shared";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function ForgotPage() {
  return (
    <Dialog open={true}>
      <DialogContent noClose>
        <DialogTitle>Восстановление пароля</DialogTitle>
        <Suspense>
          <FormForgot />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
