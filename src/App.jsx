import React, { useState, useEffect } from 'react';
import './App.css';
import Form from 'components/ContactAdd'
import Contacts from 'components/Contacts';
import Filter from 'components/Filter';
import { nanoid } from 'nanoid';
import Tittle from 'components/Tittle';
import Notiflix from 'notiflix';


const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts([...savedContacts]);
    }
  }, []);
  useEffect(() => {
    if (contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const onDelete = id => {
    const personToFind = id;
    const newContacts = contacts.filter(({ id }) => id !== personToFind);
    setContacts([...newContacts]);
    Notiflix.Report.warning(`Selected user was deleted`);
  };

  const submitCatcher = ({ name, number }) => {
    const nameToAdd = name;
    const addCheck = contacts.find(({ name }) => name.includes(nameToAdd));
    if (!addCheck) {
      const person = {
        name: `${name}`,
        id: `${nanoid()}`,
        number: `${number}`,
      };
      setContacts(prevContacts => [...prevContacts, person]);
    } else {
      Notiflix.Report.failure(`${nameToAdd} is already in contacts`);
    }
  };

  function filteredNames() {
    const filtered = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return filtered;
  }

    return (
      <div className="App">
        <Tittle text="Nombre"/>
        <Form onSubmit={submitCatcher} />

        <Tittle text="Contacts"/>
        <Filter onFilter={setFilter} />
        <Contacts contacts={filteredNames()} onDelete={onDelete} />
      </div>

    )
}

export default App;