# Personal Financial Planning Scenario Planner

## What This App Does

This is an **educational web app** that helps you explore different financial futures for retirement planning. You input your current financial situation, and the app calculates projections under three different scenarios:

- **Conservative**: Lower investment returns, cautious growth assumptions
- **Moderate**: Balanced assumptions (recommended starting point)
- **Optimistic**: Higher returns, growth-focused assumptions

The app then shows you:
- How much you might save by retirement
- Whether your plan appears on track
- Year-by-year projections in an interactive chart
- How your plan compares across different scenarios

**Important**: This is an **educational demonstration only**, not financial advice. Always consult a qualified financial advisor before making financial decisions.

---

## Project File Structure

```
.
├── index.html              Main HTML file (the content and structure)
├── style.css               All styling and responsive design
├── app.js                  Main application logic and event handling
├── calculations.js         Financial calculation functions
├── README.md               This file
├── .gitignore              Tells Git which files to ignore
└── LICENSE                 MIT license (you can use and modify this freely)
```

---

## How to Use Locally

### Prerequisites
You need:
- A web browser (Chrome, Firefox, Safari, Edge, etc.)
- A text editor (optional, only if you want to modify the code)
- Git (optional, only if you want to use GitHub)

### Preview the App on Your Computer

1. **Download the files**: 
   - Download all files from this repository, or clone it using Git

2. **Open the app**:
   - Locate the `index.html` file
   - Double-click it to open in your web browser
   - The app should load and be ready to use immediately

3. **Try it out**:
   - The app comes with example values already filled in
   - Change any numbers and see the results update in real time
   - Click "Load Example Scenario" to see different profiles
   - Click "Print / Save as PDF" to save a report

---

## How to Publish to GitHub Pages (Free Public Website)

This app is designed to be hosted for free on **GitHub Pages**. Here's how:

### Step 1: Create a GitHub Account
If you don't have one:
1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Follow the steps to create your free account

### Step 2: Create a New Repository

