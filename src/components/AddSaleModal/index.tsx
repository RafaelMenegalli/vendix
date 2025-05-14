import { Button, CheckTreePicker, DatePicker, Modal, SelectPicker } from "rsuite";
import styles from "./styles.module.scss";

const data = [
    { value: 1, label: "Ignite V250" },
    { value: 2, label: "Elfbar GH" },
    { value: 3, label: "Ice King" },
    { value: 4, label: "Pod King X" },
    { value: 5, label: "Vaporesso Luxe" },
    { value: 6, label: "Juul Classic" },
    { value: 7, label: "Bang XXL" },
    { value: 8, label: "Zomo Pod" },
    { value: 9, label: "VGod Stig" },
    { value: 10, label: "Maskking High" },
];

interface AddSaleModal {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export function AddSaleModal({ open, setOpen }: AddSaleModal) {
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Modal open={open} onClose={handleClose} size="lg">
                <Modal.Header>
                    <Modal.Title>Lançamento de Venda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.form}>
                        <div className={styles.formDivider}>
                            <span>Produtos Vendidos</span>
                            <CheckTreePicker
                                data={data}
                                style={{
                                    width: 475
                                }}
                            />
                        </div>

                        <div className={styles.formDivider}>
                            <span>Forma de Pagamento</span>
                            <SelectPicker
                                data={[
                                    { value: 1, label: "Pix" },
                                    { value: 2, label: "Cartão" },
                                    { value: 3, label: "Boleto" },
                                ]}
                            />
                        </div>

                        <div className={styles.formDivider}>
                            <span>Data</span>
                            <DatePicker
                                oneTap
                                placeholder="DD/MM/YYYY"
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="primary" color="green">
                        Lançar
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}