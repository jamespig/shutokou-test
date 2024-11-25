export interface SingleUser{
    username: string,
    email: string,
    redis_value: string
}
export interface UserType{
    singleUser: SingleUser,
    userList: Array<SingleUser>,
    sortedUsers: Array<SingleUser>,
    sortBy: keyof SingleUser,
    loading: boolean,
    error: null | undefined | string,
}