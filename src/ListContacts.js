import React, {Component} from "react";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";


//const ListContacts = (props) => Component(
class ListContacts extends Component{
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ""
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })  //actualiza query del state con el valor del input search
    }

    render(){

        //filter list
        let showingContacts
        if(this.state.query){
            const match = new RegExp(escapeRegExp(this.state.query), 'i'); //"i" - ignore case
            showingContacts = this.props.contacts.filter((contact) => match.test(contact.name))
        }else{
            showingContacts = this.props.contacts
        }
        //end filter list

        showingContacts.sort(sortBy('name'));

        return (
            <div className="list-contacts">
                {JSON.stringify(this.state)}
                <div className="list-contacts-top">
                    <input type="text" className="search-contacts" placeholder="Buscar contacto"
                    value={this.props.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
                <ol className="contact-list">
                    {showingContacts.map(contact => (
                        <li key={contact.id} className="contact-list-item">
                            <div className="contact-avatar" style={{backgroundImage: `url(${contact.avatarURL})`}}>
                            </div>
                            <div className="contact-list-details">
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => this.props.onDeleteContact(contact)} className="contact-remove">Remove</button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }    
}


//property to staless functional component
ListContacts.PropTypes = {
    contacts: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
}


export default ListContacts;