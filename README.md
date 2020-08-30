![Preview-Screens](https://minion-seller-bucket.s3.amazonaws.com/SS-home.png)

![Preview-Screens](https://minion-seller-bucket.s3.amazonaws.com/SS-reservation.png)

## Sobre o projeto

Esse projeto tem como objetivo ser uma webapp simples e reativa, com frontend feito em React.js e backend utilizando tecnologias cloud como AWS e Serverless.

A ideia do site é ter uma [Landing page](https://pt.wikipedia.org/wiki/Landing_page) para reserva de Minions, e uma página secundária de formulário, para que o usuário preencha alguns dados, selecione seus produtos e consolide sua reserva.

## Demonstração

Fique a vontade para testar as funcionalidades do site [aqui](https://d2srbxsz7klx41.cloudfront.net/). Porém, o envio de email é ilustrativo, uma vez que estou utilizando a camada gratuita do serviço [AWS SES](https://aws.amazon.com/pt/ses/), e preciso cadastrar previamente os endereços de email destinatários.

## Por quê?

Esse projeto também serve como desafio pessoal, visto que é a primeira vez que utilizo as tecnologias citadas anteriormente.

## Construção

O frontend do projeto foi feito com:
- [React.js](https://pt-br.reactjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Axios](https://github.com/axios/axios)
- [Moment](https://momentjs.com/)

O backend do projeto foi feito com:
- [Amazon Web Services](https://aws.amazon.com/pt/)
  - [S3](https://aws.amazon.com/pt/s3/)
  - [SES](https://aws.amazon.com/pt/ses/)
  - [API Gateway](https://aws.amazon.com/pt/api-gateway/)
  - [Lambda](https://aws.amazon.com/pt/lambda/)
  - [DynamoDB](https://aws.amazon.com/pt/dynamodb/)
- [Serverless framework](https://www.serverless.com/)

## Comunicação
O frontend do app está hospedado na plataforma Serverless. O usuário acessa a url do site e a plataforma envia os dados ao web Browser.
Enquanto carrega, o site no browser acessa o endpoint da API Gateway. Esse endpoint chama a função lambda responsável por pedir a lista de Minions no banco de dados DynamoDB.
O banco de dados recebe o pedido e retorna a lista à função lambda, que retorna à API Gateway, que por sua vez, envia ao browser, exibindo os Minions disponíveis.

![diagram](https://minion-seller-bucket.s3.amazonaws.com/diagramaArquitetural.png)

Mais dois acessos aos endpoints da API gateway são realizados quando o usuário realiza seu pedido, com as seguintes funções:
  - Enviar de email ao cliente e ao admin
  - Salvar pedido no banco de dados (mesma estrutura do diagrama acima, dessa vez, utilizando http POST)

![SESDiagram](https://minion-seller-bucket.s3.amazonaws.com/DiagramaSES.png)

## AWS Api Gateway exemplos

Recuperar lista de minions:\
![minionList](https://minion-seller-bucket.s3.amazonaws.com/list-dynamo.PNG)\

Envio de email ao cliente a ao admin:\
![sendEmail](https://minion-seller-bucket.s3.amazonaws.com/sendEmail.PNG)\
Emails:\
![emailSent](https://minion-seller-bucket.s3.amazonaws.com/emailSent.PNG)
![emailSentAdmin](https://minion-seller-bucket.s3.amazonaws.com/emailSentAdmin.PNG)

Salvamento de pedido feito pelo usuário:\
![saveOrder](https://minion-seller-bucket.s3.amazonaws.com/saveOrder.PNG)\
Resultado no DynamoDB:\
![dbOrder](https://minion-seller-bucket.s3.amazonaws.com/dbOrder.PNG)
