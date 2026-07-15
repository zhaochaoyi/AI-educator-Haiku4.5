// ========================================
// Personal Financial Planning Scenario Planner
// Main Application Logic
// ========================================

let currentScenario = 'moderate';
let chart = null;
const STORAGE_KEY = 'financialPlannerData';

/**
 * Initialize the application
 */
function initApp() {
    loadSavedData();
    attachEventListeners();
    updateAllResults();
}

/**
 * Attach all event listeners
 */
function attachEventListeners() {
    // Scenario buttons
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const scenario = e.currentTarget.dataset.scenario;
            selectScenario(scenario);
        });
    });

    // All input fields
    const inputs = [
        'currentAge', 'retirementAge', 'currentIncome', 'currentSavings',
        'monthlySavings', 'investmentReturn', 'incomeGrowth', 'inflationRate',
        'currentExpenses', 'retirementSpending', 'majorExpenseAmount',
        'majorExpenseYear', 'majorExpenseDescription',
    ];

    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', handleInputChange);
        }
    });

    // Major expense checkbox
    const majorExpenseCheckbox = document.getElementById('hasMajorExpense');
    majorExpenseCheckbox.addEventListener('change', (e) => {
        const fields = document.getElementById('majorExpenseFields');
        fields.style.display = e.target.checked ? 'block' : 'none';
        handleInputChange();
    });

    // Control buttons
    document.getElementById('resetBtn').addEventListener('click', resetToDefaults);
    document.getElementById('exampleBtn').addEventListener('click', loadExampleScenario);
}

/**
 * Handle input change: save data and update results
 */
function handleInputChange() {
    saveUserData();
    updateAllResults();
}

/**
 * Select a scenario and update display
 */
function selectScenario(scenario) {
    currentScenario = scenario;

    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.scenario === scenario);
    });

    updateAllResults();
}

/**
 * Collect current user inputs from form
 */
function getInputs() {
    return {
        currentAge: parseInt(document.getElementById('currentAge').value) || 35,
        retirementAge: parseInt(document.getElementById('retirementAge').value) || 67,
        currentIncome: parseFloat(document.getElementById('currentIncome').value) || 60000,
        currentSavings: parseFloat(document.getElementById('currentSavings').value) || 25000,
        monthlySavings: parseFloat(document.getElementById('monthlySavings').value) || 500,
        investmentReturn: parseFloat(document.getElementById('investmentReturn').value) || 6.5,
        incomeGrowth: parseFloat(document.getElementById('incomeGrowth').value) || 2.5,
        inflationRate: parseFloat(document.getElementById('inflationRate').value) || 2.5,
        currentExpenses: parseFloat(document.getElementById('currentExpenses').value) || 45000,
        retirementSpending: parseFloat(document.getElementById('retirementSpending').value) || 40000,
        hasMajorExpense: document.getElementById('hasMajorExpense').checked,
        majorExpenseDescription: document.getElementById('majorExpenseDescription').value || 'Major Expense',
        majorExpenseAmount: parseFloat(document.getElementById('majorExpenseAmount').value) || 50000,
        majorExpenseYear: parseInt(document.getElementById('majorExpenseYear').value) || 2030,
    };
}

/**
 * Update all results and visualizations
 */
function updateAllResults() {
    const inputs = getInputs();
    const currentResults = calculateResults(inputs, currentScenario);
    const allScenarios = calculateAllScenarios(inputs);

    // Update metrics
    updateMetrics(inputs, currentResults);

    // Update gap/surplus
    updateGapSection(currentResults);

    // Update chart
    updateChart(currentResults.projection, inputs);

    // Update scenario comparison table
    updateComparisonTable(inputs, allScenarios);

    // Update assumptions display
    updateAssumptions(currentResults.assumptions);
}

/**
 * Update the main metric cards
 */
