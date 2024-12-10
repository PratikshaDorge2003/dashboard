
import { Line, Bar, Pie } from 'react-chartjs-2';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from './store';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Alert, Box } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);


interface MockData {
    months: string[];
    registrations: number[];
    activeUsers: number;
    inactiveUsers: number;
    regions: string[];
    regionDistribution: number[];
}

const Chart: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.data);
    const delCount = useSelector((state: RootState) => state.user.delCount);
    const mockData: MockData = {
        months: ['June', 'July', 'August', 'September', 'October', 'November'],
        registrations: [50, 75, 100, 125, 150, 200],
        activeUsers: 300,
        inactiveUsers: 100,
        regions: ['North', 'South', 'East', 'West'],
        regionDistribution: [100, 150, 120, 80],
    };

    const lineChartData = {
        labels: mockData.months,
        datasets: [
            {
                label: 'User Registrations',
                data: mockData.registrations,
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const pieChartData = {
        labels: ['Active Users', 'Inactive Users'],
        datasets: [
            {
                data: [mockData.activeUsers, mockData.inactiveUsers],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    const barChartData = {
        labels: mockData.regions,
        datasets: [
            {
                label: 'Users',
                data: mockData.regionDistribution,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    return (
        <div>
            <div className="centerized">
                <h2>User Analytics DashBoard</h2>
            </div>

            <Alert severity="info" sx={{ mb: 1 }}>
                Total Users {user?.length || 0}
            </Alert>
            <Alert severity="error" sx={{ mb: 1 }}>
                Total Deleted Users {delCount}
            </Alert>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 2,
                    mt: 4,
                }}
                noValidate
                autoComplete="off"
            >
                <Card
                    sx={{
                        width: 300,
                        height: 350,
                        boxShadow:
                            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    }}
                >
                    <CardContent>
                        <div style={{ height: '300px', width: '100%' }}>
                            <Line data={lineChartData} options={chartOptions} />
                        </div>
                        <Typography gutterBottom component="div">
                            User Registrations in Last 6 Months
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    sx={{
                        width: 300,
                        height: 350,
                        boxShadow:
                            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    }}
                >
                    <CardContent>
                        <div style={{ height: '300px', width: '100%' }}>
                            <Pie data={pieChartData} options={chartOptions} />
                        </div>
                        <Typography gutterBottom component="div">
                            Active vs. Inactive Users
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    sx={{
                        width: 300,
                        height: 350,
                        boxShadow:
                            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    }}
                >
                    <CardContent>
                        <div style={{ height: '300px', width: '100%' }}>
                            <Bar data={barChartData} options={chartOptions} />
                        </div>
                        <Typography gutterBottom component="div">
                            User Distribution by Regions
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

export default Chart;
