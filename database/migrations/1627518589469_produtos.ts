import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Produtos extends BaseSchema {
  protected tableName = 'produtos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome_produto').notNullable()
      table.text('ingredientes')
      table.decimal('preco').unsigned().notNullable()
      table.integer('categoria_id').unsigned().references('categorias.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
