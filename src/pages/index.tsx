import styles from "@/styles/Home.module.scss";
import EyeCloseIcon from '@rsuite/icons/EyeClose';
import OperatePeopleIcon from '@rsuite/icons/OperatePeople';
import VisibleIcon from '@rsuite/icons/Visible';
import { useState } from "react";
import { Button, Card, Input, InputGroup } from "rsuite";
import AdminIcon from '@rsuite/icons/Admin';
import { useRouter } from "next/router";
import api from "@/services/axios";

export default function Home() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChange = () => {
    setVisible(!visible);
  };

  const handleLogin = async () => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.access_token);
      router.push('/dashboard');
    } catch (err) {
      console.error('Erro ao logar', err);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <Card shaded="hover" className={styles.card}>
            <Card.Header as="h3" className={styles.header}>Bem-Vindo de Volta!</Card.Header>

            <Card.Body className={styles.body}>
              <OperatePeopleIcon className={styles.mainIcon} />
              <form onSubmit={() => { }} className={styles.form}>
                <div>
                  <span>Usuário</span>
                  <InputGroup inside>
                    <Input value={email} onChange={setEmail} />
                    <InputGroup.Addon>
                      <AdminIcon />
                    </InputGroup.Addon>
                  </InputGroup>
                </div>

                <div>
                  <span>Senha</span>
                  <InputGroup inside>
                    <Input
                      type={visible ? 'text' : 'password'}
                      placeholder="Digite sua Senha"
                      value={password} onChange={setPassword}
                    />
                    <InputGroup.Button onClick={handleChange}>
                      {visible ? <VisibleIcon /> : <EyeCloseIcon />}
                    </InputGroup.Button>
                  </InputGroup>
                </div>

                <Button
                  appearance="primary"
                  color="cyan"
                  style={{ width: '100%' }}
                  onClick={handleLogin}
                >
                  Entrar
                </Button>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
