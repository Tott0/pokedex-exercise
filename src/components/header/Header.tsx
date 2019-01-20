import classNames from "classnames";
import { connect } from "react-redux";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./Header.scss";

import { Container, Dropdown, Form, InputGroup, Navbar } from "react-bootstrap";
import { filterPokemonsByName } from "../../actions";
import { ThunkDispatch } from "redux-thunk";
import { store } from "../..";
import { Pokemon } from "../../models/Pokemon.model";

interface HeaderProps {
  searchedPokemons?: Pokemon[];
}
class Header extends Component<HeaderProps> {
  nameInput: React.RefObject<any>;

  constructor(props: Readonly<HeaderProps>) {
    super(props);
    this.nameInput = React.createRef();
  }
  filterPokemons(name: string){
    (store.dispatch as ThunkDispatch<{}, {}, any>)(
      filterPokemonsByName(name)
    );
  }
  nameChanged = (ev: any) => {
    this.filterPokemons(ev.target.value);
    
  }
  pokemonSelected(index: number) {
    const pokemons = this.props.searchedPokemons || [];
    const selectedPokemon = pokemons[index];
  }
  public render() {
    const { searchedPokemons } = this.props || [];
    return (
      <header className="appHeader">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <NavLink to="/">Pokedéx</NavLink>
            </Navbar.Brand>
            <Form inline>
              <Dropdown>
                <InputGroup className="searchInput">
                  <Form.Control
                    type="text"
                    placeholder="Search by name..."
                    className="border-0"
                    ref={this.nameInput}
                    onChange={this.nameChanged}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text className="searchIcon">
                      <i className="fas fa-search" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>

                <Dropdown.Menu
                  className={classNames({
                    show: searchedPokemons && searchedPokemons.length > 0
                  })}
                >
                  {searchedPokemons &&
                    searchedPokemons.map((pokemon: Pokemon, index: number) => (
                      <NavLink
                        className="dropdown-item"
                        role="button"
                        to={`/pokemon/${pokemon.name}`}
                        key={index.toString()}
                        onClick={ev => {
                          this.nameInput.current.value = "";
                          this.filterPokemons("");
                        }}
                      >
                        {pokemon.name}
                      </NavLink>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </Container>
        </Navbar>
      </header>
    );
  }
}

function mapStateToProps(state: any) {
  const { searchedPokemons } = state.getPokemons;
  const pokemons = searchedPokemons.slice(0, 5);
  return {
    searchedPokemons: pokemons
  };
}

export default connect(mapStateToProps)(Header);
