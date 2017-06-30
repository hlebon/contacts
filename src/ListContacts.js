import React, { Component } from "react";


//const ListContacts = (props) => Component(
function ListContacts(props) {
        return (
            <ol className="contact-list">
                {props.contacts.map(contact => (
                    <li key={contact.id} className="contact-list-item">
                        <div className="contact-avatar" style={{backgroundImage: `url(${contact.avatarURL})`}}>
                        </div>
                        <div className="contact-list-details">
                            <p>{contact.name}</p>
                            <p>{contact.email}</p>
                        </div>
                        <button onClick={() => props.onDelete(contact)} className="contact-remove">Remove</button>
                    </li>
                ))}
            </ol>
        )
}

export default ListContacts;