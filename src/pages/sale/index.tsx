import { Divider, IconButton, List } from "rsuite";
import styles from "./styles.module.scss";
import TagAuthorizeIcon from '@rsuite/icons/TagAuthorize';
import { AddSaleModal } from "@/components/AddSaleModal";
import { useState } from "react";

export default function Sale() {
    const [isAddSaleModalVisible, setIsAddSaleModalVisible] = useState<boolean>(false);

    const handleOpenAddSaleModal = () => {
        setIsAddSaleModalVisible(true)
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.actionBar}>
                    <div></div>
                    <IconButton
                        icon={<TagAuthorizeIcon />}
                        appearance="primary"
                        color="cyan"
                        onClick={handleOpenAddSaleModal}
                    >
                        Lançar Venda
                    </IconButton>
                </div>

                <Divider>Últimas Vendas</Divider>

                <div className={styles.saleTable}>
                    <List bordered>
                        <List.Item>Categoria - Produto - Preço, (Data)</List.Item>
                        <List.Item>Categoria - Produto - Preço, (Data)</List.Item>
                        <List.Item>Categoria - Produto - Preço, (Data)</List.Item>
                        <List.Item>Categoria - Produto - Preço, (Data)</List.Item>
                        <List.Item>Categoria - Produto - Preço, (Data)</List.Item>
                        <List.Item>Categoria - Produto - Preço, (Data)</List.Item>
                        <List.Item>Categoria - Produto - Preço, (Data)</List.Item>
                        <List.Item>Categoria - Produto - Preço, (Data)</List.Item>
                        <List.Item>Categoria - Produto - Preço, (Data)</List.Item>
                        <List.Item>Categoria - Produto - Preço, (Data)</List.Item>
                        <List.Item>Categoria - Produto - Preço, (Data)</List.Item>
                    </List>
                </div>
            </div>

            <AddSaleModal
                open={isAddSaleModalVisible}
                setOpen={setIsAddSaleModalVisible}
            />
        </>
    )
}