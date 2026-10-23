// ==========================================================================
// Sidebar & Mobile Offcanvas Drawer Controller
// ==========================================================================
const menuToggleBtn = document.getElementById('menu-toggle');
const sidebarWrapper = document.getElementById('sidebar-wrapper');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
const wrapperElem = document.getElementById('wrapper');

function openSidebar() {
    if (wrapperElem) wrapperElem.classList.add('toggled');
    document.body.classList.add('sidebar-open');
}

function closeSidebar() {
    if (wrapperElem) wrapperElem.classList.remove('toggled');
    document.body.classList.remove('sidebar-open');
}

function toggleSidebar(e) {
    if (e) e.preventDefault();
    if (wrapperElem && wrapperElem.classList.contains('toggled')) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

if (menuToggleBtn) menuToggleBtn.addEventListener('click', toggleSidebar);
if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

// Close sidebar on ESC key or navigation on mobile
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

if (sidebarWrapper) {
    sidebarWrapper.querySelectorAll('a.list-group-item').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                closeSidebar();
            }
        });
    });
}

// Visitors Dropdown Controller
const visitorsDropdown = document.getElementById('visitorsDropdown');
const visitorsToggle = document.getElementById('visitorsToggle');

if (visitorsToggle && visitorsDropdown) {
    visitorsToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        visitorsDropdown.classList.toggle('open');
        const isOpen = visitorsDropdown.classList.contains('open');
        visitorsToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    const submenuLinks = visitorsDropdown.querySelectorAll('.sidebar-submenu-link');
    submenuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            submenuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            if (window.innerWidth < 992) {
                closeSidebar();
            }
        });
    });
}


// Common Chart.js Options for modern look
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#a3aed1';
Chart.defaults.scale.grid.color = 'rgba(0,0,0,0.03)';
Chart.defaults.scale.grid.borderColor = 'transparent';

// 1. Overall Business Achieved (Modern Smooth Line Chart)
const ctxBusiness = document.getElementById('businessChart').getContext('2d');

new Chart(ctxBusiness, {
    type: 'line',
    data: {
        labels: ['Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'May 26', 'Jun 26', 'Jul 26', 'Aug 26', 'Sep 26', 'Oct 26', 'Nov 26', 'Dec 26'],
        datasets: [
            {
                label: 'Previous Trend',
                data: [500000, 1200000, 800000, 2500000, 3000000, 2000000, 6000000, 4500000, 3500000, 2000000, 1000000, 3000000],
                borderColor: '#c4161c54', // Faint red trend
                borderWidth: 2,
                borderDash: [6, 6], // Dashed line
                fill: false,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 0
            },
            {
                label: 'Overall Business',
                data: [0, 0, 0, 0, 0, 0, 12351001, 0, 0, 0, 0, 0],
                borderColor: '#c4161c', // Brand red
                borderWidth: 3,
                fill: false,
                tension: 0.4, // Smooth curve
                pointRadius: 0, // Hide points until hover
                pointHoverRadius: 6,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#c4161c',
                pointBorderWidth: 3,
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#c4161c',
                pointHoverBorderWidth: 4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#c4161c', // Red tooltip matching line
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                padding: 10,
                cornerRadius: 20, // Very rounded pill shape
                displayColors: false,
                yAlign: 'bottom', // Point down
                boxPadding: 4,
                callbacks: {
                    label: function (context) {
                        return '₹' + context.raw.toLocaleString('en-IN');
                    }
                },
                filter: function (tooltipItem) {
                    return tooltipItem.datasetIndex === 1; // Only show tooltip for main line
                }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                grid: { display: false },
                border: { display: false },
                ticks: { font: { family: "'Inter', sans-serif" }, color: '#a3aed1' }
            },
            y: {
                display: true,
                beginAtZero: true,
                max: 14000000,
                grid: {
                    color: 'rgba(0,0,0,0.04)', // Faint grid lines
                    drawBorder: false
                },
                border: { display: false },
                ticks: {
                    color: '#a3aed1',
                    callback: function (value) {
                        if (value === 0) return '0';
                        if (value >= 10000000) {
                            return (value / 10000000).toFixed(1).replace(/\.0$/, '') + ' Cr';
                        } else if (value >= 100000) {
                            return (value / 100000).toFixed(1).replace(/\.0$/, '') + ' L';
                        }
                        return value.toLocaleString('en-IN');
                    }
                }
            }
        }
    }
});


// 2. Attendance Overview (Modern Pill Bar Chart)
const ctxAttendance = document.getElementById('attendanceChart').getContext('2d');
new Chart(ctxAttendance, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Visitors',
                data: [120, 160, 230, 100, 100, 180, 330, 130, 20, 0, 0, 0],
                backgroundColor: '#198754',
                borderRadius: 50,
                borderSkipped: false,
                barPercentage: 0.7
            },
            {
                label: '121s',
                data: [1270, 1760, 2720, 2000, 1830, 2450, 4300, 1080, 0, 0, 0, 0],
                backgroundColor: '#0c3c7c',
                borderRadius: 50,
                borderSkipped: false,
                barPercentage: 0.7
            },
            {
                label: 'RFLs',
                data: [1010, 1620, 3030, 3090, 2920, 3650, 4850, 1640, 0, 0, 0, 0],
                backgroundColor: '#ffc107',
                borderRadius: 50,
                borderSkipped: false,
                barPercentage: 0.7
            },
            {
                label: 'TYNs',
                data: [500, 1100, 2100, 2000, 2090, 2650, 3330, 1180, 0, 0, 0, 0],
                backgroundColor: '#dc3545',
                borderRadius: 50,
                borderSkipped: false,
                barPercentage: 0.7
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0c0a20',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                padding: 12,
                cornerRadius: 16, // Pill shaped tooltip
                displayColors: true,
                usePointStyle: true,
                boxPadding: 6,
                callbacks: {
                    label: function (context) {
                        return context.dataset.label + ': ' + context.raw.toLocaleString();
                    }
                }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                stacked: false,
                grid: {
                    display: true,
                    color: 'rgba(0,0,0,0.04)',
                    drawBorder: false
                },
                border: { display: false },
                ticks: { font: { family: "'Inter', sans-serif" }, color: '#a3aed1' }
            },
            y: {
                display: true,
                beginAtZero: true,
                grid: {
                    display: true,
                    color: 'rgba(0,0,0,0.04)',
                    drawBorder: false
                },
                border: { display: false },
                ticks: {
                    color: '#a3aed1',
                    callback: function (value) {
                        return value.toLocaleString();
                    }
                }
            }
        },
        animation: {
            y: {
                duration: 1500, // Smooth data animation
                easing: 'easeOutQuart'
            }
        }
    }
});

