import React, {Component} from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact'
import * as ContactsAPI from "./utils/ContactsAPI";

//const App = (props) => Component
class App extends Component{
  state = {
    screen: 'list',
    contacts: []
  }
  
  componentDidMount(){
    ContactsAPI.getAll().then((contacts) => {
      this.setState( {contacts} ); //like: {contacts: contacts}
    })
  }

  removeContact = (contact) => {
    //if your change is base on your current state use this pattern
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact); //remove from database

    //if not use this
    //this.setState({})
  }

  render(){
    return (
      <div>
        {this.state.screen == 'list' && (
          <ListContacts 
          onDeleteContact={this.removeContact} 
          contacts={this.state.contacts}
          onNavigate={()=>{
            this.setState({screen: 'create'})
          }}/>
        )}
        {this.state.screen === 'create' && (
            <CreateContact/>
        )}
     </div>
    )
  }
}

export default App;
