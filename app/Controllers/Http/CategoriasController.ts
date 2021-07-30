import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria'

export default class CategoriasController {
  public async index ({}: HttpContextContract) {
    return Categoria.query().preload('produto')
  }

  public async store ({request}: HttpContextContract) {
    const {categoria} = request.body()
    const ctg = await Categoria.create({categoria})
    return ctg
  }

  public async show ({request,response}: HttpContextContract) {
    const {id} = request.params()
    const ctg = await Categoria.findBy('id', id)
    if (!ctg){
      return response.notFound()
    } 
    return ctg
  }

  public async update ({request,response}: HttpContextContract) {
    const {id}= request.params()
    const {categoria} = request.body()
    const ctg = await Categoria.findBy('id', id)
    if (!ctg){
      return response.notFound()
    }
    ctg.categoria = categoria
    await ctg.save()
    return ctg
  }

  public async destroy ({request,response}: HttpContextContract) {
    const {id} = request.params()
    const ctg = await Categoria.findBy('id',id)
    if (!ctg){
      return response.notFound()
    }
    ctg.delete()
    return ctg
  }
}
