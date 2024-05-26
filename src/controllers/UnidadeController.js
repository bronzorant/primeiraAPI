// UnidadeController.js
const UnidadeModel = require("../models/UnidadeModel");

module.exports = {
    ping: (req, res) => {
        res.json({ pong: true });
    },

    all: async (req, res) => {
        let json = { error: '', result: [] };
        let unidades = await UnidadeModel.getAll();
        
        for (let i in unidades) {
            json.result.push({
                id: unidades[i].id,
                nome: unidades[i].nome,
                area: unidades[i].area,
                volume: unidades[i].volume,
                datacriacao: unidades[i].datacriacao,
                usuario: unidades[i].usuario,
                isactive: unidades[i].isactive
            });
        }

        res.json(json);
    },

    one: async (req, res) => {
        let json = { error: '', result: {} };
        let id = req.params.id;
        let unidade = await UnidadeModel.findById(id);
        
        if (unidade) {
            json.result = unidade;
        }

        res.json(json);
    },

    new: async (req, res) => {
        let json = { error: '', result: {} };

        let { nome, area, volume, datacriacao, usuario, isactive } = req.body;

        if (nome && area && volume) {
            try {
                let unidadeId = await UnidadeModel.add(nome, area, volume, datacriacao, usuario, isactive);
                json.result = {
                    id: unidadeId,
                    nome,
                    area,
                    volume,
                    datacriacao,
                    usuario,
                    isactive
                };
            } catch (error) {
                json.error = "Erro ao inserir registro.";
            }
        } else {
            json.error = "Campos obrigatórios não preenchidos.";
        }

        res.json(json);
    },

    edit: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id;
        let { nome, area, volume, datacriacao, usuario, isactive } = req.body;

        if (id && nome && area && volume) {
            try {
                await UnidadeModel.update(id, nome, area, volume, datacriacao, usuario, isactive);
                json.result = {
                    id,
                    nome,
                    area,
                    volume,
                    datacriacao,
                    usuario,
                    isactive
                };
            } catch (error) {
                json.error = "Erro ao atualizar registro.";
            }
        } else {
            json.error = "Campos obrigatórios não preenchidos.";
        }

        res.json(json);
    },

    delete: async (req, res) => {
        let json = { error: '', result: {} };
        
        let id = req.params.id;

        try {
            await UnidadeModel.delete(id);
            json.result = { id };
        } catch (error) {
            json.error = "Erro ao deletar registro.";
        }

        res.json(json);
    }
};
