import React from "react";

interface Props {
  code: string;
}

export const ForgotTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <p>
      <a href={`http://localhost:3000/forgot-password?code=${code}`}>
        Сбросить пароль
      </a>
    </p>
  </div>
);
