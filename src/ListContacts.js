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

    clearQuery = () => {
        this.setState({query: ""})
    }

    render(){
        const { contacts, onDeleteContact } = this.props;
        const { query } = this.state;


        //filter list
        let showingContacts
        if(query){
            const match = new RegExp(escapeRegExp(this.state.query), 'i'); //"i" - ignore case
            showingContacts = contacts.filter((contact) => match.test(contact.name))
        }else{
            showingContacts = contacts
        }
        //end filter list

        showingContacts.sort(sortBy('name'));

        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input type="text" className="search-contacts" placeholder="Buscar contacto"
                    value={this.props.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>

                {showingContacts.length !== contacts.length && ( //if statement declaration if true hola mundo
                    <div className="showing-contacts">
                        <span>Mostando {showingContacts.length} de {contacts.length} total</span>
                        <button onClick={this.clearQuery}>Mostrar todos</button>
                    </div>
                )}

                <ol className="contact-list">
                    {showingContacts.map(contact => (
                        <li key={contact.id} className="contact-list-item">
                            <div className="contact-avatar" style={{backgroundImage: `url(${contact.avatarURL})`}}>
                            </div>
                            <div className="contact-list-details">
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(contact)} className="contact-remove">Remove</button>
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
    onDeleteContacts: PropTypes.func.isRequired
}


export default ListContacts;