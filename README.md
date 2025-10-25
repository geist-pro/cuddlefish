# Cuddlefish Website

A modern, sleek website for the Cuddlefish robotic avatar project - a soft flapping-wing floating robot for novel physical interactions and telepresence.

## Features

- **Full-screen video background** with the Cuddlefish robot floating
- **Modern design** using Poppins and Inter fonts from Google Fonts
- **Aquatic-inspired color palette** with blues, teals, and gradient effects
- **Smooth animations** and transitions throughout
- **Fully responsive** - works on desktop, tablet, and mobile
- **Accessibility** features and semantic HTML5
- **Contact information** for Mingyang Xu included

## Design Highlights

- **Typography**: Poppins (headings) + Inter (body text)
- **Color Palette**: Deep ocean blues, vibrant cyan, soft teal
- **Effects**: Glass morphism, gradient text, parallax scrolling
- **Animations**: Smooth fade-ins, hover effects, scroll indicators

## Sections

1. **Hero** - Full-screen video with "CUDDLEFISH" in large gradient letters
2. **About** - Introduction to the robotic avatar concept
3. **Features** - 6 key features with icon cards
4. **Interactions** - How people naturally interact with Cuddlefish
5. **Use Cases** - Real-world applications for the technology
6. **Contact** - Mingyang Xu's email address

## Development

### Running the Website

Start a local server from the `cuddlefish` directory:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

### Running Tests

The website includes comprehensive Playwright tests:

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Run tests
npx playwright test

# Run tests with browser visible
npx playwright test --headed

# View test report
npx playwright show-report
```

### Test Results

✅ 15/17 tests passing
- Hero section loads correctly
- Video background present and working
- Navigation functionality
- All sections accessible and responsive
- Mobile and tablet responsive design
- Contact information verified

## Files

- `index.html` - Main HTML structure
- `styles.css` - Modern CSS with animations and responsive design
- `script.js` - Interactive features and smooth scrolling
- `playwright-test.js` - Comprehensive test suite
- `playwright.config.js` - Playwright configuration
- `package.json` - Node.js dependencies

## Contact

For more information about the Cuddlefish project:

**Mingyang Xu**
Keio University, Graduate School of Media Design
mingyang@kmd.keio.ac.jp

## Research Support

This work is supported by:
- JST Moonshot R&D Program
- JST Presto
- Keio University Doctorate Student Grant-in-Aid Program
