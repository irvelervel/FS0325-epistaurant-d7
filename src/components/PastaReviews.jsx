import { ListGroup } from 'react-bootstrap'

// questo componente mostra sempre le recensioni della pasta attiva
// perchè quando in Home si setta lo stato con una nuova activePasta
// lui riceve nuove props!

const PastaReviews = (props) => {
  return (
    <ListGroup>
      {props.pastaAttiva.comments.map((review) => {
        return (
          <ListGroup.Item key={review.id}>
            {review.rating} - {review.comment}
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

export default PastaReviews
