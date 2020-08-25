import React from 'react';
import '../App.css';
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import api from '../api';

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            userText: '',
            country: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.mountEmailText = this.mountEmailText.bind(this);
    }

    handleChange(event) {
        const target = event.target.name;
        this.setState({[target]: event.target.value});
    }
    
    handleSubmit(event) {
        let emailText = this.mountEmailText();
        api.post(`SendEmailLambda`, { from: 'limapotter@gmail.com',
        to: 'limapotter@gmail.com',
        text: emailText,
        subject: 'success' }).then(res => {
            console.log(res);
            console.log(res.data);
        })

        event.preventDefault();
    }

    mountEmailText(){
        let emailText = `Olá ${this.state.name}, tudo bem?\nSó pra avisar que seu pedido foi reservado!\nEnquanto espera, tire um momento para confirmar seus dados, e caso encontre algo errado, não hesite em nos chamar!\n\n
        Seus dados:\nNome completo: ${this.state.name} ${this.state.surname}\nEmail: ${this.state.email}\nPaís: ${this.state.country}\n`

        if(this.state.userText){
            emailText = emailText + `Suas observações: ${this.state.userText}\n`
        }

        emailText = emailText + `Lembre-se que estamos sempre por aqui para o caso de dúvidas.\nQuando tivermos atualizações do seu produto, você será a primeira pessoa a saber! :D`

        return emailText;
    }

    render(){
        return (
            <div className="App">
                <Container className="App-body">
                    <Row>
                        <Col xs={12} md={12}>
                            <Form onSubmit={this.handleSubmit}>
                                <h2 className="text-center">Reserve seu pedido</h2>
                                <Row>
                                    <Form.Group as={Col} controlId="formName">
                                        <Form.Label>Nome*</Form.Label>
                                        <Form.Control required name="name" onChange={this.handleChange} type="name" placeholder="Escreva seu nome" />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formSurname">
                                        <Form.Label>Sobrenome*</Form.Label>
                                        <Form.Control required name="surname" value={this.state.surname} onChange={this.handleChange} type="surname" placeholder="Escreva seu sobrenome" />
                                    </Form.Group>
                                </Row>
                                <Form.Group controlId="country">
                                    <Form.Label>País*</Form.Label>
                                    <Form.Control as="select" name="country" value={this.state.country} onChange={this.handleChange}>
                                        <option>Argentina</option>
                                        <option>Brasil</option>
                                        <option>Chile</option>
                                        <option>Paraguai</option>
                                        <option>Uruguai</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email*</Form.Label>
                                    <Form.Control required name="email" value={this.state.email} onChange={this.handleChange} type="email" placeholder="Escreva seu email" />
                                </Form.Group>
                                <Form.Group controlId="userText">
                                    <Form.Label>Observações</Form.Label>
                                    <Form.Control name="userText" value={this.state.userText} onChange={this.handleChange} as="textarea" rows="3" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Reservar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <Button href="/" variant="secondary">Volta</Button>
            </div>
        );
    }
}
export default Reservation;