interface User {
    id: number;
    name: string;
    avatar_url: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface UserResponse {
    data: User
}
export interface UserRequest {
    email: string;
    password: string;
}
export interface RegistrationRequest extends UserRequest {
    name: string;
}