// 3. Income vs Expense (Modern Overlapping Line Chart)
const ctxIncomeExpense = document.getElementById('incomeExpenseChart').getContext('2d');
new Chart(ctxIncomeExpense, {
    type: 'line',
    data: {
        labels: ['Week 01', 'Week 02', 'Week 03', 'Week 04', 'Week 05', 'Week 06', 'Week 07', 'Week 08', 'Week 09', 'Week 10', 'Week 11', 'Week 12'],
        datasets: [
            {
                label: 'Income',
                data: [0, 0, 0, 0, 0, 0, 1000, 25000, 1000, 0, 0, 0],
                borderColor: '#c4161c', // Brand red
                borderWidth: 3,
                fill: false,
                tension: 0.4, // Smooth waves
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#c4161c',
                pointHoverBorderWidth: 3
            },
            {
                label: 'Expense',
                data: [0, 0, 0, 0, 0, 0, 500, 4000, 500, 0, 0, 0],
                borderColor: '#747474ff', // Black
                borderWidth: 3,
                fill: false,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#000000',
                pointHoverBorderWidth: 3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#ffffff',
                titleColor: '#333333',
                bodyColor: '#555555',
                borderColor: 'rgba(0,0,0,0.05)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 12,
                displayColors: true,
                usePointStyle: true,
                boxPadding: 6,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                callbacks: {
                    label: function (context) {
                        return context.dataset.label + ': ₹' + context.raw.toLocaleString('en-IN');
                    }
                }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    color: 'rgba(0,0,0,0.03)',
                    drawBorder: false
                },
                border: { display: false },
                ticks: { font: { family: "'Inter', sans-serif" }, color: '#a3aed1' }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    color: 'rgba(0,0,0,0.03)',
                    drawBorder: false
                },
                border: { display: false },
                ticks: {
                    color: '#a3aed1',
                    callback: function (value) {
                        if (value === 0) return '0';
                        return '₹' + value.toLocaleString('en-IN');
                    }
                }
            }
        },
        animation: {
            y: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    }
});

// Custom plugin for Doughnut Inner Text & Center Text
const customDoughnutPlugin = {
    id: 'customDoughnutText',
    beforeDraw: function (chart) {
        if (chart.config.type !== 'doughnut') return;
        var ctx = chart.ctx;
        var chartArea = chart.chartArea;

        if (!chartArea) return; // Wait for chart area to be defined

        ctx.restore();

        var centerX = (chartArea.left + chartArea.right) / 2;
        var centerY = (chartArea.top + chartArea.bottom) / 2;

        // Calculate percentage for the first slice
        var dataArray = chart.config.data.datasets[0].data;
        var total = dataArray.reduce((a, b) => a + b, 0);
        var percentage = total > 0 ? Math.round((dataArray[0] / total) * 100) : 0;

        // Subtext (Total Value)
        ctx.font = "500 0.75rem 'Inter', sans-serif";
        ctx.fillStyle = "#94a3b8";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Total Value", centerX, centerY - 12);

        // Center text (Percentage)
        ctx.font = "bold 1.6rem 'Inter', sans-serif";
        ctx.fillStyle = "#334155";
        ctx.fillText(percentage + "%", centerX, centerY + 10);

        ctx.save();
    }
};

Chart.register(customDoughnutPlugin);

// Shared Pie Chart Options
// Disable DataLabels globally so it doesn't break other charts (Line/Bar)
if (typeof ChartDataLabels !== 'undefined') {
    Chart.defaults.plugins.datalabels = { display: false };
}

const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        padding: 0
    },
    plugins: {
        legend: {
            display: true,
            position: 'right',
            labels: {
                usePointStyle: false,
                boxWidth: 12,
                boxHeight: 12,
                padding: 10,
                font: { family: "'Inter', sans-serif", size: 11 },
                color: '#334155'
            }
        },
        tooltip: {
            backgroundColor: '#ffffff',
            bodyColor: '#333333',
            padding: 10,
            cornerRadius: 12,
            borderColor: 'rgba(0,0,0,0.05)',
            borderWidth: 1,
            boxPadding: 4,
            usePointStyle: true,
            displayColors: true
        },
        datalabels: {
            display: true, // Explicitly enable for pie charts
            color: '#ffffff',
            font: {
                family: "'Inter', sans-serif",
                weight: 'bold',
                size: 11
            },
            formatter: (value) => {
                if (value < 5) return ''; // Hide labels for very small slices
                return value + '%';
            }
        }
    },
    animation: {
        animateScale: true,
        animateRotate: true
    }
};

const redPalette = [
    '#d63031', // 1. Vibrant Soft Red
    '#e14f52', // 2. Bright Coral Red
    '#eb6c6e', // 3. Warm Coral Rose
    '#f18789', // 4. Soft Rose
    '#f5a1a3', // 5. Mild Salmon Pink
    '#f8babc', // 6. Soft Blush
    '#fbd2d3', // 7. Light Pastel Blush
    '#fde6e7', // 8. Very Soft Rose
    '#fff0f1', // 9. Pale Rose Tint
    '#fff8f8'  // 10. Lightest Cream Rose
];

// 4. Chapter Wise Business
new Chart(document.getElementById('pieChartBusiness').getContext('2d'), {
    type: 'pie',
    data: {
        labels: ['Synergy Chapter', 'Warriors', 'Agro Hub', 'Commanders-Avinashi', 'Dollar city', 'Alpha Chapter', 'Legacy', 'Victory Chapter', 'Rolex', 'Manchester'],
        datasets: [{
            data: [31, 19, 15, 10, 8, 6, 4, 3, 2, 2],
            backgroundColor: redPalette,
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 12
        }]
    },
    options: pieOptions
});

// 5. Chapter Wise PEMA (121s)
new Chart(document.getElementById('pieChartPEMA').getContext('2d'), {
    type: 'pie',
    data: {
        labels: ['Legacy', 'Agro Hub', 'Synergy Chapter', 'Alpha Chapter', 'Commanders-Avinashi', 'Dollar city', 'Victory Chapter', 'Quantum', 'Boss - Magnum', 'Fusion Chapter'],
        datasets: [{
            data: [15, 14, 14, 13, 13, 10, 6, 6, 5, 4],
            backgroundColor: redPalette,
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 12
        }]
    },
    options: pieOptions
});

// 6. Chapter Wise Referrals
new Chart(document.getElementById('pieChartReferrals').getContext('2d'), {
    type: 'pie',
    data: {
        labels: ['Synergy Chapter', 'Alpha Chapter', 'Legacy', 'Agro Hub', 'Warriors', 'Victory Chapter'],
        datasets: [{
            data: [30, 20, 15, 15, 10, 10],
            backgroundColor: redPalette.slice(0, 6),
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 12
        }]
    },
    options: pieOptions
});

// 7. Chapter Wise Visitors
new Chart(document.getElementById('pieChartVisitors').getContext('2d'), {
    type: 'pie',
    data: {
        labels: ['Commanders-Avinashi', 'Synergy Chapter', 'Agro Hub', 'Legacy', 'Dollar city'],
        datasets: [{
            data: [40, 25, 15, 10, 10],
            backgroundColor: redPalette.slice(0, 5),
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 12
        }]
    },
    options: pieOptions
});

