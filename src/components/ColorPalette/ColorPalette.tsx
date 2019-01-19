import { connect } from "react-redux";
import React, { Component } from "react";

import "./ColorPalette.scss";

import { Col, Container, Row } from "react-bootstrap";
import Color from "./Color/Color";
import SelectColor from "./Color/SelectColor";

import { store } from "../..";
import { fetchColorsIfNeeded } from "../../actions";

import { ThunkDispatch } from 'redux-thunk'

interface PropTypes {
  colors?: any[];
}
class ColorPalette extends Component<PropTypes> {
  colors: any;
  public render() {
    return (
      <section className="colorPalette">
        <Container>
          <h3 className="sectionTitle">Color Palette</h3>
          <div className="colors">
            {
              this.props.colors &&
              this.props.colors.map((color: any, index: number) => (
              <SelectColor key={index.toString()} color={color} />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  async componentDidMount(){
    (store.dispatch as ThunkDispatch<{}, {}, any>)(fetchColorsIfNeeded());
  }
}

function mapStateToProps(state: any) {
  console.log('map', state);
  const { colors: colors } = state.getColors
  console.log({...state.getColors});
  return {
    ...state.getColors,
  }
}

export default connect(mapStateToProps)(ColorPalette);
