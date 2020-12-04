import { Row, Col } from 'react-bootstrap';

function bookOverview(props) {

    const getAuthors = (list) => {
        return list.join(', ');
    }
    return (
        
            <Row>
                {/* <Col xs={6} md={4}>
                    <Image src={props.book.thumbnail} rounded />
                </Col> */}
                <Col >
                    <h4> {props.book.title} </h4>
                    <h5 className="text-muted "><small>{getAuthors}</small></h5>
                </Col>
             </Row>
    
    )
}

export default bookOverview;