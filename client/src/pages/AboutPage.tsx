import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface IAboutPageProps {}

const AboutPage: FC<IAboutPageProps> = (props) => {
  const [message, setMessage] = useState("");
  const { number } = useParams();

  useEffect(() => {
    if (number) {
      setMessage(`The number is ${number}`);
    } else {
      setMessage("No number provided");
    }
  }, [number]);
  return (
    <div>
      <p>About Page</p>
      <p>{message}</p>
    </div>
  );
};

export default AboutPage;
