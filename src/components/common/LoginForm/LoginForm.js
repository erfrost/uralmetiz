import api from "@/pages/api/apiRequest";
import { Visibility } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  async function get() {
    const { data: resData } = await api("profile");
    if (resData) {
      window.location.href = "/admin";
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: resData } = await api("auth/signin", "POST", data);
    console.log(resData);
    if (resData) {
      localStorage.setItem("access_token", resData.access_token);
      localStorage.setItem("refresh_token", resData.refresh_token);
      localStorage.setItem(
        "refresh_time",
        (Date.now() + 3600 * 1000).toString()
      );
      window.location.href = "/admin";
    }
  };

  useEffect(() => {
    get();
  }, []);

  const handleChange = ({ target }) =>
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  return (
    <>
      <Card>
        <CardContent>
          <Tabs style={{ marginBttom: 10 }} variant="fullWidth" value={"login"}>
            <Tab value={"login"} label="Вход" />
            <Tab value={"register"} label="Регистрация" />
          </Tabs>
          <form onSubmit={handleSubmit}>
            <TextField
              className={styles.input}
              name="email"
              onChange={handleChange}
              value={data.email}
              id="outlined-basic"
              label="E-Mail"
              variant="standard"
            />
            <FormControl
              style={{ width: "100%", marginTop: 10 }}
              variant="standard"
            >
              <InputLabel htmlFor="password">Пароль</InputLabel>
              <Input
                className={styles.input}
                id="password"
                name="password"
                onChange={handleChange}
                value={data.password}
                label="Пароль"
                variant="standard"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <Visibility />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button type="submit" className={styles.button} variant="contained">
              Войти
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginForm;
