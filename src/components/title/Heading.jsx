
const Heading = ({ level = 1, text, className = "", ...props }) => {
  const Tag = `h${level}`; 

  const headingSizes = {
    1: "text-4xl font-bold",
    2: "text-3xl font-semibold",
    3: "text-2xl font-semibold",
    4: "text-xl font-medium",
    5: "text-lg font-medium",
    6: "text-base font-medium",
  };

  return (
    <Tag className={`${headingSizes[level] || headingSizes[3]} ${className}`} {...props}>
      {text}
    </Tag>
  );
};

export default Heading;
