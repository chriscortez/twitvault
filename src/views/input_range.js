var maxRange = "90";

t.InputRange = React.createClass({
  render: function() {
    return (
      <div className="col-xs-12 text-center">
        <input type="range" 
          min="1"
          max={maxRange}
          onInput={this.props.handleChange}
        />
      </div>
    );
  }
});