// =======================================================
// Top Leaderboard & Achievers Logic (Interactive)
// =======================================================
const leaderboardData = {
    points: {
        title: "Top 10 Points Achievers",
        subtitle: "Overall chapter score ranking this quarter",
        metricName: "TOTAL POINTS EARNED",
        badge: "OVERALL POINTS KING",
        unit: "pts",
        pill: "Overall Point Leader",
        members: [
            { rank: 1, name: "B.Sathiyanathan", company: "Nithraa Enterprises", category: "Services", role: "MEMBER", contact: "9994265055", score: 148, roleTitle: "Boss - Magnum, Boss Chennai 1" },
            { rank: 2, name: "A.Shahul Hameed", company: "Appaji Kitchen Equipments", category: "Kitchen Equipment", role: "MEMBER", contact: "9840123456", score: 124, roleTitle: "Executive Member, Boss Chennai 1" },
            { rank: 3, name: "Kanna Rao S", company: "GK GLOBAL TRADE PVT LTD", category: "Global Trade", role: "MEMBER", contact: "9790123456", score: 118, roleTitle: "Core Committee, Boss Chennai 1" },
            { rank: 4, name: "R.Vetrivel Rajaram", company: "Coral Engineering", category: "Engineering", role: "MEMBER", contact: "9444123456", score: 96, roleTitle: "Committee Member" },
            { rank: 5, name: "S.Balu", company: "PSR Engineering", category: "Manufacturing", role: "MEMBER", contact: "9884123456", score: 89, roleTitle: "Active Member" },
            { rank: 6, name: "Bharath", company: "Steel mine coal manufacturer1", category: "Manufacturing", role: "IT WING HEAD", contact: "8383888888", score: 82, roleTitle: "IT - Wing Head" },
            { rank: 7, name: "Kesavan", company: "Kesavan Digital Services", category: "Digital Services", role: "MEMBER", contact: "9123456780", score: 75, roleTitle: "Digital Lead" },
            { rank: 8, name: "veera", company: "Border cables production company", category: "Cables & Wiring", role: "MEMBER", contact: "9876543210", score: 68, roleTitle: "Senior Member" },
            { rank: 9, name: "nimona", company: "Nimona cartoon industry", category: "Media & Animation", role: "MEMBER", contact: "9000123456", score: 54, roleTitle: "Member" },
            { rank: 10, name: "Nithanya", company: "Nithanya Construction", category: "Construction", role: "MEMBER", contact: "9555123456", score: 45, roleTitle: "Member" }
        ]
    },
    rfls: {
        title: "Top 10 RFLs Achievers",
        subtitle: "Overall chapter referrals ranking this quarter",
        metricName: "TOTAL REFERRALS GIVEN",
        badge: "REFERRAL CHAMPION",
        unit: "RFLs",
        pill: "Referral Master",
        members: [
            { rank: 1, name: "Kesavan", company: "Kesavan Digital Services", category: "Digital Services", role: "MEMBER", contact: "9123456780", score: 18, roleTitle: "Digital Lead, Boss Chennai 1" },
            { rank: 2, name: "nimona", company: "Nimona cartoon industry", category: "Media & Animation", role: "MEMBER", contact: "9000123456", score: 15, roleTitle: "Senior Member, Boss Chennai 1" },
            { rank: 3, name: "veera", company: "Border cables production company", category: "Cables & Wiring", role: "MEMBER", contact: "9876543210", score: 14, roleTitle: "Senior Member" },
            { rank: 4, name: "B.Sathiyanathan", company: "Nithraa Enterprises", category: "Services", role: "MEMBER", contact: "9994265055", score: 12, roleTitle: "Boss - Magnum, Boss Chennai 1" },
            { rank: 5, name: "Bharath", company: "Steel mine coal manufacturer1", category: "Manufacturing", role: "IT WING HEAD", contact: "8383888888", score: 11, roleTitle: "IT - Wing Head" },
            { rank: 6, name: "A.Shahul Hameed", company: "Appaji Kitchen Equipments", category: "Kitchen Equipment", role: "MEMBER", contact: "9840123456", score: 9, roleTitle: "Executive Member" },
            { rank: 7, name: "Kanna Rao S", company: "GK GLOBAL TRADE PVT LTD", category: "Global Trade", role: "MEMBER", contact: "9790123456", score: 8, roleTitle: "Core Committee" },
            { rank: 8, name: "R.Vetrivel Rajaram", company: "Coral Engineering", category: "Engineering", role: "MEMBER", contact: "9444123456", score: 7, roleTitle: "Committee Member" },
            { rank: 9, name: "S.Balu", company: "PSR Engineering", category: "Manufacturing", role: "MEMBER", contact: "9884123456", score: 6, roleTitle: "Active Member" },
            { rank: 10, name: "Nithanya", company: "Nithanya Construction", category: "Construction", role: "MEMBER", contact: "9555123456", score: 5, roleTitle: "Member" }
        ]
    },
    business: {
        title: "Top 10 Business Given Achievers",
        subtitle: "Highest closed business contributors this quarter",
        metricName: "TOTAL BUSINESS GIVEN",
        badge: "BUSINESS TITAN",
        unit: "",
        pill: "Top Revenue Generator",
        members: [
            { rank: 1, name: "Bharath", company: "Steel mine coal manufacturer1", category: "Manufacturing", role: "IT WING HEAD", contact: "8383888888", score: "₹96,00,000", roleTitle: "IT - Wing Head, Boss Chennai 1" },
            { rank: 2, name: "Kesavan", company: "Kesavan Digital Services", category: "Digital Services", role: "MEMBER", contact: "9123456780", score: "₹19,00,000", roleTitle: "Digital Lead, Boss Chennai 1" },
            { rank: 3, name: "nimona", company: "Nimona cartoon industry", category: "Media & Animation", role: "MEMBER", contact: "9000123456", score: "₹7,01,001", roleTitle: "Senior Member" },
            { rank: 4, name: "B.Sathiyanathan", company: "Nithraa Enterprises", category: "Services", role: "MEMBER", contact: "9994265055", score: "₹5,50,000", roleTitle: "Boss - Magnum" },
            { rank: 5, name: "A.Shahul Hameed", company: "Appaji Kitchen Equipments", category: "Kitchen Equipment", role: "MEMBER", contact: "9840123456", score: "₹4,20,000", roleTitle: "Executive Member" },
            { rank: 6, name: "Kanna Rao S", company: "GK GLOBAL TRADE PVT LTD", category: "Global Trade", role: "MEMBER", contact: "9790123456", score: "₹3,85,000", roleTitle: "Core Committee" },
            { rank: 7, name: "R.Vetrivel Rajaram", company: "Coral Engineering", category: "Engineering", role: "MEMBER", contact: "9444123456", score: "₹2,90,000", roleTitle: "Committee Member" },
            { rank: 8, name: "veera", company: "Border cables production company", category: "Cables & Wiring", role: "MEMBER", contact: "9876543210", score: "₹2,15,000", roleTitle: "Senior Member" },
            { rank: 9, name: "S.Balu", company: "PSR Engineering", category: "Manufacturing", role: "MEMBER", contact: "9884123456", score: "₹1,80,000", roleTitle: "Active Member" },
            { rank: 10, name: "Nithanya", company: "Nithanya Construction", category: "Construction", role: "MEMBER", contact: "9555123456", score: "₹1,25,000", roleTitle: "Member" }
        ]
    },
    "121s": {
        title: "Top 10 1-to-1 Meetings",
        subtitle: "Most active networking members this quarter",
        metricName: "TOTAL 121 MEETINGS",
        badge: "NETWORKING STAR",
        unit: "Mtgs",
        pill: "Most Connected",
        members: [
            { rank: 1, name: "Kesavan", company: "Kesavan Digital Services", category: "Digital Services", role: "MEMBER", contact: "9123456780", score: 19, roleTitle: "Digital Lead" },
            { rank: 2, name: "Bharath", company: "Steel mine coal manufacturer1", category: "Manufacturing", role: "IT WING HEAD", contact: "8383888888", score: 16, roleTitle: "IT - Wing Head" },
            { rank: 3, name: "veera", company: "Border cables production company", category: "Cables & Wiring", role: "MEMBER", contact: "9876543210", score: 14, roleTitle: "Senior Member" },
            { rank: 4, name: "B.Sathiyanathan", company: "Nithraa Enterprises", category: "Services", role: "MEMBER", contact: "9994265055", score: 12, roleTitle: "Boss - Magnum" },
            { rank: 5, name: "Kanna Rao S", company: "GK GLOBAL TRADE PVT LTD", category: "Global Trade", role: "MEMBER", contact: "9790123456", score: 11, roleTitle: "Core Committee" },
            { rank: 6, name: "A.Shahul Hameed", company: "Appaji Kitchen Equipments", category: "Kitchen Equipment", role: "MEMBER", contact: "9840123456", score: 10, roleTitle: "Executive Member" },
            { rank: 7, name: "R.Vetrivel Rajaram", company: "Coral Engineering", category: "Engineering", role: "MEMBER", contact: "9444123456", score: 9, roleTitle: "Committee Member" },
            { rank: 8, name: "S.Balu", company: "PSR Engineering", category: "Manufacturing", role: "MEMBER", contact: "9884123456", score: 8, roleTitle: "Active Member" },
            { rank: 9, name: "nimona", company: "Nimona cartoon industry", category: "Media & Animation", role: "MEMBER", contact: "9000123456", score: 7, roleTitle: "Member" },
            { rank: 10, name: "Nithanya", company: "Nithanya Construction", category: "Construction", role: "MEMBER", contact: "9555123456", score: 6, roleTitle: "Member" }
        ]
    },
    visitors: {
        title: "Top 10 Visitors Given",
        subtitle: "Most visitor invites brought to chapter meetings",
        metricName: "TOTAL VISITORS BROUGHT",
        badge: "VISITOR CHAMPION",
        unit: "Visitors",
        pill: "Top Inviter",
        members: [
            { rank: 1, name: "veera", company: "Border cables production company", category: "Cables & Wiring", role: "MEMBER", contact: "9876543210", score: 12, roleTitle: "Senior Member" },
            { rank: 2, name: "Kesavan", company: "Kesavan Digital Services", category: "Digital Services", role: "MEMBER", contact: "9123456780", score: 10, roleTitle: "Digital Lead" },
            { rank: 3, name: "Bharath", company: "Steel mine coal manufacturer1", category: "Manufacturing", role: "IT WING HEAD", contact: "8383888888", score: 9, roleTitle: "IT - Wing Head" },
            { rank: 4, name: "B.Sathiyanathan", company: "Nithraa Enterprises", category: "Services", role: "MEMBER", contact: "9994265055", score: 8, roleTitle: "Boss - Magnum" },
            { rank: 5, name: "nimona", company: "Nimona cartoon industry", category: "Media & Animation", role: "MEMBER", contact: "9000123456", score: 7, roleTitle: "Member" },
            { rank: 6, name: "A.Shahul Hameed", company: "Appaji Kitchen Equipments", category: "Kitchen Equipment", role: "MEMBER", contact: "9840123456", score: 6, roleTitle: "Executive Member" },
            { rank: 7, name: "Kanna Rao S", company: "GK GLOBAL TRADE PVT LTD", category: "Global Trade", role: "MEMBER", contact: "9790123456", score: 5, roleTitle: "Core Committee" },
            { rank: 8, name: "R.Vetrivel Rajaram", company: "Coral Engineering", category: "Engineering", role: "MEMBER", contact: "9444123456", score: 4, roleTitle: "Committee Member" },
            { rank: 9, name: "S.Balu", company: "PSR Engineering", category: "Manufacturing", role: "MEMBER", contact: "9884123456", score: 3, roleTitle: "Active Member" },
            { rank: 10, name: "Nithanya", company: "Nithanya Construction", category: "Construction", role: "MEMBER", contact: "9555123456", score: 2, roleTitle: "Member" }
        ]
    },
    chiefguests: {
        title: "Top 10 Chief Guests",
        subtitle: "Members who introduced esteemed chief guests",
        metricName: "TOTAL CHIEF GUESTS",
        badge: "GUEST OF HONOR LEAD",
        unit: "Guests",
        pill: "Distinguished Host",
        members: [
            { rank: 1, name: "Kesavan", company: "Kesavan Digital Services", category: "Digital Services", role: "MEMBER", contact: "9123456780", score: 8, roleTitle: "Digital Lead" },
            { rank: 2, name: "veera", company: "Border cables production company", category: "Cables & Wiring", role: "MEMBER", contact: "9876543210", score: 7, roleTitle: "Senior Member" },
            { rank: 3, name: "Bharath", company: "Steel mine coal manufacturer1", category: "Manufacturing", role: "IT WING HEAD", contact: "8383888888", score: 6, roleTitle: "IT - Wing Head" },
            { rank: 4, name: "B.Sathiyanathan", company: "Nithraa Enterprises", category: "Services", role: "MEMBER", contact: "9994265055", score: 5, roleTitle: "Boss - Magnum" },
            { rank: 5, name: "Kanna Rao S", company: "GK GLOBAL TRADE PVT LTD", category: "Global Trade", role: "MEMBER", contact: "9790123456", score: 4, roleTitle: "Core Committee" },
            { rank: 6, name: "A.Shahul Hameed", company: "Appaji Kitchen Equipments", category: "Kitchen Equipment", role: "MEMBER", contact: "9840123456", score: 4, roleTitle: "Executive Member" },
            { rank: 7, name: "R.Vetrivel Rajaram", company: "Coral Engineering", category: "Engineering", role: "MEMBER", contact: "9444123456", score: 3, roleTitle: "Committee Member" },
            { rank: 8, name: "S.Balu", company: "PSR Engineering", category: "Manufacturing", role: "MEMBER", contact: "9884123456", score: 3, roleTitle: "Active Member" },
            { rank: 9, name: "nimona", company: "Nimona cartoon industry", category: "Media & Animation", role: "MEMBER", contact: "9000123456", score: 2, roleTitle: "Member" },
            { rank: 10, name: "Nithanya", company: "Nithanya Construction", category: "Construction", role: "MEMBER", contact: "9555123456", score: 2, roleTitle: "Member" }
        ]
    },
    powerdates: {
        title: "Top 10 Power Dates",
        subtitle: "Members actively participating in power date sessions",
        metricName: "TOTAL POWER DATES",
        badge: "POWER CONNECTOR",
        unit: "Dates",
        pill: "Active Collaborator",
        members: [
            { rank: 1, name: "B.Sathiyanathan", company: "Nithraa Enterprises", category: "Services", role: "MEMBER", contact: "9994265055", score: 14, roleTitle: "Boss - Magnum" },
            { rank: 2, name: "Kesavan", company: "Kesavan Digital Services", category: "Digital Services", role: "MEMBER", contact: "9123456780", score: 12, roleTitle: "Digital Lead" },
            { rank: 3, name: "Bharath", company: "Steel mine coal manufacturer1", category: "Manufacturing", role: "IT WING HEAD", contact: "8383888888", score: 11, roleTitle: "IT - Wing Head" },
            { rank: 4, name: "A.Shahul Hameed", company: "Appaji Kitchen Equipments", category: "Kitchen Equipment", role: "MEMBER", contact: "9840123456", score: 9, roleTitle: "Executive Member" },
            { rank: 5, name: "S.Balu", company: "PSR Engineering", category: "Manufacturing", role: "MEMBER", contact: "9884123456", score: 8, roleTitle: "Active Member" },
            { rank: 6, name: "Kanna Rao S", company: "GK GLOBAL TRADE PVT LTD", category: "Global Trade", role: "MEMBER", contact: "9790123456", score: 7, roleTitle: "Core Committee" },
            { rank: 7, name: "veera", company: "Border cables production company", category: "Cables & Wiring", role: "MEMBER", contact: "9876543210", score: 6, roleTitle: "Senior Member" },
            { rank: 8, name: "R.Vetrivel Rajaram", company: "Coral Engineering", category: "Engineering", role: "MEMBER", contact: "9444123456", score: 5, roleTitle: "Committee Member" },
            { rank: 9, name: "nimona", company: "Nimona cartoon industry", category: "Media & Animation", role: "MEMBER", contact: "9000123456", score: 4, roleTitle: "Member" },
            { rank: 10, name: "Nithanya", company: "Nithanya Construction", category: "Construction", role: "MEMBER", contact: "9555123456", score: 3, roleTitle: "Member" }
        ]
    },
    inductees: {
        title: "Top 10 Inductees Added",
        subtitle: "Members sponsoring new chapter additions",
        metricName: "TOTAL INDUCTIONS",
        badge: "CHAPTER EXPANDER",
        unit: "Inductees",
        pill: "Chapter Builder",
        members: [
            { rank: 1, name: "B.Sathiyanathan", company: "Nithraa Enterprises", category: "Services", role: "MEMBER", contact: "9994265055", score: 9, roleTitle: "Boss - Magnum" },
            { rank: 2, name: "Bharath", company: "Steel mine coal manufacturer1", category: "Manufacturing", role: "IT WING HEAD", contact: "8383888888", score: 7, roleTitle: "IT - Wing Head" },
            { rank: 3, name: "Kesavan", company: "Kesavan Digital Services", category: "Digital Services", role: "MEMBER", contact: "9123456780", score: 6, roleTitle: "Digital Lead" },
            { rank: 4, name: "veera", company: "Border cables production company", category: "Cables & Wiring", role: "MEMBER", contact: "9876543210", score: 5, roleTitle: "Senior Member" },
            { rank: 5, name: "nimona", company: "Nimona cartoon industry", category: "Media & Animation", role: "MEMBER", contact: "9000123456", score: 4, roleTitle: "Member" },
            { rank: 6, name: "A.Shahul Hameed", company: "Appaji Kitchen Equipments", category: "Kitchen Equipment", role: "MEMBER", contact: "9840123456", score: 4, roleTitle: "Executive Member" },
            { rank: 7, name: "Kanna Rao S", company: "GK GLOBAL TRADE PVT LTD", category: "Global Trade", role: "MEMBER", contact: "9790123456", score: 3, roleTitle: "Core Committee" },
            { rank: 8, name: "R.Vetrivel Rajaram", company: "Coral Engineering", category: "Engineering", role: "MEMBER", contact: "9444123456", score: 2, roleTitle: "Committee Member" },
            { rank: 9, name: "S.Balu", company: "PSR Engineering", category: "Manufacturing", role: "MEMBER", contact: "9884123456", score: 2, roleTitle: "Active Member" },
            { rank: 10, name: "Nithanya", company: "Nithanya Construction", category: "Construction", role: "MEMBER", contact: "9555123456", score: 1, roleTitle: "Member" }
        ]
    }
};

