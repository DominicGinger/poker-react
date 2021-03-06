import React, { PropTypes } from 'react';

const buttonStyling = 'pure-button pure-button-primary';

class Controls extends React.Component {
  constructor() {
    super();
    this.state = { playerName: '', betAmount: 0 };
  }

  render() {
    switch (this.props.mode) {
      case 'begin': {
        const setName = e => this.setState({ playerName: e.target.value });
        const begin = () => this.props.begin(this.state.playerName);
        return (<div>
          <input type="text" value={this.state.playerName} onChange={setName} />
          <button className={buttonStyling} onClick={begin}>Begin</button>
        </div>);
      }
      case 'roundOne': {
        const setAmount = e => this.setState({ betAmount: e.target.value });
        const bet = () => this.props.roundOne.bet(parseInt(this.state.betAmount, 10));
        return (<div>
          <input style={{ width: '55px' }} type="number" value={this.state.betAmount} onChange={setAmount} />
          <button className={buttonStyling} onClick={bet}>Bet</button>
          <button className={buttonStyling} onClick={this.props.roundOne.pass}>Pass</button>
          <button className={buttonStyling} onClick={this.props.roundOne.fold}>Fold</button>
        </div>);
      }
      case 'roundTwo': {
        return (<div>
          <button className={buttonStyling} onClick={this.props.roundTwo.pass}>Pass</button>
          <button className={buttonStyling} onClick={this.props.roundTwo.fold}>Fold</button>
        </div>);
      }
      default:
        return null;
    }
  }
}

Controls.propTypes = {
  mode: PropTypes.string.isRequired,
  begin: PropTypes.func.isRequired,
  roundOne: PropTypes.shape({
    bet: PropTypes.func.isRequired,
    pass: PropTypes.func.isRequired,
    fold: PropTypes.func.isRequired,
  }),
  roundTwo: PropTypes.shape({
    pass: PropTypes.func.isRequired,
    fold: PropTypes.func.isRequired,
  }),
};

export default Controls;
