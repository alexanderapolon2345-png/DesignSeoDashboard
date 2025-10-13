import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Legend as RechartsLegend } from 'recharts';
import { RootState } from "@/store";

import {
    LineChartIcon,
    BarChartIcon,
    Target,
    Pointer,
    TrendingUp,
    TrendingDown,
    Search,
    Filter,
    Download
} from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";


const KeywordReportPage = () => {
    // Sample Data for Keyword Metrics
    const keywordData = [
        { keyword: "Keyword 1", searchVolume: 10000, ctr: 2.3, avgPosition: 5, impressions: 15000 },
        { keyword: "Keyword 2", searchVolume: 5000, ctr: 3.1, avgPosition: 8, impressions: 10000 },
        { keyword: "Keyword 3", searchVolume: 20000, ctr: 1.7, avgPosition: 3, impressions: 25000 },
        { keyword: "Keyword 4", searchVolume: 15000, ctr: 2.9, avgPosition: 6, impressions: 18000 },
        { keyword: "Keyword 5", searchVolume: 12000, ctr: 2.0, avgPosition: 7, impressions: 13000 },
    ];

    // Chart Data for Keyword Performance
    const ctrData = [
        { name: "Keyword 1", ctr: 2.3 },
        { name: "Keyword 2", ctr: 3.1 },
        { name: "Keyword 3", ctr: 1.7 },
        { name: "Keyword 4", ctr: 2.9 },
        { name: "Keyword 5", ctr: 2.0 },
    ];

    const avgPositionData = [
        { name: "Keyword 1", avgPosition: 5 },
        { name: "Keyword 2", avgPosition: 8 },
        { name: "Keyword 3", avgPosition: 3 },
        { name: "Keyword 4", avgPosition: 6 },
        { name: "Keyword 5", avgPosition: 7 },
    ];

    const impressionsData = [
        { name: "Keyword 1", impressions: 15000 },
        { name: "Keyword 2", impressions: 10000 },
        { name: "Keyword 3", impressions: 25000 },
        { name: "Keyword 4", impressions: 18000 },
        { name: "Keyword 5", impressions: 13000 },
    ];

    const [filteredData, setFilteredData] = useState(keywordData);
    const [searchTerm, setSearchTerm] = useState("");

    // Handle search functionality
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value === "") {
            setFilteredData(keywordData);
        } else {
            setFilteredData(
                keywordData.filter((data) =>
                    data.keyword.toLowerCase().includes(value.toLowerCase())
                )
            );
        }
    };

    return (
        <div className="p-8">
            {/* Keyword Search and Filter */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Search for keywords..."
                            className="w-full p-3 rounded-xl border border-gray-200 shadow-sm"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Search className="absolute top-3 right-3 text-gray-400" />
                    </div>
                    <button className="flex items-center space-x-2 text-gray-600">
                        <Filter className="text-gray-500" />
                        <span>Filters</span>
                    </button>
                </div>
            </div>

            {/* Keyword Performance Charts (2x2 grid) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                {/* CTR Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Click-Through Rate (CTR)</p>
                        </div>
                        <LineChartIcon className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="mt-4 w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={ctrData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="ctr" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Avg. Position Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Average Position</p>
                        </div>
                        <BarChartIcon className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="mt-4 w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={avgPositionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="avgPosition" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Impressions Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Impressions</p>
                        </div>
                        <BarChartIcon className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="mt-4 w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={impressionsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="impressions" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Keyword Table */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Keyword Report Table</p>
                        </div>
                    </div>
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">Keyword</th>
                                    <th className="px-4 py-2 text-left">Search Volume</th>
                                    <th className="px-4 py-2 text-left">CTR</th>
                                    <th className="px-4 py-2 text-left">Avg. Position</th>
                                    <th className="px-4 py-2 text-left">Impressions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((data) => (
                                    <tr key={data.keyword} className="border-b">
                                        <td className="px-4 py-2">{data.keyword}</td>
                                        <td className="px-4 py-2">{data.searchVolume}</td>
                                        <td className="px-4 py-2">{data.ctr}%</td>
                                        <td className="px-4 py-2">{data.avgPosition}</td>
                                        <td className="px-4 py-2">{data.impressions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Backlink Report Page Component
const BacklinkReportPage = () => {
    // Sample Data for Backlink Metrics
    const backlinkData = [
        { month: "Jan", backlinks: 250, referringDomains: 50, follow: 80, noFollow: 20 },
        { month: "Feb", backlinks: 300, referringDomains: 55, follow: 85, noFollow: 15 },
        { month: "Mar", backlinks: 350, referringDomains: 60, follow: 90, noFollow: 10 },
        { month: "Apr", backlinks: 400, referringDomains: 65, follow: 95, noFollow: 5 },
        { month: "May", backlinks: 450, referringDomains: 70, follow: 100, noFollow: 0 },
    ];

    // Data for Growth Metrics
    const backlinkGrowthData = [
        { month: "Jan", backlinks: 250 },
        { month: "Feb", backlinks: 300 },
        { month: "Mar", backlinks: 350 },
        { month: "Apr", backlinks: 400 },
        { month: "May", backlinks: 450 },
    ];

    const referringDomainsData = [
        { month: "Jan", referringDomains: 50 },
        { month: "Feb", referringDomains: 55 },
        { month: "Mar", referringDomains: 60 },
        { month: "Apr", referringDomains: 65 },
        { month: "May", referringDomains: 70 },
    ];

    const [filteredData, setFilteredData] = useState(backlinkData);
    const [searchTerm, setSearchTerm] = useState("");

    // Handle search functionality
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value === "") {
            setFilteredData(backlinkData);
        } else {
            setFilteredData(
                backlinkData.filter((data) =>
                    data.month.toLowerCase().includes(value.toLowerCase())
                )
            );
        }
    };

    return (
        <div className="p-8">
            {/* Search and Filters Section */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Search by month..."
                            className="w-full p-3 rounded-xl border border-gray-200 shadow-sm"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Search className="absolute top-3 right-3 text-gray-400" />
                    </div>
                    <button className="flex items-center space-x-2 text-gray-600">
                        <Filter className="text-gray-500" />
                        <span>Filters</span>
                    </button>
                </div>
            </div>

            {/* Backlink Performance Charts (2x2 grid) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                {/* Backlink Growth Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Backlink Growth</p>
                        </div>
                        <BarChartIcon className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="mt-4 w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={backlinkGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="backlinks" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Referring Domains Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Referring Domains</p>
                        </div>
                        <BarChartIcon className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="mt-4 w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={referringDomainsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="referringDomains" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Follow/NoFollow Ratio Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Follow vs NoFollow</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="mt-4 w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={backlinkData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="follow"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                    activeDot={{ r: 8 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="noFollow"
                                    stroke="#82ca9d"
                                    strokeWidth={2}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Backlink Table */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Backlink Report Table</p>
                        </div>
                    </div>
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">Month</th>
                                    <th className="px-4 py-2 text-left">Total Backlinks</th>
                                    <th className="px-4 py-2 text-left">Referring Domains</th>
                                    <th className="px-4 py-2 text-left">Follow (%)</th>
                                    <th className="px-4 py-2 text-left">NoFollow (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((data) => (
                                    <tr key={data.month} className="border-b">
                                        <td className="px-4 py-2">{data.month}</td>
                                        <td className="px-4 py-2">{data.backlinks}</td>
                                        <td className="px-4 py-2">{data.referringDomains}</td>
                                        <td className="px-4 py-2">{data.follow}%</td>
                                        <td className="px-4 py-2">{data.noFollow}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReportPage = () => {
    const dispatch = useDispatch();
    const [dateRange, setDateRange] = useState("30");

    // Sample Data for Existing Metrics
    const sessionData = [
        { name: 'Jan', sessions: 4000 },
        { name: 'Feb', sessions: 3000 },
        { name: 'Mar', sessions: 2000 },
        { name: 'Apr', sessions: 2780 },
        { name: 'May', sessions: 1890 },
        { name: 'Jun', sessions: 2390 },
        { name: 'Jul', sessions: 3490 },
    ];

    const conversationData = [
        { name: 'Jan', conversations: 2000 },
        { name: 'Feb', conversations: 1500 },
        { name: 'Mar', conversations: 1200 },
        { name: 'Apr', conversations: 1500 },
        { name: 'May', conversations: 1000 },
        { name: 'Jun', conversations: 1300 },
        { name: 'Jul', conversations: 1800 },
    ];

    const avgSessionData = [
        { name: 'Jan', avgSession: 3.5 },
        { name: 'Feb', avgSession: 4.2 },
        { name: 'Mar', avgSession: 3.8 },
        { name: 'Apr', avgSession: 4.0 },
        { name: 'May', avgSession: 4.5 },
        { name: 'Jun', avgSession: 4.1 },
        { name: 'Jul', avgSession: 4.3 },
    ];

    const bounceRateData = [
        { name: 'Jan', bounceRate: 35 },
        { name: 'Feb', bounceRate: 30 },
        { name: 'Mar', bounceRate: 40 },
        { name: 'Apr', bounceRate: 32 },
        { name: 'May', bounceRate: 28 },
        { name: 'Jun', bounceRate: 34 },
        { name: 'Jul', bounceRate: 29 },
    ];

    // Sample Data for New Metrics (Clicks, Impressions, CTR, Position)
    const totalClicksData = [
        { name: 'Jan', clicks: 4500 },
        { name: 'Feb', clicks: 3800 },
        { name: 'Mar', clicks: 3400 },
        { name: 'Apr', clicks: 4200 },
        { name: 'May', clicks: 4900 },
        { name: 'Jun', clicks: 4800 },
        { name: 'Jul', clicks: 5200 },
    ];

    const totalImpressionsData = [
        { name: 'Jan', impressions: 15000 },
        { name: 'Feb', impressions: 14500 },
        { name: 'Mar', impressions: 14000 },
        { name: 'Apr', impressions: 15500 },
        { name: 'May', impressions: 16000 },
        { name: 'Jun', impressions: 16500 },
        { name: 'Jul', impressions: 17000 },
    ];

    const avgCTRData = [
        { name: 'Jan', ctr: 3.2 },
        { name: 'Feb', ctr: 2.8 },
        { name: 'Mar', ctr: 3.0 },
        { name: 'Apr', ctr: 3.5 },
        { name: 'May', ctr: 3.8 },
        { name: 'Jun', ctr: 3.4 },
        { name: 'Jul', ctr: 3.1 },
    ];

    const avgPositionData = [
        { name: 'Jan', position: 12.5 },
        { name: 'Feb', position: 13.0 },
        { name: 'Mar', position: 11.8 },
        { name: 'Apr', position: 12.2 },
        { name: 'May', position: 11.5 },
        { name: 'Jun', position: 11.9 },
        { name: 'Jul', position: 12.0 },
    ];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Report</h1>
                    <p className="text-gray-600 mt-2">
                        Monitor the report changes over time
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 90 days</option>
                    </select>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {/* Report */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Sessions</p>
                            <p className="text-2xl font-bold text-gray-900">
                                68,420
                            </p>
                        </div>
                        <BarChartIcon className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">
                            +15.3% from last month
                        </span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Users</p>
                            <p className="text-2xl font-bold text-gray-900">
                                51,903
                            </p>
                        </div>
                        <LineChartIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                        <TrendingDown className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-600">
                            -15.3% from last month
                        </span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg. Position</p>
                            <p className="text-2xl font-bold text-gray-900">
                                #12.1
                            </p>
                        </div>
                        <Target className="h-8 w-8 text-blue-400" />
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">
                            +10.1% from last month
                        </span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Organic Clicks</p>
                            <p className="text-2xl font-bold text-gray-900">
                                24,308
                            </p>
                        </div>
                        <Pointer className="h-8 w-8 text-orange-400" />
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">
                            2.4% from last month
                        </span>
                    </div>
                </div>
            </div>

            {/* 2x2 grid for the first 4 charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                {/* Sessions Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Sessions</p>
                            <p className="text-2xl font-bold text-gray-900">68,420</p>
                        </div>
                    </div>
                    <div className="mt-4 w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sessionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sessions" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Conversations Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Conversations</p>
                            <p className="text-2xl font-bold text-gray-900">3,420</p>
                        </div>
                    </div>
                    <div className="mt-4 w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={conversationData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="conversations" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Average Session Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg. Session</p>
                            <p className="text-2xl font-bold text-gray-900">4.2 min</p>
                        </div>
                    </div>
                    <div className="mt-4 w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={avgSessionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="avgSession" stroke="#ff7300" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bounce Rate Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                            <p className="text-2xl font-bold text-gray-900">32%</p>
                        </div>
                    </div>
                    <div className="mt-4 w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={bounceRateData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="bounceRate" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            {/* 2x2 grid for the next 4 charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                {/* Total Clicks Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                            <p className="text-2xl font-bold text-gray-900">4,500</p>
                        </div>
                    </div>
                    <div className="mt-4 w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={totalClicksData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="clicks" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Total Impressions Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Impressions</p>
                            <p className="text-2xl font-bold text-gray-900">15,000</p>
                        </div>
                    </div>
                    <div className="mt-4 w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={totalImpressionsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="impressions" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Average CTR Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg. CTR</p>
                            <p className="text-2xl font-bold text-gray-900">3.2%</p>
                        </div>
                    </div>
                    <div className="mt-4 w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={avgCTRData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="ctr" stroke="#ff7300" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Average Position Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg. Position</p>
                            <p className="text-2xl font-bold text-gray-900">12.5</p>
                        </div>
                    </div>
                    <div className="mt-4 w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={avgPositionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="position" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <KeywordReportPage />
            <BacklinkReportPage />
        </div>
    );
};

export default ReportPage;
