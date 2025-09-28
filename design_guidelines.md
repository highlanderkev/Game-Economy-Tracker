# Game Economy Tracker - Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from modern gaming applications like Discord, Twitch, and Steam, combined with financial tracking apps like Mint. This creates a familiar gaming aesthetic while maintaining utility-focused functionality.

## Core Design Elements

### Color Palette
**Dark Mode Primary:**
- Background: 225 15% 8% (deep dark blue-gray)
- Surface: 225 12% 12% (elevated dark surface)
- Card backgrounds: 225 10% 15%

**Accent Colors:**
- Neon Green: 142 70% 55% (primary accent for positive values, profit indicators)
- Electric Purple: 285 85% 65% (secondary accent for highlights, currency symbols)
- Neutral text: 220 15% 85%
- Muted text: 220 10% 65%

### Typography
**Fonts:** Inter (primary) and JetBrains Mono (currency values, calculations)
- Headings: 600-700 weight, larger letter spacing
- Body: 400-500 weight
- Currency values: Mono font, 500 weight for emphasis
- Numbers: Tabular figures for alignment

### Layout System
**Tailwind Spacing:** Consistent use of 4, 6, 8, and 12 units
- Container padding: p-6
- Card spacing: space-y-4
- Button padding: px-6 py-3
- Grid gaps: gap-6

### Component Library

**Navigation:**
- Dark sidebar with subtle purple glow on active items
- Clean icon-based navigation with neon green indicators

**Cards:**
- Game cards with subtle borders and hover states
- Currency cards showing real-world cost calculations
- Dark backgrounds with neon accent borders on hover

**Data Display:**
- Tables with alternating row colors in dark theme
- Currency symbols with purple highlights
- Cost-per-unit calculations prominently displayed with green text
- Progress bars using neon green for positive economics

**Forms:**
- Dark input fields with neon focus states
- Purple labels and green validation states
- Floating labels for currency input fields

**Dashboard Elements:**
- KPI cards showing total games tracked and average cost efficiency
- Quick-add floating action button with neon green background
- Game economy comparison charts with purple/green gradients

### Visual Hierarchy
- Large, bold game titles with subtle purple underlines
- Currency values emphasized with larger font sizes and green coloring
- Real-world costs clearly separated with different background shades
- Cost-per-unit calculations highlighted as the key metric

### Interactive States
- Subtle neon glow effects on hover for interactive elements
- Purple-to-green gradient loading states
- Smooth transitions (200ms) for all state changes
- Focus states using neon green outlines

### Gaming-Specific Elements
- Currency symbols and game icons prominently displayed
- Economic efficiency indicators using gaming terminology
- "Profit/Loss" style indicators for cost effectiveness
- Achievement-style badges for cost-saving milestones

The design balances the excitement of gaming aesthetics with the precision needed for financial tracking, creating an interface that feels native to gaming culture while providing clear, actionable economic insights.