import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import { connect } from "react-redux";
import Form from "../common/form";
import { signinUser } from "../store/usersReducer";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };



  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await this.props.signinUser({ email: data.email, password: data.password });
      if (this.props.user.status === 500) {
        const { emailError, passwordError } = this.props.user
        const errors = { ...this.state.errors };
        errors.email = emailError
        errors.password = passwordError

        this.setState({ errors })
      } else {
        this.props.history.push("/users")
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
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}


const mapStateToProps = ({ users }) => {
  return {
    user: users.user,
    status: users.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signinUser: (formData) => dispatch(signinUser(formData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);


/*/* <div className="form">
  <div className="errors">
    {
      email
        ? email && <>{email}</>
        : password && <>{password}</>
    }
  </div>
  <h1>Login</h1>
  <form onSubmit={this.handleSubmit}>
    <div className="signin_email">
      <div className="email">
        {this.renderInput("email", "Email")}
      </div>
      <div className="email_icon">
        <i className="far fa-envelope"></i>
      </div>
    </div>
    <div className="signin_password">
      <div className="password">
        {this.renderInput("password", "Password", "password")}
      </div>
      <div className="password_icon">
        <i className="fas fa-eye-slash" ></i>
      </div>
    </div>
    <div className="signin_button">
      {this.renderButton("Signin")}
    </div>
  </form>
</div> */