import React, {Component} from "react";
import PropTypes from "prop-types";


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
                    {this.props.contacts.map(contact => (
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