const selectedColor = (state = "0, 0, 0", action: any) => {
  switch (action.type) {
    case "SELECT_COLOR":
      return action.rgb;
    default:
      return state;
  }
};

export default selectedColor;
