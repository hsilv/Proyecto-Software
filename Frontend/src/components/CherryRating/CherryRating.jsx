import PropTypes from "prop-types";
import { Rating } from "@smastrom/react-rating";

const cherryDrawing = (
  <>
    <path d="M0 0h24v24H0z" stroke="none" fill="none" strokeWidth={2} />
    <path
      d="M7.5 16.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0 "
      stroke="#BF3545"
      strokeWidth={1.5}
    />
    <path
      d="M17 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
      stroke="#BF3545"
      strokeWidth={1.5}
    />
    <path
      d="M9 13c.366 -2 1.866 -3.873 4.5 -5.6"
      stroke="#BF3545"
      strokeWidth={1.5}
    />
    <path
      d="M17 15c-1.333 -2.333 -2.333 -5.333 -1 -9"
      stroke="#BF3545"
      strokeWidth={1.5}
    />
    <path
      d="M5 6c3.667 -2.667 7.333 -2.667 11 0c-3.667 2.667 -7.333 2.667 -11 0"
      stroke="#BF3545"
      strokeWidth={1.5}
    />
  </>
);

const customCherry = {
  itemShapes: cherryDrawing,
  activeFillColor: "#BF3545",
  inactiveFillColor: "transparent",
};

function CherryRating({ value, itemStyles, className, onChange, readOnly }) {
  return (
    <Rating
      value={value}
      itemStyles={itemStyles}
      className={className}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
}

CherryRating.propTypes = {
  value: PropTypes.number.isRequired,
  itemStyles: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

CherryRating.defaultProps = {
  itemStyles: customCherry,
  className: "",
  onChange: null,
  readOnly: false,
};

export default CherryRating;