let currentLeaderTab = "points";
let selectedMemberRank = 1;

function renderLeaderboard() {
    const data = leaderboardData[currentLeaderTab] || leaderboardData.points;
    const titleElem = document.getElementById("leaderboard-title");
    if (titleElem) titleElem.textContent = data.title;

    const subtitleElem = document.getElementById("leaderboard-subtitle");
    if (subtitleElem) subtitleElem.textContent = data.subtitle;

    const listElem = document.getElementById("leaderboard-list");
    if (!listElem) return;

    let html = "";
    data.members.forEach((m) => {
        const isActive = m.rank === selectedMemberRank;
        let badgeHtml = `<span class="rank-badge-normal">${m.rank}th</span>`;
        if (m.rank === 1) badgeHtml = `<span class="rank-badge-1"><i class="fa-solid fa-crown me-1 text-warning"></i> 1st</span>`;
        else if (m.rank === 2) badgeHtml = `<span class="rank-badge-2"><i class="fa-solid fa-medal me-1"></i> 2nd</span>`;
        else if (m.rank === 3) badgeHtml = `<span class="rank-badge-3"><i class="fa-solid fa-medal me-1 text-warning"></i> 3rd</span>`;

        let scoreDisplay = m.score;

        html += `
            <div class="leader-item ${isActive ? 'active' : ''}" onclick="selectLeaderMember(${m.rank})">
                <div class="leader-item-left">
                    ${badgeHtml}
                    <div class="leader-avatar">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="leader-info">
                        <div class="fw-bold text-dark leader-name" title="${m.name}">${m.name}</div>
                        <div class="text-muted small leader-company" title="${m.company} • ${m.category}">${m.company} • ${m.category}</div>
                    </div>
                </div>
                ${m.rank === 1 ? `<span class="leader-score-badge">${scoreDisplay}</span>` : `<span class="leader-score-text">${scoreDisplay}</span>`}
            </div>
        `;
    });

    listElem.innerHTML = html;

    // Update Spotlight
    const currentMember = data.members.find(m => m.rank === selectedMemberRank) || data.members[0];
    if (currentMember) {
        updateSpotlight(currentMember, data);
    }
}

