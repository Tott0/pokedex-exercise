import { connect } from "react-redux";
import { selectColor } from "../../../actions";
import Font from "./Font";

const mapStateToProps = (state: any) => {
  return {
    rgb: state.selectedColor
  };
};

export default connect(mapStateToProps)(Font);
