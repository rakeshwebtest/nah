import { Injectable } from '@nestjs/common';
import { PostEntity } from '../post.entity';
import { AgendaTopicsEntity } from '../agenda-topics.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository, getRepository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
    constructor(@InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>) {

    }
    async savePost(post): Promise<PostEntity> {
        const _post = new PostEntity();
        _post.title = post.title;
        _post.description = post.description;

        const userId = parseInt(post.createdBy);
        // user 
        _post.createdBy = new UserEntity();
        _post.createdBy.id = userId;

        // topic
        _post.topic = new AgendaTopicsEntity();
        _post.topic.id = parseInt(post.topic);
        if (post.id)
            _post.id = parseInt(post.id);

        return this.postRepository.save(_post);

        // return data;

    }


}
