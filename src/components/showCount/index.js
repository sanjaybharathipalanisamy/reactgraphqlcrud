import React from "react";

const ShowCount = ({ count = 0 }) => {
  if (count === 0) {
    return <p data-testid="para">No records found</p>;
  } else if (count === 1) {
    return <p data-testid="para">Totally {count} record</p>;
  } else {
    return <p data-testid="para">Totally {count} records</p>;
  }
};

export default ShowCount;
