import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import { useRouter } from "next/router";
import { Button, Divider, IconButton, Input, InputNumber, SelectPicker, Toggle, Uploader } from "rsuite";
import styles from "./styles.module.scss";

export default function CategoriesAdd() {
    const router = useRouter();

    const handleBackPage = () => {
        router.push("/categories")
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
                        <Input />
                    </div>

                    <div style={{
                        gridColumn: 'span 2',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} className={styles.fieldSeparator}>
                        <span>Ativo</span>
                        <Toggle defaultChecked />
                    </div>

                    <div style={{ gridColumn: 'span 12' }} className={styles.fieldSeparator}>
                        <span>Descrição</span>
                        <Input
                            as="textarea"
                            rows={3}
                            placeholder="Textarea"
                        />
                    </div>
                </div>

                <div className={styles.footer}>
                    <Button
                        appearance="primary"
                        color="green"
                    >
                        Cadastrar
                    </Button>
                </div>
            </div>
        </>
    )
}