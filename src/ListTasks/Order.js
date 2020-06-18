import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function Order(props) {
  function handleUpDown() {
    return props.orderUp || props.orderDown ? "hidden" : "";
  }

  function handleUp() {
    return props.orderUp ? "" : "hidden";
  }

  function handleDown() {
    return props.orderDown ? "" : "hidden";
  }

  return (
    <span>
      <FontAwesomeIcon
        icon={faSort}
        className={handleUpDown()}
        data-testid="faSort"
      />
      <FontAwesomeIcon
        icon={faSortUp}
        className={handleUp()}
        data-testid="faSortUp"
      />
      <FontAwesomeIcon
        icon={faSortDown}
        className={handleDown()}
        data-testid="faSortDown"
      />
    </span>
  );
}

Order.propTypes = {
  orderUp: PropTypes.bool.isRequired,
  orderDown: PropTypes.bool.isRequired,
};

export default Order;
