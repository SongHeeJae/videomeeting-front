import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import Router from "next/router";
import useInput from "../hooks/useInput";
import { clearLoginState, loginRequest } from "../reducers/user";
import ErrorCollapse from "./ErrorCollapse";

const LoginFormWrapper = styled.div`
  text-align: center;
  .login-text-field {
    margin: 10px;
  }
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [uid, onChangeUid] = useInput("");
  const [password, onChangePassword] = useInput("");
  const { loginError, loginDone, loginLoading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!loginDone) return;
    Router.replace("/");
  }, [loginDone]);

  const onClickErrorIconButton = useCallback(() => {
    dispatch(clearLoginState());
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginRequest({ uid, password }));
    },
    [uid, password]
  );
  return (
    <LoginFormWrapper>
      <h1>로그인 정보를 입력해주세요.</h1>
      <ErrorCollapse error={loginError} onClick={onClickErrorIconButton} />
      <form onSubmit={onSubmit}>
        <TextField
          required
          label="이메일 아이디"
          type="email"
          value={uid}
          onChange={onChangeUid}
          variant="outlined"
          className="login-text-field"
        />
        <br />
        <TextField
          type="password"
          required
          label="비밀번호"
          value={password}
          onChange={onChangePassword}
          variant="outlined"
          className="login-text-field"
        />
        <br />

        <Button type="submit">로그인</Button>
      </form>
    </LoginFormWrapper>
  );
};

export default LoginForm;
