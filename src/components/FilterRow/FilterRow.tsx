import { connect } from "react-redux";
import React, { Component } from "react";

import "./FilterRow.scss";

import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row
} from "react-bootstrap";
// import Color from "./Color/Color";
// import SelectColor from "./Color/SelectColor";

import { store } from "../..";
import { fetchTypesIfNeeded, selectPokemonType } from "../../actions";

import { ThunkDispatch } from "redux-thunk";
import { Type } from "../../models/Pokemon.model";

interface PropTypes {
  types?: Type[];
  selectedType?: Type;
}
class FilterRow extends Component<PropTypes> {
  typeItemSelected(index: number) {
    const types = this.props.types || [];
    const selectedType = types[index];
    (store.dispatch as ThunkDispatch<{}, {}, any>)(
      selectPokemonType(selectedType)
    );
  }
  public render() {
    const { types, selectedType } = this.props;
    return (
      <section className="filterRow">
        <Container>
          <Form.Row>
            <Col className="px-3" xs={12} sm={6} md={4}>
              <DropdownButton
                className="typeBtn"
                size="lg"
                variant="light"
                title={selectedType ? selectedType.name : "Filter by type..."}
              >
                <Dropdown.Item
                  onSelect={() => {
                    this.typeItemSelected(-1);
                  }}
                >
                  Filter by type...
                </Dropdown.Item>
                {types &&
                  types.map((type: Type, index: number) => (
                    <Dropdown.Item
                      key={index.toString()}
                      onSelect={() => {
                        this.typeItemSelected(index);
                      }}
                    >
                      {type.name}
                    </Dropdown.Item>
                  ))}
              </DropdownButton>
            </Col>
            <Col className="px-3" xs={12} sm={6} md={4}>
              <DropdownButton
                className="sortBtn"
                size="lg"
                variant="light"
                title="Sort..."
              >
                <Dropdown.Item>By number (asc)</Dropdown.Item>
                <Dropdown.Item>By number (desc)</Dropdown.Item>
                <Dropdown.Item>By name (asc)</Dropdown.Item>
                <Dropdown.Item>By name (desc)</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Form.Row>
        </Container>
      </section>
    );
  }

  async componentDidMount() {
    (store.dispatch as ThunkDispatch<{}, {}, any>)(fetchTypesIfNeeded());
  }
}

function mapStateToProps(state: any) {
  const { getTypes } = state;
  console.log(getTypes);
  return {
    ...getTypes
  };
}

export default connect(mapStateToProps)(FilterRow);
