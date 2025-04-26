import EditIcon from '@rsuite/icons/Edit';
import PlusIcon from '@rsuite/icons/Plus';
import SearchIcon from '@rsuite/icons/Search';
import TrashIcon from '@rsuite/icons/Trash';
import { Divider, IconButton, Input, InputGroup, Table } from "rsuite";
import styles from "./styles.module.scss";
const { HeaderCell, Column, Cell } = Table;

const data = [
    { id: 1, name: "Ignite", description: "Um ótimo produto", price: 150.5, category: "Pod" },
    { id: 2, name: "VaporX", description: "Produto premium para vaporização", price: 200.0, category: "Pod" },
    { id: 3, name: "CloudMaster", description: "Gerador de nuvens densas", price: 180.75, category: "Pod" },
    { id: 4, name: "PulseMax", description: "Alta performance e durabilidade", price: 220.99, category: "Pod" },
    { id: 5, name: "BreezeMini", description: "Compacto e eficiente", price: 130.0, category: "Pod" },
    { id: 6, name: "StormPro", description: "Ideal para grandes sessões", price: 210.25, category: "Pod" },
    { id: 7, name: "FusionX", description: "Tecnologia de ponta no seu vapor", price: 240.0, category: "Pod" },
    { id: 8, name: "AeroLite", description: "Leve e potente", price: 175.5, category: "Pod" },
    { id: 9, name: "NebulaEdge", description: "Design moderno e desempenho", price: 195.8, category: "Pod" },
    { id: 10, name: "QuantumAir", description: "Experiência superior", price: 260.0, category: "Pod" },
    { id: 11, name: "Ignite", description: "Um ótimo produto", price: 150.5, category: "Pod" },
    { id: 12, name: "VaporX", description: "Produto premium para vaporização", price: 200.0, category: "Pod" },
    { id: 13, name: "CloudMaster", description: "Gerador de nuvens densas", price: 180.75, category: "Pod" },
    { id: 14, name: "PulseMax", description: "Alta performance e durabilidade", price: 220.99, category: "Pod" },
    { id: 15, name: "BreezeMini", description: "Compacto e eficiente", price: 130.0, category: "Pod" },
    { id: 16, name: "StormPro", description: "Ideal para grandes sessões", price: 210.25, category: "Pod" },
    { id: 17, name: "FusionX", description: "Tecnologia de ponta no seu vapor", price: 240.0, category: "Pod" },
    { id: 18, name: "AeroLite", description: "Leve e potente", price: 175.5, category: "Pod" },
    { id: 19, name: "NebulaEdge", description: "Design moderno e desempenho", price: 195.8, category: "Pod" },
    { id: 20, name: "QuantumAir", description: "Experiência superior", price: 260.0, category: "Pod" },
];


export default function Products() {
    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.actionBar}>
                    <InputGroup>
                        <Input
                            placeholder='Pesquise por qualquer coisa...'
                        />
                        <InputGroup.Button>
                            <SearchIcon />
                        </InputGroup.Button>
                    </InputGroup>
                    <IconButton icon={<PlusIcon />} appearance="primary" color="green"></IconButton>
                </div>

                <Divider>Todos os Produtos</Divider>

                <div className={styles.table}>
                    <div className={styles.table}>
                        <Table
                            height={450}
                            data={data}
                            hover
                            showHeader
                            bordered
                            cellBordered
                        >
                            <Column width={70} align="center" fixed>
                                <HeaderCell>ID</HeaderCell>
                                <Cell dataKey="id" />
                            </Column>

                            <Column flexGrow={1}>
                                <HeaderCell>Nome</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>

                            <Column flexGrow={2}>
                                <HeaderCell>Descrição</HeaderCell>
                                <Cell dataKey="description" />
                            </Column>

                            <Column width={100} align="center">
                                <HeaderCell>Preço</HeaderCell>
                                <Cell dataKey="price" />
                            </Column>

                            <Column flexGrow={1}>
                                <HeaderCell>Categoria</HeaderCell>
                                <Cell dataKey="category" />
                            </Column>

                            <Column flexGrow={1}>
                                <HeaderCell>Ações</HeaderCell>
                                <Cell style={{ display: "flex", alignItems: "center" }}>
                                    {(rowData) => (
                                        <div className={styles.actionTableCell}>
                                            <IconButton
                                                icon={<EditIcon />}
                                                size="sm"
                                                appearance="primary"
                                            // onClick={() => handleEdit(rowData)}
                                            />
                                            <IconButton
                                                icon={<TrashIcon />}
                                                size="sm"
                                                color="red"
                                                appearance="subtle"
                                            // onClick={() => handleDelete(rowData)}
                                            />
                                        </div>
                                    )}
                                </Cell>
                            </Column>

                        </Table>
                    </div>

                </div>
            </div>
        </>
    )
}