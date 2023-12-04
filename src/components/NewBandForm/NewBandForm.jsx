import React, { Component } from 'react';
import { checkToken } from '../../utilities/users-service';
import { addBand } from '../../utilities/bands-api'; // Update the path

class BandForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bandName: '',
      genre: '',
      message: '',
    };

    // Bind the methods to the instance
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // Update the state based on the user's input
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    // Destructure the state
    const { bandName, genre } = this.state;

    try {
      console.log('Band Name:', bandName);
      console.log('Genre:', genre);

      // Get the auth token (you might want to handle this more globally)
      const authToken = await checkToken();

      // Make the API request using the addBand function
      const newBand = await addBand({ band: bandName, genre: genre }, authToken);

      // Handle the response as needed
      console.log('Response:', newBand);

      // Clear form fields on successful submission
      this.setState({ bandName: '', genre: '' });
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error, e.g., display an error message to the user
      this.setState({ message: 'Some error occurred' });
    }
  }

  render() {
    const { bandName, genre } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Band Name:
          <input type="text" name="bandName" value={bandName} onChange={this.handleChange} />
        </label>
        <label>
          Genre:
          <input type="text" name="genre" value={genre} onChange={this.handleChange} />
        </label>
        <button type="submit">Add Band</button>
      </form>
    );
  }
}

export default BandForm;