function updateMetrics(inputs, results) {
    // Savings at retirement
    document.getElementById('savingsAtRetirement').textContent = formatCurrency(results.savingsAtRetirement);
    document.getElementById('yearsToRetirement').textContent = inputs.retirementAge - inputs.currentAge;

    // After major expense
    const majorLabel = document.getElementById('majorExpenseLabel');
    if (inputs.hasMajorExpense && results.majorExpenseOccurred) {
        majorLabel.textContent = `after ${inputs.majorExpenseDescription || 'major expense'} (${inputs.majorExpenseYear})`;
    } else if (inputs.hasMajorExpense && !results.majorExpenseOccurred) {
        majorLabel.textContent = `before ${inputs.majorExpenseDescription || 'major expense'} (${inputs.majorExpenseYear})`;
    } else {
        majorLabel.textContent = 'no major expenses planned';
    }
    document.getElementById('savingsAfterMajor').textContent = formatCurrency(results.savingsAfterMajor);

    // First-year retirement spending
    document.getElementById('firstYearSpending').textContent = formatCurrency(results.firstYearRetirementSpending);

    // Plan status
    const statusCard = document.getElementById('statusCard');
    statusCard.className = 'metric-card status-card ' + results.statusClass;
    document.getElementById('planStatus').textContent = results.status;
    document.getElementById('planDetails').textContent = results.statusDetails;
}

/**
 * Update the gap/surplus display
 */
function updateGapSection(results) {
    const gapValue = document.getElementById('gapValue');
    const gapExplanation = document.getElementById('gapExplanation');
    const gapTitle = document.getElementById('gapTitle');

    if (results.gap > 0) {
        gapValue.textContent = formatCurrency(Math.abs(results.gap));
        gapValue.className = 'gap-value negative';
        gapExplanation.textContent = `You would need approximately ${formatCurrency(Math.abs(results.gap))} more to comfortably cover ${20} years of retirement spending.`;
        gapTitle.textContent = 'Projected Shortfall';
    } else {
        gapValue.textContent = formatCurrency(Math.abs(results.gap));
        gapValue.className = 'gap-value positive';
        gapExplanation.textContent = `Your projected savings exceed a conservative 20-year retirement estimate by ${formatCurrency(Math.abs(results.gap))}.`;
        gapTitle.textContent = 'Projected Surplus';
    }
}

/**
 * Update the projection chart
 */
function updateChart(projection, inputs) {
    const ctx = document.getElementById('projectionChart');
    if (!ctx) return;

    const labels = projection.map(p => p.year);
    const data = projection.map(p => p.savings);
    const retirementYear = new Date().getFullYear() + (inputs.retirementAge - inputs.currentAge);

    // Create gradient for the chart area
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.2)');
    gradient.addColorStop(1, 'rgba(37, 99, 235, 0.01)');

    // Destroy existing chart if it exists
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Projected Savings Balance',
                    data: data,
                    borderColor: 'rgb(37, 99, 235)',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: 'rgb(37, 99, 235)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    callbacks: {
                        title: (context) => {
                            return `Year ${context[0].label}`;
                        },
                        label: (context) => {
                            return `Savings: ${formatCurrency(context.parsed.y)}`;
                        },
                    },
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        maxTicksLimit: 10,
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => formatCurrency(value),
                    },
                },
            },
            annotation: {
                drawTime: 'afterDatasetsDraw',
                annotations: {
                    retirementLine: {
                        type: 'line',
                        xMin: retirementYear,
                        xMax: retirementYear,
                        borderColor: 'rgba(100, 100, 100, 0.5)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                    },
                },
            },
        },
    });

    // Add a retirement year line manually
    const plugin = {
        afterDatasetsDraw(chart) {
            const { ctx, chartArea: { left, top, width, height } } = chart;
            const xScale = chart.scales.x;
            const yScale = chart.scales.y;

            // Find the x position of the retirement year
            const retirementIndex = projection.findIndex(p => p.year === retirementYear);
            if (retirementIndex !== -1) {
                const xPos = xScale.getPixelForValue(projection[retirementIndex].year);
                ctx.save();
                ctx.strokeStyle = 'rgba(100, 100, 100, 0.4)';
                ctx.setLineDash([5, 5]);
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(xPos, top);
                ctx.lineTo(xPos, top + height);
                ctx.stroke();
                ctx.restore();

                // Add label
                ctx.save();
                ctx.fillStyle = 'rgba(100, 100, 100, 0.6)';
                ctx.font = '12px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Retirement', xPos, top - 5);
                ctx.restore();
            }
        },
    };

    chart.plugins.register(plugin);
}

