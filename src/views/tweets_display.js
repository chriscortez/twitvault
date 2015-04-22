t.TweetsDisplay = React.createClass({
  getInitialState: function() {
    return {marginTop: this.getMarginTop(this.props.translate)};
  },      
  getMarginTop: function(range) {
    var rangePercentage = Math.round(range/maxRange * 100);
    var marginTop = "-" + rangePercentage + "%";

    return marginTop;
  },
  render: function() {
    var style = {
      marginTop: this.getMarginTop(this.props.translate) 
    };
 
    return (  
      <div id="tweets-container">
        <p>{this.props.translate}</p>
        <div id="tweets" style={style}></div>
      </div>
    );
  }  
})

