import { connect } from "react-redux";
import React, { Component } from "react";

import "./StatsTab.scss";

import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { Stat } from "../../../models/Pokemon.model";

const statNames: { [key: string]: string } = {
  hp: "Hp",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed"
};
interface PropTypes {
  stats: Stat[];
}
class StatsTab extends Component<PropTypes> {
  getBarWidthStyle(stat?: number) {
    return {
      width: `${stat ? stat * 2 : 0}px`
    };
  }
  getStat(name: string) {
    const stats = this.props.stats || [];
    return stats.find(s => s.name === name);
  }
  Stat = (props: any) => {
    const { stat } = props;
    return (
      <span className="stat">
        <span className="label">{statNames["" + stat.name]}</span>
        <span className="bar" style={this.getBarWidthStyle(stat.value)} />
        <span className="value">{stat.value}</span>
      </span>
    );
  };
  public render() {
    const { stats } = this.props;
    return (
      <div className="tabWrapper statsTab">
        {stats && stats.length > 0 && [
            <this.Stat key="hp" stat={this.getStat("hp")} />,
            <this.Stat key="attack" stat={this.getStat("attack")} />,
            <this.Stat key="defense" stat={this.getStat("defense")} />,
            <this.Stat key="special-attack" stat={this.getStat("special-attack")} />,
            <this.Stat key="special-defense" stat={this.getStat("special-defense")} />,
            <this.Stat key="speed" stat={this.getStat("speed")} />
          ]}
      </div>
    );
  }

  async componentDidMount() {}
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(StatsTab);
