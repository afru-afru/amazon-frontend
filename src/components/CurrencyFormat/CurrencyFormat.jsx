// import React from "react";
import PropTypes from "prop-types";
import numeral from "numeral";

const CurrencyFormat = ({ amount }) => {
    const formattedAmount = numeral(amount).format("$0,0.00");
    return <div>{formattedAmount}</div>;
};

CurrencyFormat.propTypes = {
    amount: PropTypes.number.isRequired, // Ensure amount is a required number
};

export default CurrencyFormat;