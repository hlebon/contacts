import React, {Component} from 'react';
import { Route } from 'react-router-dom'
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

  createContact(contact){
    ContactsAPI.create(contact).then(contact=>{
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }))
    })
  }

  render(){
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListContacts 
            onDeleteContact={this.removeContact} 
            contacts={this.state.contacts}
          />
        )}/>  
        <Route path="/create" render={({history})=>(
          <CreateContact onCreateContact={(contact)=>{
              this.createContact(contact);
              history.push("/")
            }} />
        )} /> 
     </div>
    )
  }
}

export default App;
