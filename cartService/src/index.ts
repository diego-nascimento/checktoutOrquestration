import Express, { Request, Response } from 'express'


const app = Express()
app.use(Express.json())

app.get('/cart', (Request: Request, Response: Response) => {
    return Response.status(200).json({
        id: Request.body.id,
        produtosDisponiveis: [
          {
            id: '123',
            nome: 'Bola',
            quantidade: 3,
            valor: 20
          }
        ],
        produtosIndisponiveis: [],
        total: 60
      })
})

app.listen(8082, () => console.log('server running on port 8082'))