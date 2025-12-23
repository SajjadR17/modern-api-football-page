export const mockTodayMatches = [
  // 🇬🇧 Premier League
  {
    fixture: {
      id: 301,
      date: "90",
      status: { short: "FT", elapsed: 67 },
      lead: "Manchester City",
    },

    league: {
      id: 39,
      name: "Premier League",
      season: "2025-26",
      round: "Round 16",
    },

    teams: {
      home: {
        id: 51,
        name: "Brighton",
        logo: "https://media.api-sports.io/football/teams/51.png",
      },
      away: {
        id: 50,
        name: "Manchester City",
        logo: "https://media.api-sports.io/football/teams/50.png",
      },
    },

    goals: { home: 1, away: 2 },

    events: {
      goals: {
        home: [{ minute: 12, player: "João Pedro" }],
        away: [
          { minute: 38, player: "Haaland" },
          { minute: 55, player: "Diaz" },
        ],
      },
      cards: {
        home: [{ minute: 61, player: "Dunk", detail: "Yellow Card" }],
        away: [{ minute: 36, player: "Foden", detail: "Red Card" }],
      },
      subs: {
        home: [],
        away: [],
      },
    },

    venue: { name: "Amex Stadium", city: "Brighton" },
  },

  // 🇪🇸 La Liga
  {
    fixture: {
      id: 302,
      date: "23:00",
      status: { short: "NS" },
      lead: "Not Started",
    },

    league: {
      id: 140,
      name: "La Liga",
      season: "2025-26",
      round: "Round 20",
    },

    teams: {
      home: {
        id: 541,
        name: "Real Madrid",
        logo: "https://media.api-sports.io/football/teams/541.png",
      },
      away: {
        id: 529,
        name: "Barcelona",
        logo: "https://media.api-sports.io/football/teams/529.png",
      },
    },

    goals: { home: null, away: null },

    events: {
      goals: { home: [], away: [] },
      cards: { home: [], away: [] },
      subs: { home: [], away: [] },
    },

    venue: { name: "Santiago Bernabéu", city: "Madrid" },
  },

  // 🇮🇹 Serie A
  {
    fixture: {
      id: 303,
      date: "90",
      status: { short: "FT" },
      lead: "Inter",
    },

    league: {
      id: 135,
      name: "Serie A",
      season: "2025-26",
      round: "Matchday 21",
    },

    teams: {
      home: {
        id: 505,
        name: "Inter",
        logo: "https://media.api-sports.io/football/teams/505.png",
      },
      away: {
        id: 487,
        name: "Lazio",
        logo: "https://media.api-sports.io/football/teams/487.png",
      },
    },

    goals: { home: 2, away: 1 },

    events: {
      goals: {
        home: [
          { minute: 15, player: "Lautaro Martínez" },
          { minute: 78, player: "Çalhanoğlu" },
        ],
        away: [{ minute: 41, player: "Pedro" }],
      },
      cards: { home: [], away: [] },
      subs: { home: [], away: [] },
    },

    venue: { name: "San Siro", city: "Milan" },
  },

  // 🇩🇪 Bundesliga
  {
    fixture: {
      id: 304,
      date: "90",
      status: { short: "FT" },
      lead: "Draw",
    },

    league: {
      id: 78,
      name: "Bundesliga",
      season: "2025-26",
      round: "Matchday 18",
    },

    teams: {
      home: {
        id: 157,
        name: "Bayern Munich",
        logo: "https://media.api-sports.io/football/teams/157.png",
      },
      away: {
        id: 165,
        name: "Borussia Dortmund",
        logo: "https://media.api-sports.io/football/teams/165.png",
      },
    },

    goals: { home: 1, away: 1 },

    events: {
      goals: {
        home: [{ minute: 39, player: "Kane" }],
        away: [{ minute: 22, player: "Brandt" }],
      },
      cards: { home: [], away: [] },
      subs: { home: [], away: [] },
    },

    venue: { name: "Allianz Arena", city: "Munich" },
  },

  // 🇫🇷 Ligue 1
  {
    fixture: {
      id: 305,
      date: "22:00",
      status: { short: "NS" },
      lead: "Not Started",
    },

    league: {
      id: 61,
      name: "Ligue 1",
      season: "2025-26",
      round: "Round 19",
    },
    teams: {
      home: {
        id: 85,
        name: "PSG",
        logo: "https://media.api-sports.io/football/teams/85.png",
      },
      away: {
        id: 91,
        name: "Monaco",
        logo: "https://media.api-sports.io/football/teams/91.png",
      },
    },

    goals: { home: null, away: null },

    events: {
      goals: { home: [], away: [] },
      cards: { home: [], away: [] },
      subs: { home: [], away: [] },
    },

    venue: { name: "Parc des Princes", city: "Paris" },
  },
];
