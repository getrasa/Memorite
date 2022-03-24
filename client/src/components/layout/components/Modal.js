import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Portal } from "react-portal";

export class Modal extends Component {
  constructor() {
    super();
  }

  render() {
    const { children, onClose, open } = this.props;

    return (
      <Fragment>
        {open
          ? ReactDOM.createPortal(
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  right: "0",
                  top: "0",
                  bottom: "0"
                }}
              >
                {React.cloneElement(children, { onClose })}
              </div>,
              document.body
            )
          : null}
      </Fragment>
    );
  }
}
