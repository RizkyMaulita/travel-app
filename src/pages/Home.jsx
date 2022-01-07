import React, { useState } from "react"
import dummyComment from '../data/comment.json'
import calculateDuration from '../utils/duration'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp as iconLike } from "@fortawesome/free-solid-svg-icons"
import { faComment, faThumbsUp as iconDislike } from '@fortawesome/free-regular-svg-icons'

const dataLogin = { // dapat dari stateManagement atau hasil hit endpoint /profile
  user_id: 2,
  username: "john",
  imageUrl: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
}

/*
  misal, kamu ada stateManagement dari redux,
  di store kan ada reducer, user / profile
  
  ketika page tersebut di render, kan ada navbar, yang dimana navbar ini membutuhkan imageurl dan username
  maka data tersebut kamu simpan ke dalam store reducer user/profile.

  so, tinggal ambil aja datalogin dari store reducer tersebut. jadi di comment ini, tidak perlu hit endpoint /user/detail

  seharusnya ada endpoint get /profile => yang dimana akan return data user yang login tersebut (user_id, username, imageUrl).

  endpoint get /profile => return data user yang lagi login. user_id nya dapat dari decoded token
  endpoint put /profile => edit profile
 */

export default function HomePage () {
  const [ dataComments, setDataComments ] = useState([ ...dummyComment ])
  const [ form, setForm ] = useState('')
  const [ positionComment, setPositionComment ] = useState({
    commentID: '',
    repCommentUUID: '',
    depends_on: {
      user_id: '',
      username: '',
      context: ''
    }
  })

  const checkLike = (arrLikes = []) => {
    if (arrLikes?.find(data => data?.user_id === dataLogin?.user_id)) {
      return true
    }
    return false
  }

  const handleComment = () => {
    console.log(form, '<<< comment')
    if (form) {
      if (positionComment?.commentID) {
        const payload = {
          context: form,
          depends_on: {
            uuid: positionComment?.repCommentUUID,
            author: ''  // author diisi jika dia mention secara langsung di dalam komentar tersebut.
          }
        }
        const commentID = positionComment?.commentID
        console.log(payload , '<<< new reply comment with id ', commentID)
      } else {
        const payload = {
          context: form
        }
        console.log(payload, '<<< new comment')
      }
    }
  }

  const handleCancelComment = () => {
    setForm('')
    setPositionComment({
      commentID: '',
      repCommentUUID: '',
      depends_on: {
        user_id: '',
        username: '',
        context: ''
      }
    })
  }

  const CommentSection = () => {
    return (
      <div className="row my-2 align-items-center">
        <div className="col-1">
          <img
            className="rounded-circle shadow-1-strong me-3 align-self-center"
            src={dataLogin?.imageUrl}
            alt="avatar"
            width="50"
            height="50"
          />
        </div>
        <div className="col-11">
          { // jika kita buat sebuah comment baru yg dimana kita ngequote / reply comment yg lain
            positionComment?.depends_on?.username && positionComment?.depends_on?.context
            ? <div className="input-group">
                <input type="text" className="form-control fs-6 fst-italic" value={`@${positionComment?.depends_on?.username} - ${positionComment?.depends_on?.context}`} disabled style={{ borderRadius: '15px 15px 0 0' }}/>
              </div>
            : null
          }          
          <div className="input-group">
            <textarea className="form-control" style={{ borderRadius: positionComment?.depends_on?.username && positionComment?.depends_on?.context ? '0px 0px 15px 15px' : '15px' }} onChange={e => setForm(e?.target?.value)}>{form}</textarea>
          </div>
        </div>
        <div className="mt-2 d-flex justify-content-end">
          <div className="btn btn-light mx-2" style={{ border: '1px solid #0d6efd', color: "#0d6efd" }} onClick={() => handleCancelComment()}>Cancel</div>
          <div className="btn btn-primary"  onClick={() => handleComment()}>Comment</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 col-lg-10 col-xl-8">
            <div className="card">
              <div className="card-body p-4">
                <h4 className="text-center mb-4 pb-2">Nested comments section</h4>
                  {
                    !positionComment.commentID && !positionComment.repCommentUUID
                    ? CommentSection()
                    : null
                  }
                <div className="row">
                  <div className="col">
                  {/* {
                    !positionComment.commentID && !positionComment.repCommentUUID
                    ? CommentSection()
                    : null
                  }  */}
                    {
                      dataComments?.map(comment => {
                        return (
                          <div key={comment?.id}>
                            <div className="d-flex flex-start mb-4">
                              <img
                                className="rounded-circle shadow-1-strong me-3"
                                src={comment?.User?.imageUrl}
                                alt="avatar"
                                width="50"
                                height="50"
                              />
                              <div className="flex-grow-1 flex-shrink-1">
                                <div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                      {comment?.User?.username}
                                      <span className="small"> - {calculateDuration(comment?.updatedAt)}</span>
                                    </p>
                                  </div>
                                  <p className="small mb-1">{comment?.context}</p>
                                  <div className="d-flex justify-content-between">
                                    <div className="btn p-0" onClick={() => setPositionComment({ 
                                      commentID: comment?.id, 
                                      repCommentUUID: '',
                                      depends_on: {
                                        user_id: comment?.User?.user_id,
                                        username: comment?.User?.username,
                                        context: comment?.context
                                      }
                                    })}>
                                      <FontAwesomeIcon icon={faComment} />
                                    </div>
                                    <div className="btn p-0">
                                      <FontAwesomeIcon icon={checkLike(comment?.likes) ? iconLike : iconDislike} className="mx-2" />
                                      {comment?.likes?.length || ''}
                                    </div>
                                  </div>
                                </div>
                                {
                                  comment?.rep_comments?.map(repComment => {
                                    return (
                                      <div key={repComment?.uuid}>
                                        <div className="d-flex flex-start mt-4">
                                          <div className="me-3">
                                            <img
                                              className="rounded-circle shadow-1-strong"
                                              src={repComment?.author?.imageUrl}
                                              alt="avatar"
                                              width="50"
                                              height="50"
                                            />
                                          </div>
                                          <div className="flex-grow-1 flex-shrink-1">
                                            <div>
                                              <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-1">
                                                  {repComment?.author?.username}
                                                  <span className="small"> - {calculateDuration(repComment?.updatedAt)} </span>
                                                </p>
                                              </div>
                                              <p className="small mb-1">{repComment?.context}</p>
                                              <div className="d-flex justify-content-between">
                                                <div className="btn p-0">
                                                  <FontAwesomeIcon icon={faComment} onClick={() => setPositionComment({ 
                                                    commentID: comment?.id, 
                                                    repCommentUUID: repComment?.uuid,
                                                    depends_on: {
                                                      user_id: repComment?.author?.user_id,
                                                      username: repComment?.author?.username,
                                                      context: repComment?.context
                                                    }
                                                  })}  />
                                                </div>
                                                <div className="btn p-0">
                                                  <FontAwesomeIcon icon={checkLike(repComment?.likes) ? iconLike : iconDislike} className="mx-2" />
                                                  { repComment?.likes?.length || '' }
                                                </div>
                                              </div>
                                            </div>
                                            
                                          </div>
                                        </div>
                                        {
                                          positionComment.commentID === comment?.id && positionComment.repCommentUUID === repComment?.uuid
                                          ? CommentSection()
                                          : null
                                        }
                                      </div>
                                    )
                                  })
                                }
                                {
                                  positionComment.commentID === comment?.id && !positionComment.repCommentUUID
                                  ? CommentSection()
                                  : null
                                }
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                {/* {
                  !positionComment.commentID && !positionComment.repCommentUUID
                  ? CommentSection()
                  : null
                } */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}