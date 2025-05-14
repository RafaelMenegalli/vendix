import {
    Area,
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Button, Divider, HStack, Stat, StatGroup, VStack } from "rsuite";
import styles from "./styles.module.scss";

const data = [
    {
        name: 'Page A',
        uv: 590,
        pv: 800,
        amt: 1400,
    },
    {
        name: 'Page B',
        uv: 868,
        pv: 967,
        amt: 1506,
    },
    {
        name: 'Page C',
        uv: 1397,
        pv: 1098,
        amt: 989,
    },
    {
        name: 'Page D',
        uv: 1480,
        pv: 1200,
        amt: 1228,
    },
    {
        name: 'Page E',
        uv: 1520,
        pv: 1108,
        amt: 1100,
    },
    {
        name: 'Page F',
        uv: 1400,
        pv: 680,
        amt: 1700,
    },
];

export default function Dashboard() {
    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.actionBar}>
                    <Button
                        appearance='primary'
                        color='violet'
                    >
                        Gerar Relatório
                    </Button>

                    <Button
                        appearance='primary'
                        color='yellow'
                    >
                        Função 2
                    </Button>

                    <Button
                        appearance='primary'
                        color='cyan'
                    >
                        Função 3
                    </Button>
                </div>

                <Divider />

                <StatGroup className={styles.stats} spacing={16} columns={3}>
                    <Stat bordered style={{ width: '100%' }}>
                        <Stat.Label>Título Card</Stat.Label>
                        <Stat.Value
                            value={38050}
                            formatOptions={{
                                style: 'currency',
                                currency: 'BRL'
                            }}
                        />
                    </Stat>

                    <Stat bordered style={{ width: '100%' }}>
                        <Stat.Label>Título Card</Stat.Label>
                        <Stat.Value
                            value={38050}
                            formatOptions={{
                                style: 'currency',
                                currency: 'BRL'
                            }}
                        />
                    </Stat>

                    <Stat bordered>
                        <HStack spacing={16}>
                            {/* <Progress.Circle percent={50} width={50} strokeWidth={10} trailWidth={10} /> */}
                            <VStack>
                                <Stat.Label>Processing</Stat.Label>
                                <Stat.Value>1,200</Stat.Value>
                            </VStack>
                        </HStack>
                    </Stat>
                </StatGroup>

                <Divider>Gráficos</Divider>

                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <ComposedChart
                            width={500}
                            height={400}
                            data={data}
                        >
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis dataKey="name" scale="band" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}