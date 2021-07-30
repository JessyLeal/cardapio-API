import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Categoria from './Categoria'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nomeProduto: string

  @column()
  public ingredientes: string

  @column()
  public preco: number

  @column()
  public categoriaId: number

  @hasOne(()=>Categoria)
  public categoria: HasOne<typeof Categoria>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
