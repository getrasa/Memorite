import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Portal } from "react-portal";

export default class MenuPopUp extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(e) {
    e.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu.bind);
    });
  }

  componentDidMount() {
    var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

    console.log("RECT:", rect);
  }

  onTrigger(e) {
    e.preventDefault();

    this.state.showMenu ? this.closeMenu() : this.showMenu(e);

    let window_width = window.innerWidth;
    let window_height = window.innerHeight;
  }

  render() {
    let { trigger, closeOnEscape, closeOnDocumentClicked } = this.props;

    // const { showMenu } = this.state;

    // if (showMenu) {
    //   const element = TestUtils.renderIntoDocument(trigger);
    //   window.document.body.appendChild(element);
    // }

    return (
      <Fragment>
        <div onClick={e => this.onTrigger(e)}>{trigger}</div>
        {this.state.showMenu ? (
          <div className="menu">
            <button className="menu-item">Edit</button>
            <button className="menu-item delete">Delete</button>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
