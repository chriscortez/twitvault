t.RangeBox = React.createClass({
  getInitialState: function(){
    return {
      range: (maxRange/2)};
  },handleChange: function(e) {
    this.setState({
      range: e.target.value
    });
  },
  render: function() {
    return (
      <div>
        <t.InputRange handleChange={this.handleChange} />
        <t.RangeDisplay range={this.state.range} />
        <t.TweetsDisplay translate={this.state.range} />
      </div>
    );
  }
});

 React.render(<t.RangeBox />, document.getElementById('range-box-container'));
