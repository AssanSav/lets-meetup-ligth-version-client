import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import Textarea from './textarea';
import Checkbox from './checkbox';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  buttonRef = React.createRef()

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.buttonRef.current.innerHTML === "Edit") {
      this.doSubmit();
    } else {
      const errors = this.validate();
      this.setState({ errors: errors || {} });
      if (errors) return;

      this.doSubmit();
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleChecked = (e) => {
    let data = this.state.data
    let interestsChecked = data[e.target.name]
    let interestValue = e.target.value;
    if (e.target.checked === true && interestsChecked) {
      interestsChecked.push(interestValue);
      this.setState({
        interest_ids: interestsChecked,
      });
    } else if (interestsChecked) {
      let interestIndex = interestsChecked.indexOf(interestValue);
      interestsChecked.splice(interestIndex, 1);

      this.setState({
        interest_ids: interestsChecked,
      });
    }
  }

  renderButton(label) {
    return (
      <button ref={this.buttonRef} disabled={this.validate()} id="" className="button">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderCheckbox(name, label, options, type) {
    const { data, errors } = this.state;
    return (
      <Checkbox
        options={options}
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChecked}
        error={errors[name]}
      />
    )
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderTextarea(name, label) {
    const { data, errors } = this.state;
    return (
      <Textarea
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
