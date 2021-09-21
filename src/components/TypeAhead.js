import React, { Component } from "react";
import { getSuggestions } from "../api/api";
export default class TypeAhead extends Component {
  state = {
    text: "",
    suggestions: [],
  };
  onChange = async (e) => {
    this.setState({ text: e.target.value }, async () =>
      this.loadSuggestions(this.state.text)
    );
  };
  loadSuggestions = async (text) => {
    try {
      let data = await getSuggestions(text);
      if (data) this.setState({ suggestions: data });
    } catch (e) {
      console.error("some think went wrong!! please try again.");
    }
  };
  onClick = (e) => {
    this.setState({ text: e.target.id, suggestions: [] }, () =>
      this.props.onTypeAheadChange(this.state.text)
    );
  };
  render() {
    return (
      <div>
        <input onChange={this.onChange} value={this.state.text}></input>
        {this.state.suggestions.map((s, i) => (
          <div key={i}>
            <span onClick={this.onClick} id={s}>
              {s}
            </span>
          </div>
        ))}
      </div>
    );
  }
}
