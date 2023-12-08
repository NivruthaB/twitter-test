export interface Post {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    content: Content;
    like_count: number;
}

export interface GetPostResponse {
    data: Post[];
}

export interface CreatePostResponse {
    data: Post;
}

interface Content {
    video_url?: string;
    text: string;
    picture_url?: string;
    type: string;
}

export interface PostRequest {
    type: string,
    text: string,
    video_url?: string,
    picture_url?: string;
}