import React, { Component } from "react";

import { NavLink, Link } from "react-router-dom";
import { Container, Row, Pagination } from "react-bootstrap";

import "./PokemonPaginator.scss";

import classnames from "classnames";

import { POKEMONS_PER_PAGE } from "../../../constants";
import { connect } from "react-redux";

interface PropTypes {
  page?: number;
  totalPokemons?: number;
}
class PokemonPaginator extends Component<PropTypes> {
  public render() {
    let pages = [];
    let { page, totalPokemons } = this.props;
    page = page || 1;
    totalPokemons = totalPokemons || 0;

    const lastPage = Math.floor((totalPokemons / POKEMONS_PER_PAGE)) + (totalPokemons%POKEMONS_PER_PAGE > 0 ? 1 : 0);
    const isFirst = page === 1;
    const isLast = page === lastPage;

    if (isFirst) {
      pages = [1, 2, 3];
    } else {
      if (isLast) {
        if(page === 2){
          pages = [page - 1, page]
        }else{
          pages = [page - 2, page - 1, page];
        }
      } else {
        pages = [page - 1, page, page + 1];
      }
    }

    return (
      <Container className="pokemonPaginator">
        <Row>
          <Pagination>
            <li
              className={classnames("page-item", "first", {
                disabled: isFirst
              })}
            >
              {isFirst ? (
                <span className="page-link">
                  <i className="fas fa-fast-backward" />
                </span>
              ) : (
                <Link
                  className="page-link"
                  to={{ pathname: "/", search: `?page=${1}` }}
                >
                  <i className="fas fa-fast-backward" />
                </Link>
              )}
            </li>

            <li
              className={classnames("page-item", "back", { disabled: isFirst })}
            >
              {isFirst ? (
                <span className="page-link">
                  <i className="fas fa-step-backward" />
                </span>
              ) : (
                <Link
                  className="page-link"
                  to={{ pathname: "/", search: `?page=${page - 1}` }}
                >
                  <i className="fas fa-step-backward" />
                </Link>
              )}
            </li>

            {pages.map((p, index) => {
              page = page || 1;
              return (
                <li key={index.toString()} className="page-item">
                  <NavLink
                    className="page-link"
                    activeClassName="selected"
                    to={{ pathname: "/", search: `?page=${p}` }}
                  >
                    {p}
                  </NavLink>
                </li>
              );
            })}

            <li
              className={classnames("page-item", "next", { disabled: isLast })}
            >
              {isLast ? (
                <span className="page-link">
                  <i className="fas fa-step-forward" />
                </span>
              ) : (
                <Link
                  className="page-link"
                  to={{ pathname: "/", search: `?page=${page + 1}` }}
                >
                  <i className="fas fa-step-forward" />
                </Link>
              )}
            </li>

            <li
              className={classnames("page-item", "last", { disabled: isLast })}
            >
              {isLast ? (
                <span className="page-link">
                  <i className="fas fa-fast-forward" />
                </span>
              ) : (
                <Link
                  className="page-link"
                  to={{ pathname: "/", search: `?page=${lastPage}` }}
                >
                  <i className="fas fa-step-forward" />
                </Link>
              )}
            </li>
          </Pagination>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state: any) {
  const { page, totalPokemons } = state.getPokemons;
  return {
    page,
    totalPokemons
  };
}

export default connect(mapStateToProps)(PokemonPaginator);
