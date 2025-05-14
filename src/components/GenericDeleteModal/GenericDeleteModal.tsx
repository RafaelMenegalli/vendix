import styles from "./styles.module.scss";
import { Modal, ButtonToolbar, Button, FlexboxGrid } from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';

interface GenericDeleteModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    text: string;
    confirmDelete: () => void;
    loading: boolean;
}

export function GenericDeleteModal({ open, setOpen, text, confirmDelete, loading }: GenericDeleteModalProps) {
    const handleClose = () => setOpen(false);

    return (
        <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
            <Modal.Body className={styles.modalBody}>
                <FlexboxGrid align="middle">
                    <FlexboxGrid.Item colspan={3}>
                        <RemindIcon style={{ color: '#ff4d4f', fontSize: 28 }} />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={21}>
                        <p className={styles.modalTitle}>Tem certeza que deseja excluir?</p>
                        <p className={styles.modalText}>{text}</p>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={confirmDelete} appearance="primary" color="red" loading={loading}>
                    Sim, excluir
                </Button>
                <Button onClick={handleClose} appearance="ghost">
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
