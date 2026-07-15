# Testing Guide: Personal Financial Planning Scenario Planner

This document provides step-by-step instructions for testing the app locally and validating that all features work correctly.

## Quick Start Testing (2 minutes)

### 1. Open the App
- Navigate to the project folder
- Double-click `index.html` to open it in your browser
- You should see the app with sample values already filled in

### 2. Try Basic Interactions
- [ ] Page loads without errors
- [ ] All form fields are visible
- [ ] The three scenario buttons (Conservative, Moderate, Optimistic) are visible
- [ ] The Moderate button appears selected (highlighted)

### 3. Check Real-Time Updates
- [ ] Change the "Current Age" field from 35 to 30
- [ ] Verify results update immediately (no page refresh needed)
- [ ] The "Savings at Retirement" number should increase
- [ ] Change it back to 35

### 4. Check Scenario Switching
- [ ] Click the "Conservative" button
- [ ] Results should change (savings at retirement should decrease)
- [ ] Click "Optimistic" 
- [ ] Results should show higher savings
- [ ] Click "Moderate" to return to baseline

## Detailed Feature Testing (10 minutes)

### Input Validation
- [ ] Try entering a negative number in "Current Age" - app should handle gracefully
- [ ] Try entering 0 in "Monthly Savings" - calculations should work
- [ ] Try very large numbers (like 1,000,000) - no errors should occur
- [ ] All decimal values round correctly in display

### Major Expense Feature
- [ ] The "Major Expense" section is unchecked by default
- [ ] When unchecked, the detailed fields are hidden
- [ ] Check the checkbox - the fields appear
- [ ] Enter "Home Purchase" as description
- [ ] Enter 200000 as amount
- [ ] Enter 2028 as year
- [ ] Verify results update and show the impact
- [ ] Uncheck the box - fields hide again

### Buttons and Controls
- [ ] Click "Load Example Scenario" multiple times
  - [ ] Each click loads a different example
  - [ ] Values change in the form
  - [ ] Results update accordingly
- [ ] Click "Reset to Defaults"
  - [ ] A confirmation popup appears
  - [ ] After confirming, all values return to defaults
  - [ ] Page reloads properly
- [ ] Click "Print / Save as PDF"
  - [ ] Browser print dialog opens
  - [ ] Can save to PDF successfully

### Results Display
- [ ] All metric cards show values without errors
- [ ] Currency values are formatted with $ and commas
- [ ] Status card color changes based on plan status:
  - [ ] Green for "On Track"
  - [ ] Yellow/orange for "At Risk"
  - [ ] Red for "Off Track"
- [ ] Gap/Surplus section displays correctly
- [ ] Year-by-year chart displays properly

### Chart Testing
- [ ] Chart displays with a blue line and filled area
- [ ] Chart has a horizontal axis (years) and vertical axis (savings)
- [ ] Hovering over the chart shows a tooltip with values
- [ ] The dashed retirement year line is visible
- [ ] Chart is responsive (resize browser and it adjusts)

### Comparison Table
- [ ] Table shows all three scenarios
- [ ] Values are different for each scenario
- [ ] Conservative has lowest savings
- [ ] Optimistic has highest savings
- [ ] Status column shows appropriate status for each

### Assumptions Display
- [ ] Shows current scenario's assumptions
- [ ] Investment Return, Income Growth, and Inflation Rate are visible
- [ ] Values change when switching scenarios
- [ ] Values show as percentages

## Responsive Design Testing (5 minutes)

### Desktop (1200px and above)
- [ ] Open browser on desktop
- [ ] All elements are properly spaced
- [ ] Form fields are in multi-column grid
- [ ] Buttons are sized appropriately

### Tablet (768px to 1024px)
- [ ] Resize browser window to ~800px wide
- [ ] Layout adapts gracefully
- [ ] Form fields stack into fewer columns
- [ ] All content remains readable

### Mobile (480px to 768px)
- [ ] Resize browser to ~600px wide
- [ ] Layout is single column
- [ ] Form fields are full width
- [ ] Buttons are full width or stacked
- [ ] Chart is still visible and readable
- [ ] Text is not too small

### Very Small Mobile (< 480px)
- [ ] Resize to ~320px wide
- [ ] All content is readable
- [ ] Touch targets (buttons) are reasonably sized
- [ ] Horizontal scrolling is not needed (except for tables)

## Accessibility Testing (5 minutes)

### Keyboard Navigation
- [ ] Tab through form fields in order (no jumping around)
- [ ] Tab highlights all interactive elements (buttons, inputs)
- [ ] Can click buttons using Space or Enter key
- [ ] Focus is visible (outline shows where you are)

### Color Contrast
- [ ] Text is readable in normal light
- [ ] No reliance on color alone to convey information
  - [ ] Status is shown with color AND text
  - [ ] Charts have multiple visual elements

### Labels and Input Fields
- [ ] All input fields have associated labels
- [ ] Labels are properly aligned with inputs
- [ ] Help icons (?) appear for all fields
- [ ] Hovering over help icon shows tooltip

### Screen Reader Testing (if available)
- [ ] Use browser accessibility tools or screen reader
- [ ] Page title is announced
- [ ] Main headings are announced
- [ ] Form labels are associated with inputs
- [ ] Status messages are announced when results change

## Data Persistence Testing (3 minutes)