function updateSpotlight(m, data) {
    const nameElem = document.getElementById("spotlight-name");
    const roleTitleElem = document.getElementById("spotlight-role-title");
    const valElem = document.getElementById("spotlight-points-val");
    const labelElem = document.getElementById("spotlight-metric-label");
    const pillElem = document.getElementById("spotlight-pill");
    const titleBadgeElem = document.getElementById("spotlight-title-badge");
    const rankBadgeElem = document.getElementById("spotlight-rank-badge");
    const roleElem = document.getElementById("spotlight-role");
    const catElem = document.getElementById("spotlight-category");
    const compElem = document.getElementById("spotlight-company");
    const contactElem = document.getElementById("spotlight-contact");
    const watermarkElem = document.getElementById("spotlight-watermark");
    const avatarBadgeElem = document.getElementById("spotlight-avatar-badge");

    if (nameElem) nameElem.textContent = m.name;
    if (roleTitleElem) roleTitleElem.textContent = m.roleTitle || `${m.role} - ${m.company}`;
    if (valElem) {
        const unitStr = data.unit ? `<span class="fs-5 fw-normal"> ${data.unit}</span>` : '';
        valElem.innerHTML = `${m.score}${unitStr}`;
    }
    if (labelElem) labelElem.textContent = data.metricName;
    if (pillElem) pillElem.innerHTML = `<i class="fa-solid fa-crown text-warning me-1"></i> ${data.pill}`;
    if (titleBadgeElem) titleBadgeElem.innerHTML = `<i class="fa-solid fa-crown text-warning me-1"></i> ${data.badge}`;
    if (rankBadgeElem) rankBadgeElem.innerHTML = `<i class="fa-solid fa-arrow-trend-up me-1"></i> RANK #${m.rank}`;
    if (roleElem) roleElem.textContent = m.role;
    if (catElem) catElem.textContent = m.category;
    if (compElem) compElem.textContent = m.company;
    if (contactElem) contactElem.textContent = m.contact;

    const rankSuffix = m.rank === 1 ? '1st' : m.rank === 2 ? '2nd' : m.rank === 3 ? '3rd' : `${m.rank}th`;
    if (watermarkElem) watermarkElem.textContent = rankSuffix;
    if (avatarBadgeElem) {
        if (m.rank === 1) avatarBadgeElem.innerHTML = `<i class="fa-solid fa-crown text-warning"></i>`;
        else if (m.rank === 2) avatarBadgeElem.innerHTML = `<i class="fa-solid fa-medal text-white"></i>`;
        else if (m.rank === 3) avatarBadgeElem.innerHTML = `<i class="fa-solid fa-medal text-warning"></i>`;
        else avatarBadgeElem.innerHTML = `<i class="fa-solid fa-star text-warning"></i>`;
    }
}

