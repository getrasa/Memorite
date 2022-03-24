import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import MenuPopUp from "../components/MenuPopUp";
import { Menu } from "../components/Menu";
import { Modal } from "../components/Modal";
import EditDeckPopUp from "../main/EditDeckPopUp";
import { delete_deck } from "../../../actions/decks";

const DeckItem = props => {
  const { title, language, native, reviews, lessons, total, id } = props;

  const [state, setState] = useState({
    showMenu: false,
    showModal: false
  });

  const onEdit = e => {
    e.preventDefault();
    console.log("Show modal: true");
    setState({ showModal: true });
  };

  const onDelete = (e, id) => {
    e.preventDefault();
    props.delete_deck({ _id: id });
  };

  const onCloseEdit = () => {
    setState({ showModal: false });
  };

  return (
    <Fragment>
      {state.showModal ? (
        <Modal open={state.showModal} onClose={onCloseEdit}>
          <EditDeckPopUp deckInfo={{ id, title, language, native }} />
        </Modal>
      ) : null}

      <Link to={`/study/${id}`}>
        <div className="card flex-vertically">
          <div className="total-word-container">
            <div className="total-word-counter">
              <div className="flex-center">
                <p className="total-count">{total}</p>
                <label className="label">Total</label>
              </div>
            </div>
          </div>

          <div className="title-language-container">
            <h4 className="language">{language}</h4>
            <p className="title">{title}</p>
          </div>

          <div className="stack-stats-container">
            <div className="stats-container">
              <div className="stats">
                <p className="count">{reviews}</p>
                <label className="label">Reviews</label>
              </div>
            </div>
            <hr className="dividing-line" />
            <div className="stats-container">
              <div className="stats">
                <p className="count">{lessons}</p>
                <label className="label">Lessons</label>
              </div>
            </div>
          </div>

          <div className="dotted-menu">
            <span>
              <Menu
                trigger={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 6">
                    <path
                      fill="currentColor"
                      id="ellipsis-v-light"
                      d="M3,114.658a2.846,2.846,0,1,1,0,5.684,2.846,2.846,0,1,1,0-5.684Zm-3-7.816a2.921,2.921,0,0,0,3,2.842A2.846,2.846,0,1,0,3,104,2.921,2.921,0,0,0,0,106.842Zm0,21.316A2.921,2.921,0,0,0,3,131a2.846,2.846,0,1,0,0-5.684A2.921,2.921,0,0,0,0,128.158Z"
                      transform="translate(131) rotate(90)"
                    />
                  </svg>
                }
              >
                <div className="menu">
                  <button onClick={e => onEdit(e)} className="menu-item">
                    Edit
                  </button>
                  <button
                    onClick={e => onDelete(e, id)}
                    className="menu-item delete"
                  >
                    Delete
                  </button>
                </div>
              </Menu>
            </span>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

DeckItem.propTypes = {
  title: PropTypes.string,
  language: PropTypes.string,
  id: PropTypes.string
};

export default connect(
  null,
  { delete_deck }
)(DeckItem);