/**
 * Update the scenario comparison table
 */
function updateComparisonTable(inputs, allScenarios) {
    for (const scenarioKey in allScenarios) {
        const results = allScenarios[scenarioKey];
        document.getElementById(`comp-${scenarioKey}-savings`).textContent =
            formatCurrency(results.savingsAtRetirement);
        document.getElementById(`comp-${scenarioKey}-status`).textContent =
            results.status;
    }
}

/**
 * Update the assumptions display
 */
function updateAssumptions(assumptions) {
    document.getElementById('assume-return').textContent = formatPercent(assumptions.investmentReturn);
    document.getElementById('assume-growth').textContent = formatPercent(assumptions.incomeGrowth);
    document.getElementById('assume-inflation').textContent = formatPercent(assumptions.inflationRate);
}

/**
 * Save user data to localStorage
 */
function saveUserData() {
    const data = {
        scenario: currentScenario,
        inputs: getInputs(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Load saved data from localStorage
 */
function loadSavedData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            currentScenario = data.scenario || 'moderate';

            // Restore inputs
            for (const [key, value] of Object.entries(data.inputs)) {
                const element = document.getElementById(key);
                if (element) {
                    if (element.type === 'checkbox') {
                        element.checked = value;
                        // Show/hide major expense fields
                        if (key === 'hasMajorExpense') {
                            document.getElementById('majorExpenseFields').style.display =
                                value ? 'block' : 'none';
                        }
                    } else {
                        element.value = value;
                    }
                }
            }

            // Update scenario button
            document.querySelectorAll('.scenario-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.scenario === currentScenario);
            });
        } catch (e) {
            console.error('Failed to load saved data:', e);
        }
    }
}

/**
 * Reset to default values
 */
function resetToDefaults() {
    if (confirm('Reset all values to defaults?')) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
}

/**
 * Load an example scenario
 */
function loadExampleScenario() {
    const examples = {
        'Young Professional': {
            currentAge: 28,
            retirementAge: 67,
            currentIncome: 65000,
            currentSavings: 12000,
            monthlySavings: 600,
            retirementSpending: 45000,
            hasMajorExpense: true,
            majorExpenseDescription: 'Home Purchase',
            majorExpenseAmount: 100000,
            majorExpenseYear: 2027,
        },
        'Mid-Career': {
            currentAge: 45,
            retirementAge: 67,
            currentIncome: 95000,
            currentSavings: 150000,
            monthlySavings: 1200,
            retirementSpending: 60000,
            hasMajorExpense: false,
        },
        'Late-Career': {
            currentAge: 55,
            retirementAge: 70,
            currentIncome: 120000,
            currentSavings: 350000,
            monthlySavings: 2000,
            retirementSpending: 70000,
            hasMajorExpense: true,
            majorExpenseDescription: 'Travel Fund',
            majorExpenseAmount: 50000,
            majorExpenseYear: 2028,
        },
    };

    const exampleNames = Object.keys(examples);
    const selected = exampleNames[Math.floor(Math.random() * exampleNames.length)];
    const example = examples[selected];

    // Load the example data
    for (const [key, value] of Object.entries(example)) {
        const element = document.getElementById(key);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = value;
                if (key === 'hasMajorExpense') {
                    document.getElementById('majorExpenseFields').style.display =
                        value ? 'block' : 'none';
                }
            } else {
                element.value = value;
            }
        }
    }

    handleInputChange();
    alert(`Loaded example: ${selected}`);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
