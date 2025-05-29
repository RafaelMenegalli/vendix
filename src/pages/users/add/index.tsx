import api from '@/services/axios';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import EyeCloseIcon from '@rsuite/icons/EyeClose';
import VisibleIcon from '@rsuite/icons/Visible';
import { useRouter } from "next/router";
import { useState } from 'react';
import { Button, Divider, IconButton, Input, InputGroup } from "rsuite";
import styles from "./styles.module.scss";
const iziToast = typeof window !== 'undefined' ? require('izitoast') : null;

export default function UsersAdd() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleBackPage = () => {
        router.push("/users")
    }

    const handleChange = () => {
        setVisible(!visible);
    };

    const handleSave = async () => {
        try {
            setLoading(true)

            if (!email || !password) {
                iziToast.warning({
                    title: "Aviso!",
                    message: "Os campos de Email e Senha são obrigatórios.",
                    position: "topRight",
                    close: true
                })
                return;
            }

            const createUserObj = {
                email, password
            }

            const response = await api.post('/users', createUserObj)

            if (response.data.data) {
                iziToast.success({
                    title: "Sucesso!",
                    message: response.data.message,
                    position: "topRight",
                    close: true
                })

                handleBackPage()
            }
        } catch (error: any) {
            const messages = error?.response?.data?.message || ["Erro ao cadastrar usuário"];

            const errorsArray = Array.isArray(messages) ? messages : [messages];

            errorsArray.forEach((msg: string) => {
                iziToast.error({
                    title: "Erro!",
                    message: msg,
                    position: "topRight",
                    close: true
                });
            });
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.actionBar}>
                    <div></div>

                    <IconButton
                        icon={<ArrowLeftLineIcon />}
                        appearance="primary"
                        color="blue"
                        onClick={handleBackPage}
                    ></IconButton>
                </div>

                <Divider></Divider>

                <div className={styles.formContainer}>
                    <div style={{ gridColumn: 'span 7' }} className={styles.fieldSeparator}>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(v) => setEmail(v)}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 5' }} className={styles.fieldSeparator}>
                        <span>Senha</span>
                        <InputGroup inside style={styles}>
                            <Input
                                type={visible ? 'text' : 'password'}
                                value={password}
                                onChange={(v) => setPassword(v)}
                            />
                            <InputGroup.Button onClick={handleChange}>
                                {visible ? <VisibleIcon /> : <EyeCloseIcon />}
                            </InputGroup.Button>
                        </InputGroup>
                    </div>
                </div>

                <div className={styles.footer}>
                    <Button
                        appearance="primary"
                        color="green"
                        onClick={handleSave}
                        loading={loading}
                    >
                        Cadastrar
                    </Button>
                </div>
            </div>
        </>
    )
}