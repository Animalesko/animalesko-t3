import React, { useState } from "react";

interface SingleActionCustomToastProps {
  title: string;
  message: string;
  onClick: () => void;
}

export const SingleActionCustomToast: React.FC<
  SingleActionCustomToastProps
> = ({ message, onClick, title }) => {
  const [disable, setDisable] = useState(false);

  return (
    <div className="flex flex-col items-center rounded-lg bg-secondary-200 p-4 shadow-md">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="">{message}</p>

      <button
        onClick={() => {
          setDisable(true);
          onClick();
        }}
        disabled={disable}
        className="mt-4 rounded-lg border border-black bg-primary-900 px-2 font-semibold text-white"
      >
        Sim
      </button>
    </div>
  );
};
