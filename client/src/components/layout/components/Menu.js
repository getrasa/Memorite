import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Portal } from "react-portal";

export class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      showMenu: false
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(e) {
    e.preventDefault();
    this.setState({ ...this.state, showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
      document.querySelector("main").addEventListener("scroll", this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ ...this.state, showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
      document
        .querySelector("main")
        .removeEventListener("scroll", this.closeMenu);
    });
  }

  onTrigger(e) {
    e.preventDefault();

    this.state.showMenu ? this.closeMenu() : this.showMenu(e);

    this.setPosition();
  }

  setPosition() {
    const { left, top } = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const { width } = this.state;
    const windowWidth = window.innerWidth;

    this.setState({
      top: top,
      left: left
    });
  }

  render() {
    const { trigger, children } = this.props;
    const { top, left, showMenu } = this.state;

    return (
      <Fragment>
        <div onClick={e => this.onTrigger(e, children)}>{trigger}</div>
        {showMenu
          ? ReactDOM.createPortal(
              <div
                ref={this.myInput}
                style={{
                  position: "absolute",
                  left: `${left}px`,
                  top: `${top}px`
                }}
              >
                {children}
              </div>,
              document.body
            )
          : null}
      </Fragment>
    );
  }
}
