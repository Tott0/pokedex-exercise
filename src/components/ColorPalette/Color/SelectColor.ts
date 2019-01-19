import { connect } from "react-redux";
import { selectColor } from "../../../actions";
import Color from "./Color";

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    selected: ownProps.color.rgb.trim() === state.selectedColor.trim()
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    onClick: () => dispatch(selectColor(ownProps.color.rgb))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Color);