function selectLeaderMember(rank) {
    selectedMemberRank = rank;
    renderLeaderboard();
}

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.leaderboard-tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentLeaderTab = this.getAttribute('data-tab');
            selectedMemberRank = 1;
            renderLeaderboard();
        });
    });

    // Top Achievers Period Pills Switcher
    const achieverPills = document.querySelectorAll('.achievers-pill-btn');
    const achieverSubtitle = document.getElementById('achievers-active-period');
    achieverPills.forEach(pill => {
        pill.addEventListener('click', function () {
            achieverPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            const period = this.getAttribute('data-period');
            if (achieverSubtitle && period) {
                achieverSubtitle.textContent = period;
            }
        });
    });

    renderLeaderboard();
});

// Live Date & Time Header Widget
function updateHeaderDateTime() {
    const now = new Date();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayName = days[now.getDay()];
    const day = String(now.getDate()).padStart(2, '0');
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const formattedDate = `${dayName}, ${day} ${month} ${year}`;

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12
    const formattedHours = String(hours).padStart(2, '0');
    const formattedTime = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

    const dateElement = document.getElementById('header-date');
    const timeElement = document.getElementById('header-time');

    if (dateElement) {
        dateElement.textContent = formattedDate;
    }
    if (timeElement) {
        timeElement.textContent = formattedTime;
    }
}

// Initialize live time immediately and tick every second
updateHeaderDateTime();
setInterval(updateHeaderDateTime, 1000);

// ==========================================================================
// Search Popup Modal (Command Palette) Logic
// ==========================================================================
const searchModalBackdrop = document.getElementById('searchModalBackdrop');
const searchModalDialog = document.getElementById('searchModalDialog');
const searchModalInput = document.getElementById('search-modal-input');
const searchModalCloseBtn = document.getElementById('search-modal-close');
const headerSearchBar = document.getElementById('header-search-bar');
const searchNoResults = document.getElementById('searchNoResults');
const quickAccessSection = document.getElementById('quickAccessSection');
const moreOptionsSection = document.getElementById('moreOptionsSection');

function openSearchModal() {
    if (!searchModalBackdrop) return;
    searchModalBackdrop.classList.add('active');
    document.body.classList.add('search-modal-open');
    if (searchModalInput) {
        searchModalInput.value = '';
        filterSearchItems('');
        setTimeout(() => {
            searchModalInput.focus();
        }, 80);
    }
}

function closeSearchModal() {
    if (!searchModalBackdrop) return;
    searchModalBackdrop.classList.remove('active');
    document.body.classList.remove('search-modal-open');
    if (searchModalInput) {
        searchModalInput.blur();
    }
}

function filterSearchItems(query) {
    const q = query.trim().toLowerCase();
    const searchItems = document.querySelectorAll('.search-card-item');
    let visibleCount = 0;
    let quickCount = 0;
    let moreCount = 0;

    searchItems.forEach(item => {
        const title = (item.getAttribute('data-title') || '').toLowerCase();
        const desc = (item.getAttribute('data-desc') || '').toLowerCase();
        const keywords = (item.getAttribute('data-keywords') || '').toLowerCase();
        
        const isMatch = !q || title.includes(q) || desc.includes(q) || keywords.includes(q);
        
        if (isMatch) {
            item.style.display = 'flex';
            visibleCount++;
            if (item.closest('#quickAccessSection')) quickCount++;
            if (item.closest('#moreOptionsSection')) moreCount++;
        } else {
            item.style.display = 'none';
        }
    });

    if (quickAccessSection) {
        quickAccessSection.style.display = quickCount > 0 ? 'block' : 'none';
    }
    if (moreOptionsSection) {
        moreOptionsSection.style.display = moreCount > 0 ? 'block' : 'none';
    }
    if (searchNoResults) {
        if (visibleCount === 0) {
            searchNoResults.classList.remove('d-none');
        } else {
            searchNoResults.classList.add('d-none');
        }
    }
}

function handleSearchItemClick(title) {
    closeSearchModal();
    console.log('Navigating to:', title);
}

// Bind Trigger Events
if (headerSearchBar) {
    headerSearchBar.addEventListener('click', openSearchModal);
}

if (searchModalCloseBtn) {
    searchModalCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeSearchModal();
    });
}

if (searchModalBackdrop) {
    searchModalBackdrop.addEventListener('click', (e) => {
        if (e.target === searchModalBackdrop) {
            closeSearchModal();
        }
    });
}

if (searchModalInput) {
    searchModalInput.addEventListener('input', (e) => {
        filterSearchItems(e.target.value);
    });
}

// Keyboard shortcuts (Ctrl+K or Cmd+K to open, ESC to close)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchModalBackdrop && searchModalBackdrop.classList.contains('active')) {
            closeSearchModal();
        } else {
            openSearchModal();
        }
    } else if (e.key === 'Escape') {
        if (searchModalBackdrop && searchModalBackdrop.classList.contains('active')) {
            closeSearchModal();
        }
        closeDatePicker();
        closeLocationFilter();
    }
});