### localStorage
- [ ] Enter some custom values (e.g., age 45, savings $100,000)
- [ ] Refresh the page (F5 or Cmd+R)
- [ ] Values are restored from previous session
- [ ] Click "Reset to Defaults" and confirm
- [ ] Values return to defaults
- [ ] Refresh again - defaults are shown (not custom values)

## Calculation Accuracy Testing (5 minutes)

Test these specific scenarios to verify calculations:

### Scenario 1: Simple Case (No Major Expense)
**Inputs:**
- Current Age: 35
- Retirement Age: 65
- Current Savings: $100,000
- Monthly Savings: $500
- Investment Return: 6% (modify the field)
- Income Growth: 2% (modify the field)
- Inflation: 2.5% (modify the field)
- Retirement Spending: $50,000
- No major expense

**Expected:**
- Should show ~$700,000+ at retirement (exact amount depends on calculation timing)
- Status should be "On Track"
- Chart should show steady growth

### Scenario 2: With Major Expense
**Inputs:**
- Same as above, but add:
- Major expense: $100,000
- Year: 2026 (very soon)

**Expected:**
- Savings at retirement should be lower than Scenario 1
- Still shows "On Track" if sufficient savings remain
- Chart shows a dip when major expense is deducted

### Scenario 3: Off Track Case
**Inputs:**
- Current Age: 60
- Retirement Age: 65
- Current Savings: $10,000
- Monthly Savings: $100
- Retirement Spending: $60,000

**Expected:**
- Status shows "Off Track"
- Savings at retirement < $100,000
- Status card is red
- Gap shows large negative number

## Browser Compatibility Testing (5 minutes)

Test on available browsers:

- [ ] Chrome/Chromium (if available)
- [ ] Firefox (if available)
- [ ] Safari (if on Mac)
- [ ] Edge (if on Windows)

For each browser:
- [ ] App loads without errors
- [ ] All interactive elements work
- [ ] Chart renders correctly
- [ ] Colors display properly

## JavaScript Console Check (2 minutes)

- [ ] Open browser Developer Tools (F12 or Cmd+Option+I)
- [ ] Go to Console tab
- [ ] There should be NO red error messages
- [ ] There should be NO red warning messages
- [ ] Use the app normally and make sure no errors appear in console

## Network Testing (2 minutes)

- [ ] Disconnect from internet (turn off WiFi)
- [ ] Refresh the page - it should still load completely
- [ ] Use the app normally offline
- [ ] Everything should work (since there's no backend)
- [ ] Reconnect to internet

## Print/PDF Testing (3 minutes)

- [ ] Fill in some values
- [ ] Click "Print / Save as PDF"
- [ ] Print dialog appears
- [ ] Select "Save as PDF"
- [ ] Save the PDF file
- [ ] Open the PDF file
- [ ] Verify:
  - [ ] All results are visible
  - [ ] Chart prints correctly
  - [ ] No buttons are visible in PDF
  - [ ] Layout is readable on printed page
  - [ ] No background colors that make it hard to read

## Security & Privacy Checklist

- [ ] No passwords are requested
- [ ] No email or personal data is collected
- [ ] No data is sent to any server
- [ ] localStorage data is stored only locally
- [ ] Clearing browser data clears the app's data
- [ ] App works in incognito/private mode (localStorage disabled)
- [ ] No tracking pixels or analytics

## Performance Testing

- [ ] App loads quickly (should be under 1 second)
- [ ] Page responds immediately to input changes
- [ ] No lag when typing in fields
- [ ] Chart draws smoothly
- [ ] Chart updates smoothly when values change
- [ ] No memory leaks (app stays responsive after 10+ minutes of use)

## Final Verification Checklist

Before considering the app complete:

- [ ] All files are present in the project folder
- [ ] No JavaScript errors in console
- [ ] App is fully functional on desktop
- [ ] App is responsive on mobile/tablet
- [ ] All three scenarios work and show different results
- [ ] Major expense feature works correctly
- [ ] Buttons all function properly
- [ ] localStorage saves/restores data
- [ ] Print to PDF works
- [ ] Disclaimer is prominent and clear
- [ ] README.md is clear and complete
- [ ] .gitignore is set up correctly
- [ ] LICENSE is included
- [ ] No sensitive data is stored or transmitted

---

## Troubleshooting During Testing

### Issue: "File not found" error
**Solution:** Make sure all files are in the same folder. The app needs:
- index.html
- style.css
- app.js
- calculations.js

### Issue: Blank page or missing layout
**Solution:** 
- Refresh the page (Ctrl+F5 or Cmd+Shift+R to clear cache)
- Check browser console for errors (F12)
- Make sure JavaScript is enabled

### Issue: Chart doesn't show
**Solution:**
- Check internet connection (Chart.js loads from CDN)
- Check browser console for errors
- Try a different browser

### Issue: Numbers don't update
**Solution:**
- Make sure you're typing in the form fields
- Click outside the input field to trigger update
- Refresh the page

### Issue: Values don't save between sessions
**Solution:**
- Check if localStorage is enabled in browser
- Try with a different browser
- This is expected in private/incognito mode

---

## Test Results Record

Date tested: ________________

Tester name: ________________

Browser: ________________  Version: ________________

Operating System: ________________

Overall result: ☐ PASS  ☐ FAIL

Issues found: _________________________________________________________________

____________________________________________________________________________

Notes: ________________________________________________________________________

____________________________________________________________________________
