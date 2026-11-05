# Goalie Tracker

Goalie Tracker is a lightweight, browser-based application for tracking a hockey goalie’s in-game performance. It is designed to help a goalie, coach, or team staff record shots against, goals allowed, saves, save percentage, and per-period breakdowns during a game, without needing a complex app, database, or subscription.

This project is a single-page web app built with plain HTML, CSS, and JavaScript. It runs in the browser and stores data locally on the device so users can keep season logs and export game summaries for later review or sharing.

## What the application does

At its core, the app lets a user track a goalie’s game statistics in real time.

### 1. Track shots and goals by period
The app has three period selectors:
- P1
- P2
- P3

Users can choose the current period and then increment or decrement the totals for:
- Shots against
- Goals allowed

The app keeps separate counts for each period, which makes it useful for recording exactly how a goalie performed in each segment of the game.

### 2. Automatically calculate saves and save percentage
For the selected period, the app calculates:
- Saves = shots - goals
- Save % = saves / shots

This is shown in real time. If the user has not recorded any shots, the save percentage is displayed as 0.000 to avoid division-by-zero issues.

The app also prevents illogical data entry:
- A goal cannot exceed the number of shots in the current period.
- Shots cannot be reduced below the current total of goals in a period.

This keeps the stats consistent and prevents impossible results.

### 3. Track opponent and date information
Each game can include:
- the opponent name
- the current date automatically associated with the saved game log

Users can enter an opponent name in the “Opponent” field before saving the game. If no opponent is entered, the app defaults to “Unknown.”

### 4. Save complete games to local history
When the user clicks “SAVE GAME,” the app stores the finished game in browser localStorage.

Each saved game includes:
- date
- opponent
- total shots
- total goals
- saves
- save percentage
- per-period breakdowns for P1, P2, and P3

This creates a simple season log of games without requiring a backend, account system, or remote database.

### 5. Review season history
The “Season Games” section displays a history of all previously saved games.

Each game entry shows:
- the date and opponent
- total shots, goals, saves, and save percentage
- per-period totals

This makes it easy to review performance over multiple games in one session.

### 6. Export game data
Each saved game can be exported in two formats:
- CSV
- JSON

This is useful for:
- sending stats to a coach
- keeping records outside the app
- importing data into spreadsheets or other tools
- archiving game summaries

The CSV export includes:
- date
- opponent
- overall shots, goals, saves, and save percentage
- each period’s shots and goals

The JSON export includes the same information in a structured format.

### 7. Delete individual games or clear the full log
The app allows users to:
- delete one saved game from history
- clear all saved season logs with confirmation

This is helpful if a user needs to correct an entry or start a new season without carrying old data forward.

### 8. Dark mode and responsive design
The app includes a theme toggle for dark mode and light mode.

The interface is designed to work on mobile devices and smaller screens, which matters for coaches or goalies who may want to use it on a phone in the rink or on a bench.

### 9. Installable progressive web app (PWA)
The app includes:
- a manifest file
- a service worker
- a standalone app configuration

This makes the app behave like a small installable web application. It can be opened in a browser and, depending on the device/browser, installed to the home screen or app launcher.

That makes it especially practical for rink-side use where a simple, fast, no-login tool is preferred.

## Who it is for

This app is designed for anyone who needs to track goalie game statistics quickly and simply. The primary audience includes:

### Hockey goalies
Goalies can use the app to track their own performance during a game, including:
- shot volume faced
- goals allowed
- saves made
- save percentage
- period-by-period trends

Because it is fast and tactile, it is useful during live play when the user needs to update numbers quickly without a complicated interface.

### Coaches and assistant coaches
Coaches can use the app to monitor a goalie’s performance in real time and later review the game logs. It is particularly useful for recording:
- how many shots the goalie faced in each period
- their save percentage by period
- trends in performance across games

### Team staff and trainers
This app is also useful for team support staff who need a simple note-taking method for evaluating goalie performance over a season.

### Parents or volunteers keeping game records
Parents, team volunteers, or casual organizers who want to track goalie stats without a paid subscription or complicated sports software can use it easily.

### Youth and amateur hockey programs
Because the app is simple, low-cost, and browser-based, it fits youth and amateur hockey environments where teams may not want to purchase a dedicated sports analytics platform.

### Anyone evaluating goalie performance over a season
The app is useful for anyone trying to compare:
- goals against versus shots faced
- performance by period
- game-to-game improvement or decline
- save percentage trends across multiple contests

## How the app is used

### Basic workflow
1. Open the app in a browser.
2. Enter the opponent name.
3. Select the period (P1, P2, or P3).
4. Tap the “+ SHOT” button when the goalie faces a shot.
5. Tap the “+ GOAL” button if a goal is scored.
6. The app updates saves and save percentage automatically.
7. Repeat for each period.
8. Click “SAVE GAME” when the game is complete.
9. Review saved history in the “Season Games” section.
10. Export the game if needed.

