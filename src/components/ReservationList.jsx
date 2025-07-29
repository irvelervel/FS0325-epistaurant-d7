// il componente ReservationList si occuperà di creare una lista
// di prenotazioni sulla base del contenuto attuale del DB
// all'avvio quindi dovrà fare una chiamata GET all'endpoint
// 'https://striveschool-api.herokuapp.com/api/reservation'
// e mostrare all'utente tutte le prenotazioni esistenti.

// -- FLOW DELLE OPERAZIONI IN QUESTO COMPONENTE --
// 1) lo stato iniziale del componente viene messo in memoria
// 2) viene invocato per la prima volta il metodo render(): si occuperà
// di "disegnare" l'interfaccia per la prima volta, con il titolo, le row,
// le col e la ListGroup vuota
// 3) viene invocato il metodo componentDidMount, un metodo creato apposta per
// eseguire operazioni lunghe/asincrone SENZA bloccare il caricamento iniziale,
// perchè è istruito a lanciarsi automaticamente solo DOPO il PRIMO render()
// 4) viene quindi lanciata getReservations() dentro componentDidMount(): viene
// eseguita la fetch, vengono recuperate le prenotazioni, e vengono salvate
// nello STATO del componente
// 5) poichè c'è stato un setState nella getReservations(), il metodo render()
// del nostro componente viene AUTOMATICAMENTE ri-eseguito
// 6) questa seconda invocazione di render() verifica quali cambiamenti apportare
// alla pagina: React NON rimetterà nel DOM i nodi identici a prima (perchè
// è efficientissimo) ma... arrivati alla ListGroup si accorgerà che l'array
// this.state.reservations è DIVERSO da prima (ci sono ora degli elementi!):
// disegnerà questi elementi nella lista, e finirà il secondo render().

import { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Alert,
  Button,
} from 'react-bootstrap'

import { TrashFill } from 'react-bootstrap-icons'

// ogni componente React potrà decidere in autonomia di effettuare operazioni
// al suo AVVIO

const ReservationList = (props) => {
  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // state = {
  //   reservations: [],
  //   // se io trovassi il modo di recuperare le prenotazioni e inserirle in questo array...
  //   // ... React riempirebbe la ListGroup automaticamente!
  //   // creo ora una variabile per memorizzare la condizione di caricamento
  //   isLoading: true,
  //   isError: false,
  // }

  // al cambiare del valore della prop "trigger" noi dobbiamo RI-FETCHARE
  // le prenotazioni (perchè significa che il ReservationForm ha inviato con
  // successo una nuova prenotazione e noi vogliamo che venga recuperata
  // in real-time)

  // rimpiazzo per componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log('RECUPERO PRENOTAZIONI')
    getReservations()
  }, [props.trigger])

  // creo la funzione per la chiamata GET
  const getReservations = () => {
    // questa è una semplice funzione che si occuperà di recuperare le prenotazioni
    // a DB e salvarle nello stato del componente
    fetch('https://striveschool-api.herokuapp.com/api/reservation')
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('errore nel recupero prenotazioni')
        }
      })
      .then((arrayOfReservations) => {
        console.log('RECUPERO I DATI DELLE PRENOTAZIONI')
        console.log(arrayOfReservations)
        console.log('E ORA SETTO LO STATO')
        // this.setState({
        //   reservations: arrayOfReservations, // sostituisco nello state l'array
        //   // di prenotazioni recuperato dalle API
        //   isLoading: false, // spengo lo Spinner nel caso l'operazione
        //   // asincrona sia finita "bene"
        // })

        setReservations(arrayOfReservations)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log('ERRORE', err)
        // this.setState({
        //   isLoading: false, // spengo lo Spinner anche nel caso l'operazione
        //   // asincrona sia finita "male"
        //   isError: true,
        // })
        setIsLoading(false)
        setIsError(true)
      })
  }

  const deleteReservation = (idDaEliminare) => {
    // questa funzione si occuperà di eliminare una singola prenotazione
    // con una chiamata con metodo "DELETE" alle API
    fetch(
      'https://striveschool-api.herokuapp.com/api/reservation/' + idDaEliminare,
      {
        method: 'DELETE',
      }
    )
      .then((response) => {
        if (response.ok) {
          // eliminazione avvenuta con successo
          getReservations()
        } else {
          throw new Error('Errore in fase di eliminazione')
        }
      })
      .catch((err) => {
        console.log('ERRORE ELIMINAZIONE', err)
      })
  }

  // nuovo superpotere dei componenti a classe: il metodo componentDidMount()

  // componentDidMount() {
  //   console.log('IO SONO COMPONENTDIDMOUNT')
  //   // componentDidMount è un metodo che potete inserire se volete in OGNI
  //   // componente a classe e si comporta così:
  //   // a) viene eseguito UNA SOLA VOLTA per l'intero ciclo-vita (lifecycle) del componente
  //   // b) viene eseguito DOPO il primo render()
  //   this.getReservations()
  //   // componentDidMount è il posto PERFETTO per tutte quelle operazioni lunghe,
  //   // scomode e/o asincrone che condizionano il primo montaggio del componente

  //   // quindi la nostra fetch viene eseguita UNA VOLTA SOLA, subito dopo il disegno
  //   // delle parti statiche del componente, senza bloccarne il caricamento!
  // }

  console.log('INVOCATO RENDER')
  // this.getReservations()
  // non posso invocare questa funzione nel metodo render! come mai?
  // -----
  // perchè OGNI VOLTA che effettuiamo un setState, il metodo render()
  // viene re-invocato automaticamente!
  // -----
  // detta in altro modo:
  // -> un componente React re-invoca il metodo render() ogni volta
  // che cambia il suo stato o riceve NUOVE props.

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center">Prenotazioni a DB</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={8} lg={6}>
          {/* spinner per indicare il caricamento in corso */}
          {isLoading && (
            <div className="text-center mb-3">
              <Spinner animation="border" variant="success" />
            </div>
          )}
          {isError && (
            <Alert variant="danger" className="text-center">
              Errore nel recupero prenotazioni 😥
            </Alert>
          )}
          {reservations.length === 0 && !isLoading && !isError && (
            <Alert variant="info" className="text-center">
              Al momento non ci sono prenotazioni
            </Alert>
          )}
          <ListGroup>
            {reservations.map((prenotazione) => {
              return (
                <ListGroup.Item
                  key={prenotazione._id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    {prenotazione.name} per {prenotazione.numberOfPeople} -{' '}
                    {new Date(prenotazione.dateTime).toLocaleDateString(
                      'it-IT',
                      {
                        hour: 'numeric',
                        minute: 'numeric',
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </div>
                  <div>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteReservation(prenotazione._id)
                      }}
                    >
                      <TrashFill />
                    </Button>
                  </div>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default ReservationList
