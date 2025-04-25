import styles from "@/styles/Home.module.scss";
import EyeCloseIcon from '@rsuite/icons/EyeClose';
import OperatePeopleIcon from '@rsuite/icons/OperatePeople';
import VisibleIcon from '@rsuite/icons/Visible';
import { useState } from "react";
import { Button, Card, Input, InputGroup } from "rsuite";
import AdminIcon from '@rsuite/icons/Admin';
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };

  const handleLogin = () => {
    router.push("/dashboard")
  }

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
                    <Input
                      placeholder="Digite um Email ou CPF"
                    />
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
                    />
                    <InputGroup.Button onClick={handleChange}>
                      {visible ? <VisibleIcon /> : <EyeCloseIcon />}
                    </InputGroup.Button>
                  </InputGroup>
                </div>
              </form>
            </Card.Body>

            <Card.Footer >
              <Button
                appearance="primary"
                color="cyan"
                style={{ width: '100%' }}
                onClick={handleLogin}
              >
                Entrar
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </>
  );
}
