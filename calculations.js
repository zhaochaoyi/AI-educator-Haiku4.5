// ========================================
// Financial Calculation Engine
// All calculations are educational approximations
// ========================================

const SCENARIOS = {
    conservative: {
        name: 'Conservative',
        investmentReturn: 4.0,
        incomeGrowth: 1.5,
        inflationRate: 3.0,
    },
    moderate: {
        name: 'Moderate',
        investmentReturn: 6.5,
        incomeGrowth: 2.5,
        inflationRate: 2.5,
    },
    optimistic: {
        name: 'Optimistic',
        investmentReturn: 8.5,
        incomeGrowth: 3.5,
        inflationRate: 2.0,
    },
};

/**
 * Get the assumptions for a given scenario.
 * Merges scenario defaults with user-provided overrides.
 */
function getScenarioAssumptions(scenario, userInputs) {
    const baseAssumptions = SCENARIOS[scenario];
    return {
        investmentReturn: userInputs.investmentReturn ?? baseAssumptions.investmentReturn,
        incomeGrowth: userInputs.incomeGrowth ?? baseAssumptions.incomeGrowth,
        inflationRate: userInputs.inflationRate ?? baseAssumptions.inflationRate,
    };
}

/**
 * Calculate year-by-year savings projection.
 * Returns an array of objects with year, age, savings, income, and cumulative contributions.
 */
function calculateProjection(inputs, scenario) {
    const assumptions = getScenarioAssumptions(scenario, inputs);

    let balance = inputs.currentSavings;
    let currentIncome = inputs.currentIncome;
    let currentYear = new Date().getFullYear();
    let age = inputs.currentAge;

    const projection = [];

    for (let year = 0; year <= (inputs.retirementAge - inputs.currentAge); year++) {
        const yearValue = currentYear + year;

        // Add annual savings
        const annualSavings = inputs.monthlySavings * 12;
        balance += annualSavings;

        // Apply investment returns
        balance = balance * (1 + assumptions.investmentReturn / 100);

        // Deduct major expense if it occurs in this year
        if (inputs.hasMajorExpense && yearValue === inputs.majorExpenseYear) {
            balance -= inputs.majorExpenseAmount;
            balance = Math.max(0, balance); // Don't go negative
        }

        // Record projection point
        projection.push({
            year: yearValue,
            age: age + year,
            savings: Math.round(balance),
            income: Math.round(currentIncome),
        });

        // Grow income for next year
        currentIncome = currentIncome * (1 + assumptions.incomeGrowth / 100);
    }

    return projection;
}

/**
 * Calculate all key results for the current scenario.
 */
function calculateResults(inputs, scenario) {
    const assumptions = getScenarioAssumptions(scenario, inputs);
    const projection = calculateProjection(inputs, scenario);

    const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
    const savingsAtRetirement = projection[yearsToRetirement]?.savings || 0;

    // Calculate inflation-adjusted retirement spending
    const inflationFactor = Math.pow(1 + assumptions.inflationRate / 100, yearsToRetirement);
    const firstYearRetirementSpending = Math.round(inputs.retirementSpending * inflationFactor);

    // Determine if major expense has already occurred or will occur
    const currentYear = new Date().getFullYear();
    let savingsAfterMajor = savingsAtRetirement;
    let majorExpenseOccurred = false;

    if (inputs.hasMajorExpense) {
        const majorExpenseOccursBeforeRetirement = inputs.majorExpenseYear < (currentYear + yearsToRetirement);
        if (majorExpenseOccursBeforeRetirement) {
            // The major expense is already deducted in the projection
            majorExpenseOccurred = true;
            savingsAfterMajor = savingsAtRetirement;
        } else {
            // The major expense happens after retirement, so deduct it now
            savingsAfterMajor = savingsAtRetirement - inputs.majorExpenseAmount;
            savingsAfterMajor = Math.max(0, savingsAfterMajor);
        }
    }

    // Estimate how long savings will last (simple calculation)
    let yearsCovered = 0;
    if (firstYearRetirementSpending > 0) {
        yearsCovered = Math.floor(savingsAtRetirement / firstYearRetirementSpending);
    }

    // Calculate gap or surplus
    // Simple metric: Does your savings cover at least 20 years of retirement spending?
    const minYearsForComfortable = 20;
    const requiredSavings = firstYearRetirementSpending * minYearsForComfortable;
    const gap = requiredSavings - savingsAtRetirement;

    // Determine plan status
    let status = 'On Track';
    let statusClass = 'on-track';
    let statusDetails = 'Your projected savings appear sufficient.';

    if (savingsAtRetirement < firstYearRetirementSpending) {
        status = 'Off Track';
        statusClass = 'off-track';
        statusDetails = 'Your savings may not cover first-year spending.';
    } else if (gap > 0) {
        status = 'At Risk';
        statusClass = 'at-risk';
        statusDetails = `Savings may not last through retirement (covers ~${yearsCovered} years).`;
    } else {
        statusDetails = `Your savings could cover ~${yearsCovered}+ years of spending.`;
    }

    return {
        savingsAtRetirement,
        savingsAfterMajor,
        firstYearRetirementSpending,
        gap: Math.round(gap),
        status,
        statusClass,
        statusDetails,
        yearsCovered,
        projection,
        assumptions,
        majorExpenseOccurred,
    };
}

/**
 * Format a number as USD currency string.
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

/**
 * Format a percentage.
 */
function formatPercent(value) {
    return `${Math.round(value * 10) / 10}%`;
}

/**
 * Get all scenario results (for comparison table).
 */
function calculateAllScenarios(inputs) {
    const results = {};
    for (const scenarioKey in SCENARIOS) {
        results[scenarioKey] = calculateResults(inputs, scenarioKey);
    }
    return results;
}
