import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Contacts.css';

const Contacts = ({ contacts, onDelete }) => {
  return (
    <ul className="list">
      {contacts.map(({ name, id, number }) => {
        return (
          <li className="item"key={id}>
            <p className="text">
              {name}: {number}
            </p>
            <button
              type="button"
              className="button"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
export default Contacts;
Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
};