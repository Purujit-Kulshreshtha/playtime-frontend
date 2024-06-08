import React from "react";

const Container = (props: { children: React.ReactElement }) => {
  return (
    <div className="backdrop-blur-2xl backdrop-brightness-[2] shadow-md shadow-[#090909] rounded-3xl">
      {props.children}
    </div>
  );
};

export default Container;
