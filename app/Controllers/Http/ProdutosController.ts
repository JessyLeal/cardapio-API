import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from 'App/Models/Produto'

export default class ProdutosController {
  public async index ({}: HttpContextContract) {
    return Produto.all()
  }

  public async store ({request}: HttpContextContract) {
    const {categoriaId}= request.params()
    const {nomeProduto, ingredientes, preco} = request.body()
    const pdt = await Produto.create({nomeProduto, ingredientes, preco, categoriaId})
    return pdt
  }

  public async show ({request, response}: HttpContextContract) {
    const{categoriaId, id} = request.params()
    const pdt = await Produto.query().where('id',id).andWhere('categoriaId', categoriaId).first()
    if (!pdt){
      return response.notFound()
    }
    return pdt
  }

  public async update ({request, response}: HttpContextContract) {
    const {categoriaId,id} = request.params()
    const {nomeProduto, ingredientes, preco} = request.body()
    const pdt = await Produto.query().where('id',id).andWhere('categoriaId', categoriaId).first()
    if (!pdt){
      return response.notFound()
    }
    pdt.nomeProduto = nomeProduto
    pdt.ingredientes = ingredientes
    pdt.preco= preco
    await pdt.save()
    return pdt
  }

  public async destroy ({request, response}: HttpContextContract) {
    const {categoriaId,id}=request.params()
    const pdt = await Produto.query().where('id',id).andWhere('categoriaId', categoriaId).first()
    if (!pdt){
      return response.notFound()
    }
    pdt.delete()
    return pdt
  }
}
