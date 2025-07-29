import './App.css'
// bootstrap è installata come dipendenza, ma al momento
// il suo foglio di stile minifizzato non è ancora importato da nessuna parte!
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomNavbar from './components/CustomNavbar'
import Home from './components/Home'
import ReservationForm from './components/ReservationForm'
import ReservationList from './components/ReservationList'
import { useState } from 'react'

function App() {
  // App ha bisogno di una variabile di stato per poter informare ReservationList
  // che ReservationForm ha inviato una nuova prenotazione

  const [trigger, setTrigger] = useState(false)

  const toggleTrigger = () => {
    // questa funzione INVERTE il valore di trigger
    setTrigger(!trigger)
  }

  return (
    <>
      {/* <CustomNavbar tema="light" /> */}
      <CustomNavbar tema="dark" />
      {/* poiché non sappiamo ancora come gestire il routing in una SPA
      di React, la sezione "prenotazioni esistenti" verrà momentaneamente inserita
      qui, sopra il form di prenotazione :( */}

      <ReservationList trigger={trigger} />

      {/* poiché non sappiamo ancora come gestire il routing in una SPA
      di React, la sezione "prenota un tavolo" verrà momentaneamente inserita
      qui, sopra il carosello :( */}
      <ReservationForm toggleTrigger={toggleTrigger} />
      <Home />
    </>
  )
}

export default App
