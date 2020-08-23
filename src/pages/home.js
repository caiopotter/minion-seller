import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Figure from 'react-bootstrap/Figure';
import FigureImage from 'react-bootstrap/FigureImage';
import gru from '../images/grusemfundo.png';
import vector from '../images/vectorsemfundo.png';
import caio from '../images/caio.png';

function Home() {
    return (

        <Container className="App">
            <Row>
                <Col xs={12}>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1>Minion Seller</h1>
                    </header>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <header className="App-body">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1>Reserve seu minion!</h1>
                        <p>Os minions da Minion Seller são resistentes e divertidos, feitos com carinho por um time que os ama tanto quanto você!</p>
                    </header>
                </Col>
                <Col xs={12} md={6}>
                    <header className="App-body">
                        <h2>Vantagens da compra online:</h2>
                        <ul className="list">
                            <li>Receba seu minion antes das lojas físicas</li>
                            <li>Frete negativo para todo o mundo</li>
                            <li>Ganhe milhas para viajar</li>
                            <li>Garantia de entrega em 30 dias a partir da compra</li>
                        </ul>
                        <Button href="/reservation">Reserve já</Button>
                    </header>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={4}>
                    <Figure>
                        <FigureImage 
                        width={150}
                        height={150}
                        alt="gru"
                        src={gru}/>
                        <Figure.Caption>
                            <span className="review-text">Agora finalmente poderei raptar a Luaaaa!<br></br>-Gru</span>
                        </Figure.Caption>
                    </Figure>
                </Col>
                <Col xs={12} md={4}>
                    <Figure>
                        <FigureImage 
                        width={150}
                        height={150}
                        alt="vector"
                        src={vector}/>
                        <Figure.Caption>
                            <span className="review-text">Meu nome é Vector e não me decepcionei com a loja<br></br>-Vector</span>
                        </Figure.Caption>
                    </Figure>
                </Col>
                <Col xs={12} md={4}>
                    <Figure>
                        <FigureImage 
                        width={150}
                        height={150}
                        alt="caio"
                        src={caio}/>
                        <Figure.Caption>
                            <span className="review-text">O que eu achei? Ah, sim.. muito bom mesmo!<br></br>-Caio</span>
                        </Figure.Caption>
                    </Figure>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;