import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @Post()
    createPost(@Body() post: CreatePostDto) {
        return this.postService.createPost(post)
    }

    @Get()
    getPosts() {
        return this.postService.getPosts()
    }

    @Delete(':id')
    deletePost(@Param('id', ParseIntPipe) id: number) {
        return this.postService.deletePost(id)
    }

    @Patch(':id')
    updatePost( @Param('id', ParseIntPipe) id: number, @Body() post: UpdatePostDto ) {
        return this.postService.updatePost(id, post)
    }
}
