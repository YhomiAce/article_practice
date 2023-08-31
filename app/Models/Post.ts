import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy'
import User from './User'

export default class Post extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public isPublished: boolean = false

  @belongsTo(() => User)
  public author: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
