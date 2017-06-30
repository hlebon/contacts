import React, {Component} from 'react';
import ListContacts from './ListContacts';

//const App = (props) => Component
class App extends Component{
  state = {
    contacts: [
    {
      "id": "ryan",
      "name": "Ryan Florence",
      "email": "ryan@reacttraining.com",
      "avatarURL": "http://localhost:5001/ryan.jpg"
    },
    {
      "id": "michael",
      "name": "Michael Jackson",
      "email": "michael@reacttraining.com",
      "avatarURL": "http://localhost:5001/michael.jpg"
    },
    {
      "id": "tyler",
      "name": "Tyler McGinnis",
      "email": "tyler@reacttraining.com",
      "avatarURL": "http://localhost:5001/tyler.jpg"
    }
    ]
  }

  removeContact = (contact) => {
    //if your change is base on your current state use this pattern
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    //if not use this
    //this.setState({})
  }

  render(){
    return (
      <div>
          <ListContacts onDelete={this.removeContact} contacts={this.state.contacts}/>
     </div>
    )
  }
}

export default App;
