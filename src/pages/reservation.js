import React from 'react';
import '../App.css';
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import mailApi from '../mailApi';
import minionApi from '../minionApi';
import Figure from 'react-bootstrap/Figure';
import FigureImage from 'react-bootstrap/FigureImage';
import moment from 'moment';

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            userText: '',
            country: '',
            minions: [],
            order: [],
        };

        minionApi.post('dynamo-manager', {
            "operation": "list",
            "payload": {
              "TableName": "Minion"
            }
          }).then(res =>{
              this.setState({minions: res.data.Items})
          })

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.mountEmailText = this.mountEmailText.bind(this); 
        this.mountAdminEmailText = this.mountAdminEmailText.bind(this); 
        this.formatMinions = this.formatMinions.bind(this);
        this.handleOrderQuantity = this.handleOrderQuantity.bind(this);
    }

    handleChange(event) {
        const target = event.target.name;
        this.setState({[target]: event.target.value});
    }
    
    handleSubmit(event) {
        let emailText = this.mountEmailText();
        let adminEmailText = this.mountAdminEmailText();
        minionApi.post('dynamo-manager', {
            "operation": "create",
            "payload": {
                "TableName": "Pedido",
                "Item": {
                    "email": this.state.email,
                    "date": moment().format(),
                    "country": this.state.country,
                    "name": this.state.name,
                    "surname": this.state.surname,
                    "observations": this.state.userText,
                    "order": this.state.order
                }
            }
        }).then(res =>{
            mailApi.post(`SendEmailLambda`, { from: 'limapotter@gmail.com',
                to: 'limapotter@gmail.com',
                text: emailText,
                subject: 'success',
                adminTo: 'limapotter@gmail.com',
                adminText: adminEmailText,
                adminSubject: 'Outra reserva!'
            }).then(res => {
                console.log(res);
                console.log(res.data);
            })
        })
        

        event.preventDefault();
    }

    handleOrderQuantity(event){
        this.createOrUpdateOrder(event.target.name, event.target.value)
    }

    createOrUpdateOrder(name, quantity) {
        let orderArray = this.state.order;
        const found = orderArray.some(el => el.name === name);
        if (found){
            orderArray = this.removeByAttr(orderArray, 'name', name);
        }
        orderArray.push({ name: name, quantity: quantity });
        this.setState({order: orderArray})
    }

    removeByAttr(arr, attr, value){
        var i = arr.length;
        while(i--){
           if( arr[i] 
               && arr[i].hasOwnProperty(attr) 
               && (arguments.length > 2 && arr[i][attr] === value ) ){ 
    
               arr.splice(i,1);
    
           }
        }
        return arr;
    }

    mountOrderInEmail(){
        let orderText = '';
        for(let order of this.state.order){
            orderText = orderText + `Nome: ${order.name} - Quantidade: ${order.quantity}\n`
        }
        return orderText
    }

    mountEmailText(){
        let emailText = `Olá ${this.state.name}, tudo bem?\nSó pra avisar que seu pedido foi reservado!\nEnquanto espera, tire um momento para confirmar seus dados, e caso encontre algo errado, não hesite em nos chamar!\n\n
        Seu pedido:\n${this.mountOrderInEmail()}\n\n
        Seus dados:\nNome completo: ${this.state.name} ${this.state.surname}\nEmail: ${this.state.email}\nPaís: ${this.state.country}\n`

        if(this.state.userText){
            emailText = emailText + `Suas observações: ${this.state.userText}\n`
        }

        emailText = emailText + `Lembre-se que estamos sempre por aqui para o caso de dúvidas.\nQuando tivermos atualizações do seu produto, você será a primeira pessoa a saber! :D`

        return emailText;
    }

    mountAdminEmailText(){
        let adminEmailText = `Você conseguiu outra reserva! Abaixo estão os dados do comprador para você conferir, se quiser.\n\n
        Pedido:\n${this.mountOrderInEmail()}\n\n
        Dados do comprador:\nNome completo: ${this.state.name} ${this.state.surname}\nEmail: ${this.state.email}\nPaís: ${this.state.country}\n`

        if(this.state.userText){
            adminEmailText = adminEmailText + `Observações do comprador: ${this.state.userText}\n`
        }

        adminEmailText = adminEmailText + `Não se preocupe, esses dados foram automaticamente para a base de dados. No momento, você só precisa curtir sua nova reserva! :D`;

        return adminEmailText;
    }

    formatMinions(){
        if(this.state.minions.length > 0){
            return (
            <div>
            {this.state.minions.map((minion, index) => (
              <div key={index}>
                <div >
                    <Figure>
                        <FigureImage 
                        width={150}
                        height={150}
                        alt={minion.description}
                        src={minion.image}/>
                        </Figure>
                </div>
                <div>{minion.name}</div>
                <div>{minion.description}</div>
                <div>
                    <label>Quantidade:</label>
                    <input onChange={this.handleOrderQuantity} type="number" name={minion.name} step="1"></input>
                </div>

              </div>
            ))}
            </div> )
        }
        return <div></div>
        
    }

    render(){
        return (
            <div className="App">
                <Container className="App-body">
                    <Row>
                        <Col xs={12} md={6}>
                            <div><this.formatMinions></this.formatMinions></div>
                        </Col>
                        <Col xs={12} md={6}>
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