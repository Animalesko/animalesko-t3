import { Tooltip } from "@nextui-org/react";
import React, { useState } from "react";

interface CopiableCodePros {
  code: string;
}

export const CopiableCode: React.FC<CopiableCodePros> = ({ code }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex flex-row gap-4 rounded-lg border-1 border-black bg-secondary-200">
      <Tooltip content={code}>
        <pre className="max-w-[200px] truncate p-2">{code}</pre>
      </Tooltip>

      <Tooltip isOpen={clicked} content="Copiado">
        <button
          className="rounded-r-lg border-1 border-l-black bg-primary-900 p-2 text-white"
          onClick={() => {
            navigator.clipboard.writeText(code).catch(console.error);
            setClicked(true);
          }}
          onBlur={() => {
            setClicked(false);
          }}
          onMouseLeave={() => {
            setClicked(false);
          }}
        >
          Copiar
        </button>
      </Tooltip>
    </div>
  );
};
