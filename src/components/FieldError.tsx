import React from 'react';

interface FieldErrorProps {
  id: string;
  message: string;
  marginTop?: number;
}

/** Inline validation message shown under a form field. Renders nothing when there is no error. */
export const FieldError: React.FC<FieldErrorProps> = ({ id, message, marginTop = 4 }) =>
  message ? (
    <div id={id} role="alert" style={{ color: '#DC2626', fontSize: '12px', marginTop }}>
      {message}
    </div>
  ) : null;
