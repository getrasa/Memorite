import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loading from "./review/Loading";
import Lessons from "./lessons/Lessons";
import { get_new_flashcards, remove_flashcards } from "../../actions/study";

class LessonLoader extends Component {
  constructor() {
    super();

    this.state = {
      renderRedirect: false
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    this.props.get_new_flashcards(id);
  }

  renderRedirect() {
    this.props.remove_flashcards();
    this.setState({ renderRedirect: true });
  }

  render() {
    const { id } = this.props.match.params;
    const { isLoading = true, flashcards = null } = this.props;

    if (!flashcards && !isLoading) this.renderRedirect();

    return (
      <Fragment>
        {this.state.renderRedirect ? <Redirect to={`/study/${id}`} /> : ""}

        {!flashcards || isLoading ? (
          <Loading id={id} />
        ) : (
          <Lessons
            id={id}
            flashcards={flashcards}
            executionCompleted={this.renderRedirect.bind(this)}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  flashcards: state.study.flashcards,
  isLoading: state.study.loading
});

export default connect(
  mapStateToProps,
  { get_new_flashcards, remove_flashcards }
)(LessonLoader);