### Example use
A goalie may be facing pressure through the first period. The app can track that:
- 12 shots on net
- 2 goals allowed
- 10 saves
- 0.833 save percentage in P1

Then the user can switch to P2 and continue tracking. At the end of the game, the full game record is saved to history.

## Data model and storage

The app stores all saved games in the browser’s localStorage. Each game is represented as a JavaScript object with the following structure:

```js
{
  date: "MM/DD/YYYY",
  opp: "Opponent Name",
  shots: 0,
  goals: 0,
  periods: [
    { number: 1, shots: 0, goals: 0 },
    { number: 2, shots: 0, goals: 0 },
    { number: 3, shots: 0, goals: 0 }
  ]
}
```

The app computes:
- saves = total shots - total goals
- savePercentage = saves / shots

These calculations are displayed during the game and also saved in exported files.

## Important design choices

### Single-device, local-first design
This application intentionally stores data locally in the browser. It does not require:
- a user account
- a cloud database
- email signup
- internet connectivity for basic usage after the page loads

This keeps it simple and quick to deploy, especially for one-off local tracking tasks.

### No backend server
There is no server-side logic, authentication layer, or database. The app is intentionally lightweight and portable, which makes it easy to host or use as a standalone file.

### Mobile-friendly interaction
The UI uses large buttons and touch-friendly controls so the app can be used while standing at a rink bench or on an iPad/phone.

### Zero dependency setup
Because it is built with standard web technologies, the app can be opened directly in a browser without requiring npm install, a framework, or a build step.

## Project structure

This repository contains a minimal, focused set of files:

- index.html — the complete app UI, styling, logic, and data handling
- manifest.json — PWA metadata used for installation and app presentation
- service-worker.js — service worker registration support
- logo.png — branding artwork for the app header
- test/goal-entry.test.js — tests that verify critical stat logic

## Key behaviors implemented in the application

The app enforces these rules and behaviors:

- period selection is available for P1, P2, and P3
- shots and goals are tracked independently per period
- the total shots/goals display updates immediately
- saves and save percentage update immediately
- a goal cannot exceed shots in any period
- shots cannot be decremented below the goal count
- game records are saved in localStorage
- history entries can be exported to CSV or JSON
- game entries can be deleted individually
- all saved history can be cleared with confirmation
- the app supports light and dark mode
- the app is structured for mobile and touch use
- it is installable as a standalone web app

## Limitations

This app is deliberately simple, and it has some limitations:

- It stores data locally in the browser only; it is not a shared team database.
- It does not support multi-user syncing or cross-device synchronization.
- It does not include advanced player analytics beyond shots/goals/saves and save percentage.
- It is not designed for large-scale sports operations or enterprise reporting.
- It does not include authentication, permissions, or team management features.

These limitations are intentional: the app is meant to be quick, direct, and useful in live-game situations rather than a full-scale analytics platform.

## Best fit scenarios

The app is best for:
- one person tracking one goalie’s performance during a game
- coach-side monitoring of goalie play
- casual or youth hockey stat tracking
- season logs built from local browser storage
- quick and portable game-by-game review

## Why this app exists

The app exists to solve a very specific problem: collecting goalie performance stats quickly and clearly without requiring expensive software or complicated workflows. It is intended for situations where a user wants to record live game information from a bench, rink, or mobile device and then review the data afterward.

Its design prioritizes:
- speed
- simplicity
- reliability
- usability on touch screens
- portability without a backend

## Summary

Goalie Tracker is a simple web application for tracking goalie performance in hockey games. It helps users record shots, goals, saves, and save percentage across periods, save game history locally, review season logs, and export records for later use. It is designed primarily for hockey goalies, coaches, trainers, parents, and amateur sports volunteers who need a practical, no-fuss statistical tool for real-time game tracking.

The software is intentionally lightweight and focused on the essentials: tracking game performance clearly, accurately, and quickly in a browser-based tool that can be used anywhere.

## Testing

The repository includes a small test file focused on validating core game logic.

The tests check that:
- goals cannot exceed shots
- shots cannot be reduced below the number of goals

This helps confirm the statistical rules used in the app remain valid.

## Notes

This app was created with a practical, single-user workflow in mind. It is especially useful for small-team hockey environments and independent users who want a quick way to track a goalie’s game without adding the overhead of a larger sports software platform.

The branding references “Dynamik Goaltending,” suggesting it is intended to fit the workflow of a goaltending-focused training or coaching environment, even though the app remains general-purpose enough for ordinary goalie tracking.

## License

This repository does not currently declare a license file in the project root. If you plan to publish or share it more widely, you may want to add an explicit software license.

---

This README is written to describe the app as it exists in the repository: a lightweight local-first goalie tracking tool built for live game use, season review, and exportable stat records.
