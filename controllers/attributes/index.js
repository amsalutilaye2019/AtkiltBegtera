const Category = require('../../models').Category;
const Product = require('../../models').Product;
const Attribute = require('../../models').Attribute;


module.exports = {
    getAllAttributes: async(req, res, next)=>{
        return Attribute.findAll({})
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error));

    },

    deleteAttribute: async(req, res, next) => {
        var id = req.params.id;
        var attribute = await Attribute.findByPk(id)

        if(attribute == null){
            return res.status(404).send({
		"status": "Attribute Does Not Exist"
	    })
        }

        return attribute.destroy()
        .then(_ => res.status(200).send())
        .catch(error => res.status(400).send(error));
        
    },

    createAttribute: async(req, res, next) => {
        if(!(req.body.name && (req.body.type == 'option' || req.body.type == 'input'))){
            res.status(400).send({
                error: "Malformed request body"
            })
        }
        var attribute = await Attribute.create(req.body)
        return attribute.save()
            .then(result => res.status(200).send(result))
            .catch(error => res.status(400).send(error));

    }
}