import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import { useRouter } from "next/router";
import { Button, Divider, IconButton, Input, InputNumber, SelectPicker, Toggle, Uploader } from "rsuite";
import styles from "./styles.module.scss";

export default function ProductsAdd() {
    const router = useRouter();

    const handleBackPage = () => {
        router.push("/products")
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
                    <div style={{ gridColumn: 'span 5' }} className={styles.fieldSeparator}>
                        <span>Nome</span>
                        <Input />
                    </div>

                    <div style={{ gridColumn: 'span 4' }} className={styles.fieldSeparator}>
                        <span>Categoria</span>
                        <SelectPicker
                            data={[
                                { value: 1, label: "Pod" },
                                { value: 2, label: "Vape" },
                            ]}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 2' }} className={styles.fieldSeparator}>
                        <span>Preço</span>
                        <InputNumber prefix="R$" />
                    </div>

                    <div style={{ gridColumn: 'span 1' }} className={styles.fieldSeparator}>
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

                    <div style={{ gridColumn: 'span 12' }} className={styles.fieldSeparator}>
                        <span>Foto</span>
                        <Uploader action="//jsonplaceholder.typicode.com/posts/" draggable>
                            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span>Clique ou arraste uma foto para esta área!</span>
                            </div>
                        </Uploader>
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