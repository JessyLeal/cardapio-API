import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from 'App/Models/Produto'
import Categoria from 'App/Models/Categoria'

export default class ProdutosController {
  public async index ({}: HttpContextContract) {
    return Produto.all()
  }

  public async store ({request,response}: HttpContextContract) {
    const {categoria_id}= request.params()
    const {nome_produto, ingredientes, preco} = request.body()
    const ifexist = await Categoria.findBy('id', categoria_id)
    if (!ifexist){
      return response.notFound()
    }
    const pdt = await Produto.create({nomeProduto:nome_produto, ingredientes, preco, categoriaId:categoria_id})
    return pdt
  }

  public async show ({request, response}: HttpContextContract) {
    const{categoria_id, id} = request.params()
    const pdt = await Produto.query().where('id',id).andWhere('categoria_id', categoria_id).first()
    if (!pdt){
      return response.notFound()
    }
    return pdt
  }

  public async update ({request, response}: HttpContextContract) {
    const {categoria_id,id} = request.params()
    const {nome_produto, ingredientes, preco} = request.body()
    const pdt = await Produto.query().where('id',id).andWhere('categoria_id', categoria_id).first()
    if (!pdt){
      return response.notFound()
    }
    await pdt
    .merge({
      nomeProduto: nome_produto,
      ingredientes: ingredientes,
      preco: preco
    })
    .save()
    return pdt
  }

  public async destroy ({request, response}: HttpContextContract) {
    const {categoria_id,id}=request.params()
    const pdt = await Produto.query().where('id',id).andWhere('categoria_id', categoria_id).first()
    if (!pdt){
      return response.notFound()
    }
    pdt.delete()
    return pdt
  }
}