1. Go to [github.com/new](https://github.com/new)
2. Name your repository (example: `financial-planner`)
3. Add a description (optional): "Personal Financial Planning Scenario Planner"
4. Choose **Public** (so others can access it)
5. Click "Create repository"

### Step 3: Upload Your Files

**Option A: Using the Web Interface (Easiest)**

1. On your new repository page, click "Upload files"
2. Drag and drop all the files from your project folder:
   - `index.html`
   - `style.css`
   - `app.js`
   - `calculations.js`
   - `README.md`
   - `.gitignore`
   - `LICENSE`
3. Click "Commit changes"

**Option B: Using Git Command Line**

1. Open Terminal (Mac/Linux) or Command Prompt (Windows)
2. Navigate to your project folder:
   ```bash
   cd path/to/your/project
   ```
3. Initialize Git and add files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Financial planner app"
   ```
4. Add the remote repository (replace `YOUR-USERNAME` and `YOUR-REPO-NAME`):
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: Select **Deploy from a branch**
   - Branch: Select **main** and **/root**
   - Click "Save"
5. Wait 1-2 minutes for deployment
6. You'll see a message: "Your site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`"

### Step 5: Access Your Public Website

Your app is now live! Visit:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

Example: `https://janedoe.github.io/financial-planner/`

You can share this URL with anyone. They can use the app without downloading anything.

---

## Making Changes After Publishing

### Via Web Browser (Easiest)

1. Go to your repository on GitHub
2. Click the file you want to edit (e.g., `index.html`)
3. Click the pencil icon (edit)
4. Make your changes
5. Click "Commit changes"
6. The website updates automatically in 1-2 minutes

### Via Git (If You Know Command Line)

1. Make changes on your computer
2. Commit and push:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. The website updates automatically in 1-2 minutes

---

## Customizing the App

The app is built with plain HTML, CSS, and JavaScript—no special tools needed.

### Common Customizations

**Change the default values:**
- Open `index.html` in a text editor
- Find the `<input>` tags with `value="..."`
- Change any number to your preferred default

**Change colors:**
- Open `style.css`
- Find the `:root` section at the top
- Modify the `--color-primary` and other color variables

**Change the disclaimer:**
- Open `index.html`
- Find the `<div class="disclaimer">` section
- Edit the text as needed

**Add more scenarios:**
- Open `calculations.js`
- Add a new entry to the `SCENARIOS` object
- Update `index.html` to add a button for it

---

## Understanding the Calculations

### How Savings Grow Each Year

1. **Start** with previous year's balance
2. **Add** annual savings (your monthly contribution × 12)
3. **Apply** investment returns: `Balance × (1 + Return %)`
4. **Deduct** any major expense that occurs that year
5. **Repeat** until retirement

### Retirement Spending

Your retirement spending is adjusted for inflation from today's value:
```
Inflated Spending = Starting Spending × (1 + Inflation %)^Years
```

### Plan Status

- **On Track**: Your savings appear sufficient for retirement
- **At Risk**: Savings might run out before the end of retirement
- **Off Track**: Significant additional planning needed

---

## Important Limitations & Disclaimers

⚠️ **This is an educational tool, not financial advice.**

The calculator makes many simplifications and does NOT include:
- **Taxes** (income tax, capital gains tax, investment taxes)
- **Social Security or pensions** (only models your personal savings)
- **Variability** (real returns and inflation change year to year)
- **Market volatility** (assumes steady growth)
- **Life changes** (job loss, health emergencies, major life events)
- **Withdrawal strategies** (assumes equal annual spending)
- **Investment fees** (assumes gross returns)
- **Longevity risk** (doesn't model living to 100+)

**Before making financial decisions, please:**
1. Consult a qualified financial advisor
2. Consider consulting a tax professional
3. Review Social Security estimates at ssa.gov
4. Research comprehensive retirement planning tools

---

## Technical Details

### Browser Compatibility
Works on all modern browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility
- Keyboard navigable (Tab through all inputs)
- Screen-reader friendly (semantic HTML)
- High contrast design
- Mobile-friendly responsive layout

### Data Privacy
- **No data is sent to any server**
- All calculations happen in your browser
- Data saved in your browser only (localStorage)
- Refresh page or clear browser data to reset

### Performance
- Loads in under 1 second
- Chart.js library loaded from CDN (30KB)
- No tracking or analytics

---

## Troubleshooting

### The app won't load
- Check that all files are in the same folder
- Make sure you opened `index.html` (not another file)
- Try a different browser
- Check that JavaScript is enabled

### Charts don't show
- Refresh the page (Ctrl+R or Cmd+R)
- Check your internet connection (the chart library loads from the internet)
- Try a different browser

### Numbers don't update
- Make sure you're typing in the input fields (not labels)
- Refresh the page
- Clear browser cache and try again

### Print/PDF looks wrong
- Use the browser's built-in print feature (Ctrl+P or Cmd+P)
- Choose "Print to PDF" or "Save as PDF"
- Adjust margins to "Minimal" for best results
- Try a different browser if it still doesn't work

---

## License

This project is licensed under the MIT License—you can freely use, modify, and share it. See the `LICENSE` file for details.

---

## Questions?

- **For technical help with GitHub Pages**: See [GitHub Pages documentation](https://docs.github.com/en/pages)
- **For financial questions**: Consult a qualified financial advisor
- **For app issues**: Check that all files are present and in the same folder

---

## Credits

Built as an educational demonstration for the AI Educators Pilot workshop.

Designed to be:
- ✅ Beginner-friendly
- ✅ No backend or database required
- ✅ Free to host on GitHub Pages
- ✅ Fully functional offline
- ✅ Privacy-respecting (no data tracking)

---

**Last updated:** 2026-07-14

**Status:** Ready for GitHub Pages deployment
