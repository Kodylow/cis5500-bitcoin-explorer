import React from "react";

export interface IAboutPageProps {}

const AboutPage: React.FC<IAboutPageProps> = (props) => {
  const [ message, setMessage ] = React.useState("");
  return (
    <div>
      <p>About Page</p>
    </div>
  );
};

export default AboutPage;
