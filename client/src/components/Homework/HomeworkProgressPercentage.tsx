import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import theme from '@/theme';
Chart.register(ArcElement);

interface HomeworkProgressPercentageProps {
    progressPercentage: number;
}

const HomeworkProgressPercentage = ({ progressPercentage }: HomeworkProgressPercentageProps) => {
    // Chart.js 데이터 설정
    const chartData = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                data: [progressPercentage, 100 - progressPercentage],
                backgroundColor: [theme.PRIMARY, theme.LIGHT_BLACK],
                hoverBackgroundColor: [theme.PRIMARY, theme.LIGHT_BLACK],
            },
        ],
    };

    const chartOptions = {
        plugins: {
            tooltip: {
                enabled: false,
            },
            legend: {
                display: false,
            },
        },
        cutout: '70%',
    };

    // 차트가 그려진 후 캔버스에 직접 텍스트를 그리는 함수
    const drawCenterText = (chart: Chart<'doughnut'>) => {
        const ctx = chart.ctx;
        const canvas = chart.canvas;
        const width = chart.width;
        const height = chart.height;

        ctx.save();

        // 텍스트 스타일 설정
        ctx.fillStyle = '#000000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 텍스트 그리기
        const text1 = '숙제 진행률';
        const text2 = `${chart.data.datasets[0].data[0]}%`;
        const textWidth = ctx.measureText(text1).width;
        ctx.fillText(text1, width / 2, height / 2 - 10);
        ctx.fillText(text2, width / 2, height / 2 + 10);

        ctx.restore();
    };

    return (
        <ChartContainer>
            <Doughnut
                data={chartData}
                options={chartOptions}
                plugins={[
                    {
                        id: 'center-text-plugin',
                        afterDraw: (chart: Chart<'doughnut'>) => {
                            drawCenterText(chart);
                        },
                    },
                ]}
            />
        </ChartContainer>
    );
};

const ChartContainer = styled.div`
    width: 100%;
    height: 160px;
    padding: 1.3em;
    margin-bottom: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export default HomeworkProgressPercentage;
