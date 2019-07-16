import React from "react";
import ReactDOM from "react-dom";
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(`Render Index`, this.props);
    return (
      <div>
        Index
        <button
          onClick={() => {
            console.log(this.state);
          }}
        >
          Index State
        </button>
        <button
          onClick={() => {
            console.log(this.props);
          }}
        >
          Index Props
        </button>
      </div>
    );
  }
}
ReactDOM.render(<Index />, document.getElementById("root"));
