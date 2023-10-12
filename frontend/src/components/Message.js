import { Alert } from "react-bootstrap";

import React from "react";

const Message = ({ variant, children }) => {
  return (
    <>
      <Alert variant={variant}>{children}</Alert>
    </>
  );
};
Message.defaultProps = {
  variant: "success",
};
export default Message;
