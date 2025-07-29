// Questo componente si occuperà di creare un form in react-bootstrap
// al fine di permettere ad un utente di prenotare un tavolo per tot persone,
// alla tot ora di tale giorno.
// Il contenuto del form verrà poi salvato in modo persistente tramite una
// chiamata API con metodo "POST".

// l'API con cui interagiamo oggi accetta oggetti creati in questo modo:
// "name" -> string
// "phone" -> string
// "numberOfPeople" -> number | string
// "smoking" -> boolean
// "dateTime" -> string
// "specialRequests" -> string | undefined

import { Component } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

const initialFormValues = {
  name: '',
  phone: '',
  numberOfPeople: '1',
  smoking: false,
  dateTime: new Date().toISOString().slice(0, -8),
  specialRequests: '',
}

class ReservationForm extends Component {
  state = {
    // in questo oggetto state React memorizzerà in ogni momento
    // i valori dei campi del form!
    // questo vuol dire che lo STATO INIZIALE del nostro componente
    // dovrà essere predisposto per salvare tutti questi valori

    // in React OGNI FORM CHE CREATE DEVE ESSERE UN "CONTROLLED FORM"
    // un "controlled form" è un form in cui siete voi a capo della sua
    // intera logia: controllate i valori del form in ogni momento e
    // ne tenete traccia all'interno dello STATE del componente

    // definisco lo STATO INIZIALE
    formValues: initialFormValues,
  }

  submitForm = (e) => {
    // la "e" sta arrivando dall'event listener "onSubmit"
    // annullo il comportamento di default del form
    e.preventDefault()
    // facciamo la chiamata POST per salvare l'evento in DB!
    fetch('https://striveschool-api.herokuapp.com/api/reservation', {
      method: 'POST',
      body: JSON.stringify(this.state.formValues),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // serve proseguire per estrarre il JSON dalla response?
          // anche no, tanto ci restituirebbe lo stesso oggetto che abbiamo
          // inviato
          alert('PRENOTAZIONE SALVATA!')
          //   svuoto il form, riportando lo stato del componente ai valori iniziali
          this.setState({
            formValues: initialFormValues, // D R Y
          })
        } else {
          throw new Error('Errore nella richiesta')
        }
      })
      .catch((err) => {
        console.log('errore', err)
        alert('PRENOTAZIONE NON SALVATA!')
      })
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={8} lg={6}>
            <h2 className="text-center">Prenota un tavolo!</h2>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8} lg={6}>
            <Form onSubmit={this.submitForm}>
              <Form.Group className="mb-3">
                <Form.Label>Il tuo nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mario Bros"
                  required
                  // come si CONTROLLA un form? un form si controlla "controllando"
                  // ogni suo input
                  // ogni INPUT deve essere collegato allo state con un cosiddetto
                  // "TWO-WAY DATA BINDING"
                  value={this.state.formValues.name}
                  onChange={
                    // l'onChange si occuperà di intervenire ad ogni lettera
                    // inserita nell'input e ad aggiornare la proprietà
                    // corrispondente nello state del componente
                    (e) => {
                      this.setState({
                        formValues: {
                          ...this.state.formValues, // riporto tutte le 6 proprietà
                          // dello stato corrente
                          name: e.target.value, // il carattere che ho
                          // appena inserito nell'input
                        },
                      })
                    }
                  }
                />
              </Form.Group>

              {/* esempio di CONDITIONAL RENDERING */}

              {this.state.formValues.name.toLocaleLowerCase() ===
                'giangiorgio' && <Alert variant="info">BEL NOME!</Alert>}

              <Form.Group className="mb-3">
                <Form.Label>Il tuo numero di telefono</Form.Label>
                <Form.Control
                  type="tel"
                  required
                  value={this.state.formValues.phone}
                  onChange={(e) => {
                    this.setState({
                      formValues: {
                        ...this.state.formValues,
                        phone: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>In quanti siete</Form.Label>
                <Form.Select
                  aria-label="number of people field"
                  value={this.state.formValues.numberOfPeople}
                  onChange={(e) => {
                    this.setState({
                      formValues: {
                        ...this.state.formValues,
                        numberOfPeople: e.target.value,
                      },
                    })
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Tavolo fumatori"
                  // la proprietà "value" nelle checkbox NON È un valore booleano
                  // (ma è una stringa che può assumere i valori "on" e "off")
                  checked={this.state.formValues.smoking}
                  onChange={(e) => {
                    this.setState({
                      formValues: {
                        ...this.state.formValues,
                        smoking: e.target.checked,
                      },
                    })
                  }}
                />
              </Form.Group>

              {this.state.formValues.smoking === true ? (
                <Alert variant="danger">Fumare fa male!</Alert>
              ) : (
                <Alert variant="success">Non fumare fa bene!</Alert>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Quando e a che ora</Form.Label>
                <Form.Control
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, -8)}
                  // creo una stringa a partire dalla data corrente
                  // e ci rimuovo gli ultimi 8 caratteri che simboleggiano
                  // i secondi e le informazioni di fuso orario, che non
                  // possono essere fornite come valore valido per "min"
                  required
                  value={this.state.formValues.dateTime}
                  onChange={(e) => {
                    this.setState({
                      formValues: {
                        ...this.state.formValues,
                        dateTime: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Allergie/Intolleranze/Bambini</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={this.state.formValues.specialRequests}
                  onChange={(e) => {
                    this.setState({
                      formValues: {
                        ...this.state.formValues,
                        specialRequests: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Button variant="success" type="submit">
                INVIA
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReservationForm
