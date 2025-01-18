import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Activity, Heart, Weight, Moon } from 'lucide-react-native';

// Get screen width for responsive design
const screenWidth = Dimensions.get('window').width;

const MetricCard = ({ title, value, subtitle, icon: Icon, iconColor }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Icon size={20} color={iconColor} />
        </View>
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
);

const HealthInsightsDashboard = () => {
    // Fake data for demonstrations
    const sleepData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            data: [7.5, 6.8, 8.2, 7.1, 7.9, 8.5, 7.4]
        }]
    };

    const activityData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            data: [45000, 52000, 49000, 58000]
        }]
    };

    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(0, 100, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Metrics Grid */}
            <View style={styles.metricsGrid}>
                <MetricCard
                    title="Average Sleep"
                    value="7.6hrs"
                    subtitle="+4% from last week"
                    icon={Moon}
                    iconColor="#4169E1"
                />
                <MetricCard
                    title="Blood Pressure"
                    value="119/79"
                    subtitle="Last measured today"
                    icon={Heart}
                    iconColor="#FF4444"
                />
                <MetricCard
                    title="Weekly Steps"
                    value="58,000"
                    subtitle="+12% from last week"
                    icon={Activity}
                    iconColor="#32CD32"
                />
                <MetricCard
                    title="Weight"
                    value="68.8 kg"
                    subtitle="-1.2 kg this month"
                    icon={Weight}
                    iconColor="#8A2BE2"
                />
            </View>

            {/* Charts */}
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Sleep Pattern</Text>
                <LineChart
                    data={sleepData}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chart}
                />
            </View>

            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Weekly Activity</Text>
                <BarChart
                    data={activityData}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={chartConfig}
                    style={styles.chart}
                    verticalLabelRotation={30}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        width: (screenWidth - 48) / 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    cardValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#999',
    },
    chartContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    chart: {
        borderRadius: 12,
        marginVertical: 8,
    },
});

export default HealthInsightsDashboard;