// ==========================================================================
// Date Range Picker Modal Controller
// ==========================================================================
const selectDateRangeBtn = document.getElementById('selectDateRangeBtn');
const datePickerBackdrop = document.getElementById('datePickerBackdrop');
const cancelDatePickerBtn = document.getElementById('cancelDatePickerBtn');
const applyDatePickerBtn = document.getElementById('applyDatePickerBtn');
const calPrevMonthBtn = document.getElementById('calPrevMonth');
const calNextMonthBtn = document.getElementById('calNextMonth');
const calMonthTitle = document.getElementById('calMonthTitle');
const calendarDaysGrid = document.getElementById('calendarDaysGrid');

// Calendar State: defaults to Sep 2026, 9th selected as in reference image
let currentCalDate = new Date(2026, 8, 9);
let selectedStartDate = new Date(2026, 8, 9);

const calMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function renderCalendar() {
    if (!calendarDaysGrid || !calMonthTitle) return;
    const year = currentCalDate.getFullYear();
    const month = currentCalDate.getMonth();

    calMonthTitle.innerHTML = `${calMonthNames[month]} ${year} <i class="fa-solid fa-chevron-down ms-1" style="font-size: 0.75rem;"></i>`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    calendarDaysGrid.innerHTML = '';

    // Prev month inactive days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        const dayNum = prevMonthDays - i;
        const dayElem = document.createElement('div');
        dayElem.className = 'datepicker-day inactive';
        dayElem.textContent = dayNum;
        calendarDaysGrid.appendChild(dayElem);
    }

    // Current month days
    for (let day = 1; day <= totalDaysInMonth; day++) {
        const dayElem = document.createElement('div');
        dayElem.className = 'datepicker-day';
        dayElem.textContent = day;

        const thisDate = new Date(year, month, day);

        if (
            selectedStartDate &&
            thisDate.getFullYear() === selectedStartDate.getFullYear() &&
            thisDate.getMonth() === selectedStartDate.getMonth() &&
            thisDate.getDate() === selectedStartDate.getDate()
        ) {
            dayElem.classList.add('selected');
        }

        dayElem.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedStartDate = new Date(year, month, day);
            renderCalendar();
            if (selectDateRangeBtn) {
                const formatted = `${String(selectedStartDate.getDate()).padStart(2, '0')} ${calMonthNames[selectedStartDate.getMonth()].substring(0, 3)} ${selectedStartDate.getFullYear()}`;
                const spanText = selectDateRangeBtn.querySelector('.btn-text') || selectDateRangeBtn.querySelector('span');
                if (spanText) spanText.textContent = formatted;
            }
            setTimeout(() => {
                closeDatePicker();
            }, 180);
        });

        calendarDaysGrid.appendChild(dayElem);
    }

    // Next month trailing days to complete 35 or 42 grid
    const totalRendered = firstDayIndex + totalDaysInMonth;
    const nextDays = totalRendered > 35 ? 42 - totalRendered : 35 - totalRendered;
    for (let day = 1; day <= nextDays; day++) {
        const dayElem = document.createElement('div');
        dayElem.className = 'datepicker-day inactive';
        dayElem.textContent = day;
        calendarDaysGrid.appendChild(dayElem);
    }
}

function openDatePicker() {
    if (!datePickerCard) return;
    closeLocationFilter();
    renderCalendar();
    datePickerCard.classList.add('show');
    if (selectDateRangeBtn) {
        selectDateRangeBtn.classList.add('active');
        selectDateRangeBtn.setAttribute('aria-expanded', 'true');
    }
}

function closeDatePicker() {
    if (!datePickerCard) return;
    datePickerCard.classList.remove('show');
    if (selectDateRangeBtn) {
        selectDateRangeBtn.classList.remove('active');
        selectDateRangeBtn.setAttribute('aria-expanded', 'false');
    }
}

function toggleDatePicker(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    if (datePickerCard && datePickerCard.classList.contains('show')) {
        closeDatePicker();
    } else {
        openDatePicker();
    }
}

const datePickerContainer = document.getElementById('datePickerContainer');
const datePickerCard = document.getElementById('datePickerCard');

if (selectDateRangeBtn) selectDateRangeBtn.addEventListener('click', toggleDatePicker);

if (calPrevMonthBtn) {
    calPrevMonthBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentCalDate.setMonth(currentCalDate.getMonth() - 1);
        renderCalendar();
    });
}
if (calNextMonthBtn) {
    calNextMonthBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentCalDate.setMonth(currentCalDate.getMonth() + 1);
        renderCalendar();
    });
}

// ==========================================================================
// Location Filter Dropdown Controller
// ==========================================================================
const dashboardFiltersBtn = document.getElementById('dashboardFiltersBtn');
const locationFilterContainer = document.getElementById('locationFilterContainer');
const locationFilterCard = document.getElementById('locationFilterCard');
const closeLocationFilterBtn = document.getElementById('closeLocationFilterBtn');
const resetLocationFilterBtn = document.getElementById('resetLocationFilterBtn');
const applyLocationFilterBtn = document.getElementById('applyLocationFilterBtn');
const dashCountrySelect = document.getElementById('dashCountrySelect');
const dashStateSelect = document.getElementById('dashStateSelect');
const dashRegionSelect = document.getElementById('dashRegionSelect');
const dashChapterSelect = document.getElementById('dashChapterSelect');

function openLocationFilter() {
    if (!locationFilterCard) return;
    closeDatePicker();
    locationFilterCard.classList.add('show');
    if (dashboardFiltersBtn) {
        dashboardFiltersBtn.classList.add('active');
        dashboardFiltersBtn.setAttribute('aria-expanded', 'true');
    }
}

function closeLocationFilter() {
    if (!locationFilterCard) return;
    locationFilterCard.classList.remove('show');
    if (dashboardFiltersBtn) {
        dashboardFiltersBtn.classList.remove('active');
        dashboardFiltersBtn.setAttribute('aria-expanded', 'false');
    }
}

function toggleLocationFilter(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    if (locationFilterCard && locationFilterCard.classList.contains('show')) {
        closeLocationFilter();
    } else {
        openLocationFilter();
    }
}

if (dashboardFiltersBtn) dashboardFiltersBtn.addEventListener('click', toggleLocationFilter);
if (closeLocationFilterBtn) closeLocationFilterBtn.addEventListener('click', closeLocationFilter);

if (resetLocationFilterBtn) {
    resetLocationFilterBtn.addEventListener('click', () => {
        if (dashCountrySelect) dashCountrySelect.value = '';
        if (dashStateSelect) dashStateSelect.value = '';
        if (dashRegionSelect) dashRegionSelect.value = '';
        if (dashChapterSelect) dashChapterSelect.value = '';

        // Reset custom dropdown UI triggers
        const customWrappers = locationFilterCard ? locationFilterCard.querySelectorAll('.custom-dropdown-wrapper') : [];
        customWrappers.forEach(w => {
            const select = w.parentNode.querySelector('select');
            if (select) {
                const firstOpt = select.options[0];
                const textSpan = w.querySelector('.selected-text');
                if (textSpan && firstOpt) textSpan.textContent = firstOpt.text;
                w.querySelectorAll('.custom-dropdown-option').forEach(o => {
                    if (o.dataset.value === '') {
                        o.classList.add('selected');
                    } else {
                        o.classList.remove('selected');
                    }
                });
            }
        });

        if (dashboardFiltersBtn) {
            const spanText = dashboardFiltersBtn.querySelector('.btn-text') || dashboardFiltersBtn.querySelector('span');
            if (spanText) spanText.textContent = 'Filters';
        }
        closeLocationFilter();
    });
}
if (applyLocationFilterBtn) {
    applyLocationFilterBtn.addEventListener('click', () => {
        const country = dashCountrySelect ? dashCountrySelect.value : '';
        const state = dashStateSelect ? dashStateSelect.value : '';
        const region = dashRegionSelect ? dashRegionSelect.value : '';
        const chapter = dashChapterSelect ? dashChapterSelect.value : '';

        const activeCount = [country, state, region, chapter].filter(Boolean).length;
        if (dashboardFiltersBtn) {
            const spanText = dashboardFiltersBtn.querySelector('.btn-text') || dashboardFiltersBtn.querySelector('span');
            if (spanText) {
                spanText.textContent = activeCount > 0 ? `Filters (${activeCount})` : 'Filters';
            }
        }
        closeLocationFilter();
    });
}

