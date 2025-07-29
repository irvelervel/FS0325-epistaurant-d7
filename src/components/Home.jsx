// Home è un componente che racchiuderà la parte centrale della landing page
// in particolare un carosello di BS e una sezione recensioni

import { Container, Row, Col, Carousel } from 'react-bootstrap'
import pastasciutte from '../data/menu.json'
import { useState } from 'react'
import PastaReviews from './PastaReviews'

const Home = () => {
  // render è l'unico metodo OBBLIGATORIO nei componenti a classe
  // ora che abbiamo un componente a classe possiamo integrare al suo interno
  // uno STATO. Uno stato è una "memoria" per un componente React, si tratta
  // di un OGGETTO contenente infinite proprietà che verranno mantenute durante
  // il ciclo vita del componente

  const [activePasta, setActivePasta] = useState(pastasciutte[0])

  // state = {
  //   // questo è lo stato del componente!
  //   activePasta: pastasciutte[0], // l'oggetto della carbonara
  // }

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} className="text-center">
          <h1>Benvenuto nel nostro ristorante!</h1>
          <h3>Siamo famosi per le pastasciutte!</h3>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          <Carousel
            onSlide={(i) => {
              // console.log('SLIDE CAMBIATA!', i)
              // quando cambia la slide dobbiamo MODIFICARE il valore di
              // activePasta nello STATE in modo da tenerlo sempre aggiornato
              // man mano che le slide si susseguono
              // come si aggiorna un valore nell'oggetto state?
              // l'oggetto STATE in un componente React è READ-ONLY
              // this.setState({
              //   activePasta: pastasciutte[i],
              // })

              setActivePasta(pastasciutte[i])

              // questo oggetto che inserisco dentro this.setState andrà
              // a FONDERSI (merge) dentro lo stato attuale!
            }}
          >
            {pastasciutte.map((pasta) => {
              return (
                // la i (secondo parametro
                // della funzione dentro map)
                // va utilizzata come "key" SOLO come ULTIMA SPIAGGIA
                <Carousel.Item key={pasta.id}>
                  <img
                    className="w-100"
                    src={pasta.image}
                    alt={'immagine di' + pasta.name}
                  />
                  <Carousel.Caption>
                    <h3>{pasta.name}</h3>
                    <p>{pasta.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              )
            })}
          </Carousel>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8} lg={6}>
          <PastaReviews pastaAttiva={activePasta} />
          {/* PastaReviews HA BISOGNO di una pasta di cui mostrare le recensioni */}
        </Col>
      </Row>
    </Container>
  )
}

export default Home

// Il carosello cambia slide
// --> setState sul componente Home
// --> render() in Home viene re-invocato
// --> PastaReviews riceve una nuova prop (perchè è cambiato lo stato)
// --> PastaReviews si aggiorna

// regola da appendere in cameretta:
// "un componente ri-disegna il proprio JSX (render) ogni volta che gli cambia
// lo stato o ogni volta che riceve una nuova prop"
