# AI Occupations Dashboard

A responsive web dashboard for managing AI agents specialized in different human occupations. Customize with your own occupations, icons, and colors.

## Features

- **Responsive Design**: Works great on mobile and desktop
- **Customizable Occupations**: Add, edit, and remove occupations with custom icons and colors
- **Per-Occupation Notes**: Save context and notes for each AI agent
- **Agent Integration**: Configure custom agent URLs for each occupation
- **Local Storage**: All data persists in your browser

## Quick Start

1. Open `index.html` in your web browser
2. Click the "+" button or "Customize" to add occupations
3. Click any occupation card to open its dedicated agent page
4. Add notes and context for each AI agent

## Default Occupations

The dashboard comes with these pre-configured occupations:
- 🧑‍⚕️ Dermatologist
- 💪 Fitness Coach  
- 💻 Software Developer
- 👨‍🍳 Chef
- 👩‍🏫 Teacher
- ⚖️ Lawyer

## Customization

### Adding Occupations
1. Click the "+" button or "Customize"
2. Fill in the title, icon (emoji or 1-3 characters), and accent color
3. Optionally add an agent URL for external AI integration
4. Click "Save"

### Editing Occupations
1. Click "Customize" to see all existing occupations
2. Click any occupation in the list to edit it
3. Make your changes and save

### Agent Integration
- Set an agent URL when creating/editing occupations
- The agent page will display this URL for integration reference
- You can embed iframes or integrate with any AI service

## File Structure

```
ai-dash/
├── index.html      # Main dashboard
├── agent.html      # Individual agent page
├── styles.css      # Responsive styling
├── app.js          # Dashboard functionality
└── README.md       # This file
```

## Browser Compatibility

Works in all modern browsers that support:
- CSS Grid
- localStorage
- ES6+ JavaScript

## Data Storage

All data is stored locally in your browser using localStorage:
- Occupations: `occupations-dashboard`
- Notes: `occupation-notes-{id}`

No server required - everything runs client-side!
