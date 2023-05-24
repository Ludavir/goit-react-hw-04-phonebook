import React, { Component } from 'react';
import './App.css';
import Form from 'components/ContactAdd'
import Contacts from 'components/Contacts';
import Filter from 'components/Filter';
import { nanoid } from 'nanoid';
import Tittle from 'components/Tittle';
import Notiflix from 'notiflix';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  onDelete = id => {
    const contacts = [...this.state.contacts];
    const personToFind = id;
    const newContacts = contacts.filter(({ id }) => id !== personToFind);
    this.setState({
      contacts: newContacts,
    });
  };
  submitCathcer = ({ name, number }) => {
    const contacts = [...this.state.contacts];
    const nameToAdd = name;
    const person = {
      name: `${name}`,
      id: `${nanoid()}`,
      number: `${number}`,
    };
    const addCheck = contacts.find(({ name }) => name.includes(nameToAdd));
    if (!addCheck) {
      contacts.push(person);
      this.setState({
        contacts: contacts,
      });
    } else {
      Notiflix.Report.failure(`${nameToAdd} is already in contacts`);
    }
  };
  filteredNames() {
    const contacts = [...this.state.contacts];
    const filter = this.state.filter;
    const filtered = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return filtered;
  }
  onFilter = e => {
    const nameIs = e.target.value;
    this.setState({ filter: nameIs });
  };
  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: [...savedContacts] });
    }
  }
  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  render() {
    return (
      <div className="App">
        <Tittle text="Nombre"/>
        <Form onSubmit={this.submitCathcer} />

        <Tittle text="Contacts"/>
        <Filter onFilter={this.onFilter} />
        <Contacts contacts={this.filteredNames()} onDelete={this.onDelete} />
      </div>
    );
  }
}

export default App;