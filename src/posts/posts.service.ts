import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>, 
        private usersService: UsersService
    ) {}

    async createPost(post: CreatePostDto) {
        const userFound = await this.usersService.getUserById(post.authorId);

        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const newPost = this.postsRepository.create(post)
        return this.postsRepository.save(newPost)
    }

    getPosts() {
       return this.postsRepository.find({
        relations: ['author']
       })
    }

    async deletePost(id: number) {
        const result = await this.postsRepository.delete({id})
        if( result.affected === 0 ) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return result
    }

    async updatePost(id: number, post: UpdatePostDto) {
        const result = await this.postsRepository.update({id}, post)
        if( result.affected === 0 ) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return result
    }

}
