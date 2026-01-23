const Heading = ({ level = 1, text, className = "", ...props }) => {
  const Tag = `h${level}`;

  const headingSizes = {
    1: "text-4xl ",
    2: "text-3xl ",
    3: "text-2xl ",
    4: "text-xl ",
    5: "text-lg ",
    6: "text-base ",
  };

  return (
    <Tag
      className={`${headingSizes[level] || headingSizes[3]} ${className}`}
      {...props}
    >
      {text}
    </Tag>
  );
};

export default Heading;
// import React from "react";
// import { Typography } from "antd";

// const { Title } = Typography;

// const Heading = (props) => {
//   return <Title {...props}>{props.text}</Title>;
// };

// export default Heading;
