import { Button,Divider, Container, Grid, Stack, Typography, TextField, Avatar, Link } from '@mui/material';
import { useState } from 'react';
import { replyDelete, replyUpdate } from '../../services/api/ReplyApi';
import { getUserInfoUuid } from '../../services/api/UserApi';
import { getLoggedUserId } from '../../utils/loggedUser';
import ProfileImageUploadButton from '../common/ProfileImageUploadButton';
export default function ReplyDetail({ reply }) {
  let id = reply.replyId;
  const [vis, setVis] = useState(false);
  const [content, setContent] = useState(reply.replyContent);

  // 댓글 삭제
  const deleteReply = async () => {
    const result = await replyDelete(id);
    if (result == 'success') {
      window.location.reload(); // 임시방편으로 reload 해둠
    } else {
      alert('댓글 생성 실패');
    }
  };

  // 수정 TextField에 값 넣기
  const onContentHandler = (event) => {
    setContent(event.target.value);
  };

  // 수정 버튼 클릭시 form 보이기
  const onUpdateFormHandler = () => {
    setContent(reply.replyContent);
    setVis(!vis);
  };

  const onUpdateReplySumit = async () => {
    const result = await replyUpdate({
      replyId: reply.replyId,
      replyUser: reply.replyUser,
      voteReply: reply.voteReply,
      replyContent: content,
      replyCreateTime: reply.replyCreateTime,
    });
    if (result == 'success') {
      window.location.reload();
    } else {
      alert('댓글 생성 실패');
    }
  };

  return (
    <>
      <Stack direction="row" >
        {/* <Grid item xs={2} paddingLeft={2} paddingTop={2}> */}
        <Stack sx={{ justifyContent: 'flex-start', alignItems: 'center', width: 80, py:2, }}>
          <Avatar
            src={reply.replyUserProfile}
            alt="Profile Photo"
            shadow="xl"
            sx={{
              width: '2rem',
              height: '2rem',
              border: 1,
              borderColor: '#c5cae9',
            }}
          />
        </Stack>
        {/* </Grid> */}

        <Grid item xs={8} sx={{ display:'flex', flexDirection:'column', justifyContent:'space-evenly', pt:1.5,}}>
          <Typography color="primary" variant="overline" sx={{fontSize:14,}}>
            {reply.replyUserNickname}
            </Typography>
          <Stack>
            {!vis ? (
              <Grid item xs={12}>
                <Typography variant="button" paddingTop={1} marginBottom={2}>
                  {reply.replyContent}
                </Typography>
              </Grid>
            ) : (
              <Grid item xs={10} paddingLeft={3}>
                <Stack direction="row">
                  <TextField
                    autoComplete="replyContent"
                    fullWidth
                    type="replyContent"
                    label="content"
                    value={content}
                    onChange={onContentHandler}
                  ></TextField>
                </Stack>
              </Grid>
            )}
          </Stack>
        </Grid>
        <Stack sx={{ display:'flex', flexDirection:'column', justifyContent:'flex-end', pt:1.5,}}>
        {reply.replyUser == getLoggedUserId() ? (
          !vis ? (
            <>
              <Button size="small" onClick={onUpdateFormHandler}>수정</Button>
              <Button size="small"onClick={deleteReply}>삭제</Button>
            </>
          ) : (
            <>
              <Button size="small" onClick={onUpdateReplySumit}>수정</Button>
              <Button size="small" onClick={onUpdateFormHandler}>취소</Button>
            </>
          )
        ) : null}
        </Stack>
      </Stack>
      <Divider variant="middle" />
    </>
  );
}
