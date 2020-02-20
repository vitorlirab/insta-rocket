import sharp from 'sharp';
import { resolve } from 'path';
import fs from 'fs';
import Post from '../models/Post';

class PostController {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  }

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image, path, destination } = req.file;

    const [name] = image.split('.');
    const fileName = `${name}.jpg`;

    await sharp(path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(resolve(destination, 'resized', fileName));

    fs.unlinkSync(path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName,
    });

    req.io.emit('post', post);

    return res.json(post);
  }
}
export default new PostController();