// Global outside click handler for dropdowns
document.addEventListener('click', (e) => {
    if (datePickerCard && datePickerCard.classList.contains('show')) {
        if (datePickerContainer && !datePickerContainer.contains(e.target)) {
            closeDatePicker();
        }
    }
    if (locationFilterCard && locationFilterCard.classList.contains('show')) {
        if (locationFilterContainer && !locationFilterContainer.contains(e.target)) {
            closeLocationFilter();
        }
    }
});

// Global Escape key handler
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDatePicker();
        closeLocationFilter();
    }
});

// Initialize calendar on load
renderCalendar();

// ==========================================================================
// Custom Glass Dropdown Initializer for Filter Popups
// ==========================================================================
function initCustomDropdowns() {
    const selectWrappers = document.querySelectorAll('.location-select-wrap');
    selectWrappers.forEach(group => {
        const select = group.querySelector('select');
        if (!select || group.querySelector('.custom-dropdown-wrapper')) return;

        select.style.display = 'none';

        const options = Array.from(select.options);
        const initialSelected = select.options[select.selectedIndex] || options[0];
        const placeholder = initialSelected ? initialSelected.text : 'Select...';

        const wrapper = document.createElement('div');
        wrapper.className = 'custom-dropdown-wrapper';

        const trigger = document.createElement('div');
        trigger.className = 'custom-dropdown-trigger';
        trigger.tabIndex = 0;
        trigger.innerHTML = `
            <span class="selected-text ${select.value === '' ? 'is-placeholder' : ''}">${placeholder}</span>
            <i class="fa-solid fa-chevron-down dropdown-chevron"></i>
        `;

        const menu = document.createElement('div');
        menu.className = 'custom-dropdown-menu';

        if (options.length > 5) {
            const searchBox = document.createElement('div');
            searchBox.className = 'custom-dropdown-search-box';
            searchBox.innerHTML = `
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" class="custom-dropdown-search-input" placeholder="Search...">
            `;
            menu.appendChild(searchBox);

            const searchInput = searchBox.querySelector('.custom-dropdown-search-input');
            searchInput.addEventListener('click', (e) => e.stopPropagation());
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                const optionElements = optionsList.querySelectorAll('.custom-dropdown-option');
                let visibleCount = 0;
                optionElements.forEach(opt => {
                    const text = opt.textContent.toLowerCase();
                    if (text.includes(query)) {
                        opt.style.display = 'flex';
                        visibleCount++;
                    } else {
                        opt.style.display = 'none';
                    }
                });
                let emptyEl = menu.querySelector('.custom-dropdown-empty');
                if (visibleCount === 0) {
                    if (!emptyEl) {
                        emptyEl = document.createElement('div');
                        emptyEl.className = 'custom-dropdown-empty';
                        emptyEl.textContent = 'No matching options';
                        optionsList.appendChild(emptyEl);
                    }
                } else if (emptyEl) {
                    emptyEl.remove();
                }
            });
        }

        const optionsList = document.createElement('div');
        optionsList.className = 'custom-dropdown-options-list';

        options.forEach(opt => {
            const optionEl = document.createElement('div');
            optionEl.className = `custom-dropdown-option ${select.value === opt.value ? 'selected' : ''}`;
            optionEl.dataset.value = opt.value;
            optionEl.innerHTML = `
                <span>${opt.text}</span>
                <i class="fa-solid fa-check option-check"></i>
            `;

            optionEl.addEventListener('click', (e) => {
                e.stopPropagation();
                select.value = opt.value;
                const textSpan = trigger.querySelector('.selected-text');
                textSpan.textContent = opt.text;
                if (opt.value === '') {
                    textSpan.classList.add('is-placeholder');
                } else {
                    textSpan.classList.remove('is-placeholder');
                }

                optionsList.querySelectorAll('.custom-dropdown-option').forEach(o => o.classList.remove('selected'));
                optionEl.classList.add('selected');

                wrapper.classList.remove('active');
                select.dispatchEvent(new Event('change'));
            });

            optionsList.appendChild(optionEl);
        });

        menu.appendChild(optionsList);
        wrapper.appendChild(trigger);
        wrapper.appendChild(menu);
        group.appendChild(wrapper);

        const oldChevron = group.querySelector('.location-select-chevron');
        if (oldChevron) oldChevron.remove();

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const wasActive = wrapper.classList.contains('active');
            closeAllCustomDropdowns();
            if (!wasActive) {
                wrapper.classList.add('active');
            }
        });
    });
}

function closeAllCustomDropdowns() {
    document.querySelectorAll('.custom-dropdown-wrapper.active').forEach(w => w.classList.remove('active'));
}

document.addEventListener('click', () => {
    closeAllCustomDropdowns();
});

// Initialize Custom Dropdowns on page load
initCustomDropdowns();

// ==========================================================================
// Admin Profile Popup Controller
// ==========================================================================
const adminProfileTrigger = document.getElementById('adminProfileTrigger');
const adminProfileDropdown = document.getElementById('adminProfileDropdown');

function openAdminDropdown() {
    if (!adminProfileDropdown) return;
    adminProfileDropdown.classList.add('show');
    if (adminProfileTrigger) {
        adminProfileTrigger.classList.add('active');
        adminProfileTrigger.setAttribute('aria-expanded', 'true');
    }
}

function closeAdminDropdown() {
    if (!adminProfileDropdown) return;
    adminProfileDropdown.classList.remove('show');
    if (adminProfileTrigger) {
        adminProfileTrigger.classList.remove('active');
        adminProfileTrigger.setAttribute('aria-expanded', 'false');
    }
}

function toggleAdminDropdown(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    if (adminProfileDropdown && adminProfileDropdown.classList.contains('show')) {
        closeAdminDropdown();
    } else {
        openAdminDropdown();
    }
}

if (adminProfileTrigger) {
    adminProfileTrigger.addEventListener('click', toggleAdminDropdown);
}

// Close when clicking outside
document.addEventListener('click', function (e) {
    if (adminProfileDropdown && adminProfileDropdown.classList.contains('show')) {
        if (!adminProfileDropdown.contains(e.target) && !adminProfileTrigger.contains(e.target)) {
            closeAdminDropdown();
        }
    }
});

// Close on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeAdminDropdown();
    }
});



