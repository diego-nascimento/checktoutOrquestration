"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/cart', (Request, Response) => {
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
    });
});
app.listen(8082, () => console.log('server running on port 8082'));
