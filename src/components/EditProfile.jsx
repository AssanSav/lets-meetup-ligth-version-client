import React from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import Form from "../common/form";
import { editProfile } from "../store/usersReducer";

class EditProfile extends Form {
  state = {
    data: { ...this.props.user, interest_ids: [] },
    errors: {}
  }

  buttonRef = React.createRef()

  schema = {
    username: Joi.string().required().label("Username"),
    gender: Joi.string().required().label("Gender"),
    orientation: Joi.string().required().label("Orientation"),
    email: Joi.string().required().email().label("Email"),
    visibility: Joi.string().label("Visibility"),
    city: Joi.string().label("City"),
    age: Joi.number().min(15).max(100).label("Age"),
    ethnicity: Joi.string().label("Ethnicity"),
    interest_ids: Joi.array().min(1),
    height: Joi.string().label("Height"),
    body_shape: Joi.string().label("Body Shape"),
    children: Joi.string().label("Children"),
    relationship: Joi.string().label("Relationship"),
    education: Joi.string().label("Education"),
    bio: Joi.string().label("Bio"),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id)
      this.setState({
        data: nextProps.user,
      });
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await this.props.editProfile(data);

      this.props.history.push(`/my-profile/${this.props.match.params.id}`)

    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="form">
        <h1>Edit Profile</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email")}
          {this.renderSelect("gender", "Gender", ["Male", "Female", "Transgender"])}
          {this.renderSelect("orientation", "Orientation", ["Straight", "Lesbian", "Gay"])}
          {this.renderSelect("relationship", "Relationship", ["Single", "Married", "In a relationship", "Engaged", "Widowed", "Separated", "Divorced"])}
          {this.renderInput("children", "Kids")}
          {this.renderInput("age", "Age")}
          {this.renderInput("height", "Height")}
          {this.renderSelect("ethnicity", "Ethnicity", ["Hispanic or Latino", "Black/African descent", "White", "Asian/Pacific Islander"])}
          {this.renderSelect("education", "Education", ["Doctorate", "Masters", "Bachelors", "Some college", "Hight school", "Did not complete hight school"])}
          {this.renderSelect("body_shape", "Body shape", ["Athletic", "Curvy", "Skinny"])}
          {this.renderInput("city", "City")}
          {this.renderCheckbox("interest_ids", "Interests", this.props.interests)}
          {this.renderTextarea("bio", "Bio")}
          Visibility
          {this.renderSelect("visibility", "Want to go public?", ["true", "false"])}
          <button className="btn btn-primary" ref={this.buttonRef}>Edit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    interests: users.interests,
    user: users.user,
  };
};

export default connect(mapStateToProps, { editProfile })(EditProfile);



