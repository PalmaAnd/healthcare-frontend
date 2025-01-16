import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const weightData = [
  { date: '2023-01', weight: 70 },
  { date: '2023-02', weight: 71 },
  { date: '2023-03', weight: 69 },
  { date: '2023-04', weight: 68 },
  { date: '2023-05', weight: 67 },
  { date: '2023-06', weight: 66 },
];

const bloodPressureData = [
  { date: '2023-01', systolic: 120, diastolic: 80 },
  { date: '2023-02', systolic: 118, diastolic: 78 },
  { date: '2023-03', systolic: 122, diastolic: 82 },
  { date: '2023-04', systolic: 116, diastolic: 76 },
  { date: '2023-05', systolic: 120, diastolic: 80 },
  { date: '2023-06', systolic: 118, diastolic: 78 },
];

const exerciseData = [
  { day: 'Mon', minutes: 30 },
  { day: 'Tue', minutes: 45 },
  { day: 'Wed', minutes: 60 },
  { day: 'Thu', minutes: 30 },
  { day: 'Fri', minutes: 45 },
  { day: 'Sat', minutes: 90 },
  { day: 'Sun', minutes: 60 },
];

export function HealthAnalytics() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Weight Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            weight: {
              label: "Weight (kg)",
              color: "hsl(var(--chart-1))",
            },
          }} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="var(--color-weight)" name="Weight (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blood Pressure</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            systolic: {
              label: "Systolic",
              color: "hsl(var(--chart-1))",
            },
            diastolic: {
              label: "Diastolic",
              color: "hsl(var(--chart-2))",
            },
          }} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bloodPressureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="systolic" stroke="var(--color-systolic)" name="Systolic" />
                <Line type="monotone" dataKey="diastolic" stroke="var(--color-diastolic)" name="Diastolic" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Exercise</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            minutes: {
              label: "Minutes",
              color: "hsl(var(--chart-1))",
            },
          }} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={exerciseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="minutes" fill="var(--color-minutes)" name="Exercise (minutes)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

