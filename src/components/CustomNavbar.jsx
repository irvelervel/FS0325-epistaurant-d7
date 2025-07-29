// un componente React può essere una funzione o una classe
// il cui scopo è ritornare una porzione di JSX

// devo importare dalla libreria react-bootstrap i componenti che sono andato
// ad utilizzare per creare la mia navbar
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// import { Container, Nav, Navbar } from 'react-bootstrap'

const CustomNavbar = (props) => {
  console.log('OGGETTOPROPS', props)
  return (
    <Navbar bg={props.tema} data-bs-theme={props.tema} expand="lg">
      <Container fluid={true}>
        <Navbar.Brand href="#home">Epistaurant</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Prenota</Nav.Link>
            <Nav.Link href="#link">Menu</Nav.Link>
            <Nav.Link href="#link">Lavora con noi</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
