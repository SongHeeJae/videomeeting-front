import React, { useEffect, useCallback, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Collapse,
  IconButton,
  Button,
  TextField,
  Tabs,
  Tab,
  AppBar,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import FriendListTabPanel from "./FriendListTabPanel";
import FriendSearchTabPanel from "./FriendSearchTabPanel";
import {
  loadMyFriendsRequest,
  clearMyFriendsState,
  clearDeleteFriendState,
  clearLoadUsersState,
} from "../reducers/user";
import UserInfoDialog from "./UserInfoDialog";

const FriendDialog = (props) => {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const [userInfoDialogOpen, setUserInfoDialogOpen] = useState(false);
  const { deleteFriendError, loadUsersError } = useSelector(
    (state) => state.user
  );
  const [value, setValue] = useState(0);

  const onChange = useCallback((e, nextValue) => {
    setValue(nextValue);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onClickDeleteFriendErrorIconButton = useCallback(() => {
    dispatch(clearDeleteFriendState());
  }, []);

  const onClickLoadUsersErrorIconButton = useCallback(() => {
    dispatch(clearLoadUsersState());
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <UserInfoDialog
        open={userInfoDialogOpen}
        setOpen={setUserInfoDialogOpen}
      />
      <Collapse in={deleteFriendError.length > 0}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClickDeleteFriendErrorIconButton}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {deleteFriendError}
        </Alert>
      </Collapse>
      <Collapse in={loadUsersError.length > 0}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClickLoadUsersErrorIconButton}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {loadUsersError}
        </Alert>
      </Collapse>
      <DialogTitle>친구 관리</DialogTitle>
      <AppBar position="static">
        <Tabs value={value} onChange={onChange}>
          <Tab label="친구 목록" />
          <Tab label="친구 찾기" />
        </Tabs>
      </AppBar>
      <FriendListTabPanel
        setUserInfoDialogOpen={setUserInfoDialogOpen}
        value={value}
        index={0}
      />
      <FriendSearchTabPanel
        setUserInfoDialogOpen={setUserInfoDialogOpen}
        value={value}
        index={1}
      />
      <Button onClick={onClose}>닫기</Button>
    </Dialog>
  );
};

export default FriendDialog;
