import { gql } from "@apollo/client";

export const SIGNUP = gql `
mutation CreateNewUser($data: UserInput!) {
  signup(userNew: $data) {
    token
  }
}
`
export const ME = gql `
query Me{
  me{
    id
    userName
    email
  }
}
`
export const GetAllIdea_withPhoto = gql `
query GETALLIDEA{
  allIdea{
    id
    title
    desc
    by{
      userName
    }
    like
    worker
    photos{
      link
    }
  }
}
`
export const GetYourIdea_withPhtot = gql `
query GETYOURIDEA {
  yourIdea {
    id
    title
    desc
    like
    worker
    by {
      userName
    }
    photos {
      link
    }
  }
}
`

export const GetYourSingleIdea_withPhoto = gql `
query GetSingleIdea($data:String!){
  singleIdea(to:$data){
    id
    title
    desc
    worker
    like
    fund
    by{
      userName
    }
    photos{
      link
    }
  }
}
`
export const GetAllIdea_SingleUser = gql `
query GETALLIDEA_SINGLEUSER($data:String!){
	allIdea_signleUser(to:$data){
    id
    title
    desc
  }
}
`
export const Creat_idea_with_photo = gql `
mutation CreateNewIdea_Photo($data:IdeaInput!){
  addIdea(IdeaNew:$data)
}
`

export const Add_Photo = gql `
mutation AddPhoto($data:PhotoInput!){
	addPhoto(photoNew:$data)
}
`

export const Like_Idea = gql `
mutation LIKE_IDEA($data:LikeInput!){
  addLike(likeNew:$data)
}
`

export const Get_All_askingfor_work = gql `
query GET_ALL_ASKINGfor_WORK($data:String!){
  allaskingfor_work(to:$data){
    msg
    from{
      id
      userName
    }
  }
}
`

export const Accept_work = gql `
mutation ADD_TO_WORK($data:WorkInput!){
  addTowWork(WorkNew:$data)
}
`

export const Ask_for_work = gql `
mutation AskWork($data:AskInput!){
  askforWork(askData:$data)
}
`

export const ALL_Request = gql `
query ALL_REQUEST($data:String!){
	allRequest_singleUser(to:$data){
    from{
      id
      userName
    }
  }
}
`
export const Accept_friend = gql `
mutation AddFriend($data:String!){
  addfriend(to:$data){
    p1
    p2
  }
}
`

export const ALL_friend = gql `
query ALL_friends{
  allFriends{
    p2{
      id
      userName
    }
  }
}
`

export const Check_friend = gql `
query Check_friend($data:String!){
  check_friends(to:$data)
}
`

export const GET_id_from_Idea = gql `
query GET_ID_FROM_IDEA($data:String!){
 get_user_id_form_idea(to:$data) 
}
`

export const Send_friend_request = gql `
mutation SendFriendRequest($data: String!) {
  friendrequest(to: $data)
}
`

export const CHECK_FOR_WORKER = gql `
query Check_for_worker($data:DataInputID!){
  work_or_not(newDataID:$data)
}
`

export const GET_ALL_COMMENT = gql `
query ALLCOMMENTS($data:String!){
  get_all_comment(to:$data){
    name
    time
    by{
      userName
      id
    }
  }
}
`

export const MAKE_COMMENT = gql `
mutation CreateNewComment($data:CommentInput!){
  addComment(CommentNew:$data)
}

`

export const MOST_LIKED = gql `
query TOP_LIKED{
  get_top_like
}
`

export const GIVE_TOKEN = gql `
mutation GIVE_TOKEN($data:FundInput!){
  fundIdea(NewFund:$data)
}
`

export const TOP_FUNDED = gql `
query TOP_FUNDED{
  get_top_funded
}
`

export const GET_MSG_ALL = gql `
query GET_MSG($data:String!){
  get_msg(to:$data){
   messages{
    msg
    side
   }
  }
}
`

export const Send_msg = gql `
mutation Send_MSG($data:MsgInput!){
  sendMsg(NewMsg:$data)
}
`

export const CHECK_FOR_MSG = gql `
query CHECK_MSG($data:String!){
  check_msg(to:$data)
}
`

export const SEEN = gql `
mutation Delete_Seen($data:String!){
  msghasbeenseen(to:$data)
}
`