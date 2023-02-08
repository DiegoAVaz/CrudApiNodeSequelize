const {Router} = require('express')
const { Product } = require('../models')

const router = Router()

router.get('/', async (req, res) => {
    const products = await Product.findAll()
    res.status(200).json(products)
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    const products = await Product.findByPk(req.params.id)
    res.status(200).json(products)
})

router.post('/', async (req, res) => {
    const { name, description } = req.body
    const newProduct = Product.create({ name, description })

    res.status(200).json({message: "Cadastrado com sucesso"})
})

router.delete('/:id', async (req, res) => {
    await Product.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: 'Excluido com sucesso'})
})

router.put('/:id', async(req, res) => {
    const { name, description } = req.body

    await Product.update(
        {name, description},
        {
            where: { id: req.params.id }
        }
    )
    res.status(200).json({message: 'Atualizado com sucesso'})
})

module.exports = router