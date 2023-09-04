import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
    public async index({response, auth}: HttpContextContract) {
        // await auth.use("api").authenticate()
        const posts = await Post.all();
        return response.status(200).send({success: true, data: posts});
    }
}
