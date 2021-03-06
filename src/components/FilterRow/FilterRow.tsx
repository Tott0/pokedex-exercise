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

import { store } from "../..";
import {
  fetchTypesIfNeeded,
  selectPokemonType,
  sortPokemonsBy
} from "../../actions";

import { NUMBER_ASC, NUMBER_DSC, NAME_ASC, NAME_DSC } from "../../constants";

import { ThunkDispatch } from "redux-thunk";
import { Type } from "../../models/Pokemon.model";
import { customHistory } from "../App/App";

interface PropTypes {
  types?: Type[];
  selectedType?: Type;
  sortedBy?: string;
}
class FilterRow extends Component<PropTypes> {
  typeItemSelected(index: number) {
    const types = this.props.types || [];
    const selectedType = types[index];
    (store.dispatch as ThunkDispatch<{}, {}, any>)(
      selectPokemonType(selectedType)
      );
    customHistory.replace("/");
  }

  sortItemSelected(sortedBy: string) {
    (store.dispatch as ThunkDispatch<{}, {}, any>)(sortPokemonsBy(sortedBy));
    customHistory.replace("/");
  }

  getSortTitle() {
    switch (this.props.sortedBy) {
      case NUMBER_DSC:
        return "By number (desc)";
      case NAME_ASC:
        return "By name (asc)";
      case NAME_DSC:
        return "By name (desc)";
      case NUMBER_ASC:
      default:
        return "By number (asc)";
    }
  }

  public render() {
    const { types, selectedType } = this.props;
    return (
      <section className="filterRow">
        <Container>
          <Form.Row>
            <Col className="dropCol" xs={12} sm={6} md={4}>
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
            <Col className="dropCol" xs={12} sm={6} md={4}>
              <DropdownButton
                className="sortBtn"
                size="lg"
                variant="light"
                title={this.getSortTitle()}
              >
                <Dropdown.Item
                  onSelect={() => {
                    this.sortItemSelected(NUMBER_ASC);
                  }}
                >
                  By number (asc)
                </Dropdown.Item>
                <Dropdown.Item
                  onSelect={() => {
                    this.sortItemSelected(NUMBER_DSC);
                  }}
                >
                  By number (desc)
                </Dropdown.Item>
                <Dropdown.Item
                  onSelect={() => {
                    this.sortItemSelected(NAME_ASC);
                  }}
                >
                  By name (asc)
                </Dropdown.Item>
                <Dropdown.Item
                  onSelect={() => {
                    this.sortItemSelected(NAME_DSC);
                  }}
                >
                  By name (desc)
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Form.Row>
        </Container>
      </section>
    );
  }
}

function mapStateToProps(state: any) {
  const { getTypes } = state;
  return {
    ...getTypes
  };
}

export default connect(mapStateToProps)(FilterRow);
