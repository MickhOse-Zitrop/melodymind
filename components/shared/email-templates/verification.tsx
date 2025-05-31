import React from "react";

interface Props {
  code: string;
}

export const VerificationTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
        Подтвердить регистрацию
      </a>
    </p>
  </div>
);
