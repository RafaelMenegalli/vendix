import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import { Divider, IconButton, InputNumber, Panel, SelectPicker, Table } from "rsuite";
import styles from "./styles.module.scss";

const { Column, HeaderCell, Cell } = Table;

const data = [
    { id: 1, category: "Vape", product: "V250 Ignite", quantity: 50 },
    { id: 2, category: "Pod", product: "P200 Bold", quantity: 30 },
    { id: 3, category: "Vape", product: "V500 Classic", quantity: 45 },
    { id: 4, category: "Pod", product: "P100 Smooth", quantity: 25 },
    { id: 5, category: "Vape", product: "V300 Turbo", quantity: 60 },
    { id: 6, category: "Pod", product: "P400 Mint", quantity: 20 },
    { id: 7, category: "Vape", product: "V150 Chill", quantity: 15 },
    { id: 8, category: "Pod", product: "P300 Fresh", quantity: 10 },
    { id: 9, category: "Vape", product: "V600 Max", quantity: 70 },
    { id: 10, category: "Pod", product: "P250 Cool", quantity: 40 }
];

export default function Stock() {
    return (
        <>
            <div className={styles.mainContainer}>
                <Panel header="Lançamento de Estoque" bordered>
                    <div className={styles.actionBar}>
                        <div className={styles.fieldSeparator}>
                            <span>Categoria</span>
                            <SelectPicker
                                data={[]}
                                placeholder="Categoria para filtro..."
                            />
                        </div>

                        <div className={styles.fieldSeparator}>
                            <span>Produto</span>
                            <SelectPicker
                                data={[]}
                                placeholder="Produto para adicionar estoque..."
                            />
                        </div>

                        <div className={styles.fieldSeparator} style={{ width: 250 }}>
                            <span>Quantidade</span>
                            <InputNumber
                                placeholder="Qtd."
                            />
                        </div>

                        <div>
                            <span>ㅤ</span>
                            <IconButton
                                icon={< PlusIcon />}
                                appearance='primary'
                                color="green"
                            ></IconButton>
                        </div>

                        <div>
                            <span>ㅤ</span>
                            <IconButton
                                icon={< MinusIcon />}
                                appearance='primary'
                                color="red"
                            ></IconButton>
                        </div>
                    </div>
                </Panel>

                <Divider></Divider>

                <div className={styles.tableLogs}>
                    <Table height={400} data={data}>
                        <Column width={60} align="center" fixed>
                            <HeaderCell>ID</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>

                        <Column flexGrow={1}>
                            <HeaderCell>Categoria</HeaderCell>
                            <Cell dataKey="category" />
                        </Column>

                        <Column flexGrow={2}>
                            <HeaderCell>Produto</HeaderCell>
                            <Cell dataKey="product" />
                        </Column>

                        <Column width={100} align="center">
                            <HeaderCell>Quantidade</HeaderCell>
                            <Cell dataKey="quantity" />
                        </Column>
                    </Table>
                </div>
            </div>
        </>
    )
}