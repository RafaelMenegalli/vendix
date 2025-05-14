import api from '@/services/axios';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import { useRouter } from "next/router";
import { useState } from 'react';
import { Button, Divider, IconButton, Input, Toggle } from "rsuite";
import styles from "./styles.module.scss";
const iziToast = typeof window !== 'undefined' ? require('izitoast') : null;

export default function CategoriesAdd() {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [active, setActive] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const handleBackPage = () => {
        router.push("/categories")
    }

    const handleSave = async () => {
        try {
            setLoading(true)

            if (!name) {
                iziToast.warning({
                    title: "Aviso!",
                    message: "O campo nome é obrigatório",
                    position: "topRight",
                    close: true
                })
                return;
            }

            const createCategoryObj = {
                name, description, active
            }

            const response = await api.post('/categories', createCategoryObj)

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
            const messages = error?.response?.data?.message || ["Erro ao cadastrar categoria"];

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
                    <div style={{ gridColumn: 'span 10' }} className={styles.fieldSeparator}>
                        <span>Nome</span>
                        <Input
                            value={name}
                            onChange={(v) => setName(v)}
                        />
                    </div>

                    <div style={{
                        gridColumn: 'span 2',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} className={styles.fieldSeparator}>
                        <span>Ativo</span>
                        <Toggle
                            defaultChecked
                            checked={active}
                            onChange={(v) => setActive(v)}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 12' }} className={styles.fieldSeparator}>
                        <span>Descrição</span>
                        <Input
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(v) => setDescription(v)}
                        />
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