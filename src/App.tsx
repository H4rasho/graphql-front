import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import "./App.css";

const ALL_CONTACTS = gql`
  query {
    allContacts {
      id
      username
      tel
    }
  }
`;

const CREATE_CONTACT = gql`
  mutation crearContacto($username: String!, $tel: String!) {
    addContact(username: $username, tel: $tel) {
      username
    }
  }
`;

interface Contact {
  username: String;
  tel: String;
  id: String;
}

function App() {
  const resul = useQuery(ALL_CONTACTS);
  const [createContact] = useMutation(CREATE_CONTACT, {
    refetchQueries: [{ query: ALL_CONTACTS }],
  });
  const { data, error, loading } = resul;

  const newContact = {
    username: "Nuevo Contacto",
    tel: "11052066",
  };
  const { username, tel } = newContact;

  const handleClick = () => {
    createContact({ variables: { username, tel } });
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <span>{error}</span>;
  else {
    return (
      <>
        <div className="flex">
          <h1>Mis contactos</h1>
          <button className="añadir" onClick={handleClick}>
            + Añadir
          </button>
        </div>
        <hr />
        <div className="flex">
          {data.allContacts.map((contact: Contact) => (
            <div className="card" key={contact.id.toString()}>
              <h2>{contact.username}</h2>
              <p>{contact.tel}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default App;
