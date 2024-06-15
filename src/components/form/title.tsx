import React from "react";

interface TitleProps {
  title: string;
}

export const Title: React.FC<TitleProps> = ({ title }) => {
  return <h1 className="col-span-12 my-4 text-2xl font-semibold">{title}</h1>;
};
