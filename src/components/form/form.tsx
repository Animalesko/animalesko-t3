import React from "react";

export const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  ...props
}) => {
  return (
    <form {...props} className="grid grid-cols-12 gap-3 p-2 bg-orange-300 shadow-md rounded-lg">
      {children}
    </form>
  );
};
