import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class CreateBook extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      isbn:'',
      author:'',
      description:'',
      published_date:'',
      publisher:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      Name: this.state.Name,
      Email: this.state.Email,
      Age: this.state.Age,
      BornIn: this.state.BornIn,
      LivesIn: this.state.LivesIn,
      MartialStatus: this.state.MartialStatus,
      PhoneNumber: this.state.PhoneNumber,
      Job: this.state.Job
    };

    axios
      .post('http://localhost:8000/add-user', data)
      .then(res => {
        this.setState({
            Name: '',
            Email: '',
            Age: '',
            BornIn: '',
            LivesIn: '',
            MartialStatus: '',
            PhoneNumber: '',
            Job: ''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in Add User!");
      })
  };

  render() {
    return (
      <div className="Add User">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add User</h1>
              <p className="lead text-center">
                  Add New User
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Name'
                    name='Name'
                    className='form-control'
                    value={this.state.Name}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Email'
                    name='Email'
                    className='form-control'
                    value={this.state.Email}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='number'
                    placeholder='Age'
                    name='Age'
                    className='form-control'
                    value={this.state.Age}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='date'
                    placeholder='Born In'
                    name='BornIn'
                    className='form-control'
                    value={this.state.BornIn}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Lives In'
                    name='LivesIn'
                    className='form-control'
                    value={this.state.LivesIn}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Martial Status'
                    name='MartialStatus'
                    className='form-control'
                    value={this.state.MartialStatus}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Phone Number'
                    name='PhoneNumber'
                    className='form-control'
                    value={this.state.PhoneNumber}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Job'
                    name='Job'
                    className='form-control'
                    value={this.state.Job}
                    onChange={this.onChange}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBook;