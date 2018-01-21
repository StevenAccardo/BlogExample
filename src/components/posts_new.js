import React, { Component } from 'react';
//reduxForm allows this component to communicate with the formReducer on the src/reducers/index.js file. It is very similar to the connect helper from react-redux. Allows our component to talk directly to the redux store.
//the field compontent is the redux-form way of signifying and input in the form. It is a React component.
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  //We have to pass in this field argument, which is an object to the helper function that is called by the Field component's component property. The field object has a bunch of event handlers and etc that allows the Field component to handle situations such as onChange, onBlur, onFocus without us worrying about them. passing this field object pretty much lets the Field component know that it needs to watch and handle the input element withint the Field.
  renderField(field) {
    return (
      <div className="form-group">
        {/*Using this spread operator here allows us to pull all of the different keys and values on the object and be passed as props too to the input tag. Instead of having to type onChange={field.input.onChange} and etc. */}
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        {/*The field object has access to meta.error, which holds the error messages from the validate function below.*/}
        {field.meta.error}
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
  }


  render() {
    //this handleSubmit property comes from the reduxForm library that was connected to this component at the bottom of the page, at the export method.
    const { handleSubmit } = this.props; //es6 === handleSubmit = this.props.handleSubmit;

    return (
      //handleSubmit takes a function that we create, and it handles the reduxForm side of things, as far as getting the information ready to submit. It doesn't handle the actual submission to the server. So if everything is good on the redux-form side of things and the values are valid on the form, it will call the function that we pass in to it.
      //We use the bind method to ensure that this call back has access to the PostsNew component this variable when it is finally called.
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          //Arbitrary properties passsed through the Field component, like this label property below, will be passed to the helper function that is referenced in the field's component property and will show up on the field object that is passed into the helper function as an argument. So the label can be accessed by using field.label in the helper function. field.label: "Title".
          label="Title"
          //The name property signifies what piece of state the Field component is going to produce.
          name="title"
          //The component prop takes a function. The field component doesn't know how to render itself, so the component property has a function that handles the rendering instead. We don't use the () after the helper function in the component property because field determines when to call/execute that function. So that is can rerender itself multiple times.
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

//validate will get called during different times of the forms lifecycle, most notably whenever the user tries to submit the form.
//values is an object that contians the values of the input fields.
function validate(values) {
  //console.log(values) -> { title: "abcPost", categories: "dogs", contenet: "dogs like bones." }

  //You will always have an errors object
  const errors = {};

  //Validate the inputs from 'values'
  //the keys chosen here must be identical to the name property of the Field componenet being referenced.
  if (!values.title) {
    errors.title = "Enter a title!";
  }

  if (!values.categories) {
    errors.categories = "Enter some categories!";
  }

  if (!values.content) {
    errors.content = "Enter some content!";
  }

  //If this function returns an empty object, then redux-form assumes there is nothing wrong with the vlaues for the form.
  //If errors object has any properties, redux-form asssumes form is invalid.
  return errors;

}

//reduxForm only takes one argument, a function.
export default reduxForm({
  //This is similar to the name of the form, so that you can have multiple forms at once on the same page, and not get them mixed up. The string can be anything, but it MUST be unique. If two forms have the same name, or string. Their form info will get combined and will overlap with each other.
  form: 'PostsNewForm',
  validate //es6 === validate: validate
})(PostsNew);
