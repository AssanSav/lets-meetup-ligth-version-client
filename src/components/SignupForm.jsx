import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux"
import Joi from "joi-browser";
import Form from "../common/form";
import { signupUser } from "../store/usersReducer";

class SignupForm extends Form {
  state = {
    data: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      gender: "",
      visibility: "",
      interest_ids: []
    },
    errors: {}
  };

  componentDidMount() {
    this.props.signupUser(this.state.data)
  }

  schema = {
    username: Joi.string().required().label("Username"),
    email: Joi.string().required().email().label("Email"),
    gender: Joi.string().required().label("Gender"),
    orientation: Joi.string().required().label("Orientation"),
    city: Joi.string().label("City"),
    interest_ids: Joi.array().min(1),
    ethnicity: Joi.string().label("Ethnicity"),
    visibility: Joi.string().label("Ethnicity"),
    password: Joi.string().required().label("Password"),
    password_confirmation: Joi.string().required().label("Confirm password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await this.props.signupUser(data);
      if (this.props.user.status === 500) {
        const { emailError, usernameError, passwordError, passwordConfirmationError, genderError, interestError, orientationError } = this.props.user
        const errors = { ...this.state.errors };
        
        errors.email = emailError[0]
        errors.password = passwordError[0]
        errors.gender = genderError[0]
        errors.interest_ids = interestError[0]
        errors.orientation = orientationError[0]
        errors.password_confirmation = passwordConfirmationError[0]
        errors.username = usernameError[0]

        this.setState({ errors })
      } else {
        window.location = "/users"
      }

    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (this.props.status) return <Redirect to="/users" />;

    return (
      <div className="form">
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("username", "Username")}
          {this.renderSelect("ethnicity", "Ethnicity", ["Hispanic or Latino", "Black/African descent", "White", "Asian/Pacific Islander"])}
          {this.renderSelect("gender", "Gender", ["Male", "Female", "Transgender"])}
          {this.renderSelect("orientation", "Orientation", ["Straight", "Lesbian", "Gay"])}
          {this.renderCheckbox("interest_ids", "Interests", this.props.interests)}
          {this.renderSelect("visibility", "Visibility", ["true", "false"])}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("password_confirmation", "Confirm", "password")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    user: users.user,
    status: users.status,
    interests: users.interests
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (formData) => dispatch(signupUser(formData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
