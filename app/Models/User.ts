import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy'
import Post from './Post'

export default class User extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({serializeAs: null})
  public password: string

  @column.dateTime()
  public verifiedAt: DateTime

  @column({columnName: "isActive"})
  public isActive: boolean = false

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @column.dateTime({ autoCreate: true, columnName: "createdAt" })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: "updatedAt" })
  public updatedAt: DateTime
}
