export const mockLiveMatches = [
  // 🇬🇧 Premier League
  {
    fixture: {
      id: 401,
      date: "20:45",
      status: { short: "LIVE", elapsed: 73 },
      lead: "Liverpool"
    },

    league: {
      id: 39,
      name: "Premier League",
      season: "2025-26",
      round: "Regular Season - 24",
    },

    teams: {
      home: {
        id: 40,
        name: "Liverpool",
        logo: "https://media.api-sports.io/football/teams/40.png",
      },
      away: {
        id: 66,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
    },

    goals: { home: 2, away: 1 },

    events: {
      goals: {
        home: [
          { minute: 14, player: "Salah" },
          { minute: 58, player: "Núñez" },
        ],
        away: [{ minute: 33, player: "Diallo" }],
      },
      cards: {
        home: [],
        away: [{ minute: 70, player: "Casemiro", detail: "Yellow Card" }],
      },
      subs: {
        home: [{player_in:"Isak",player_out:"Núñez",minute: 35}],
        away: [],
      },
    },

    venue: { name: "Anfield", city: "Liverpool" },
  },

  // 🇪🇸 La Liga
  {
    fixture: {
      id: 402,
      date: "22:00",
      status: { short: "LIVE", elapsed: 67},
      lead: "Draw"
    },

    league: {
      id: 140,
      name: "La Liga",
      season: "2025-26",
      round: "Round 20",
    },

    teams: {
      home: {
        id: 530,
        name: "Atletico Madrid",
        logo: "https://media.api-sports.io/football/teams/530.png",
      },
      away: {
        id: 543,
        name: "Real Betis",
        logo: "https://media.api-sports.io/football/teams/543.png",
      },
    },

    goals: { home: 1, away: 1 },

    events: {
      goals: {
        home: [{ minute: 21, player: "Griezmann" }],
        away: [{ minute: 44, player: "Isco" }],
      },
      cards: {
        home: [],
        away: [],
      },
      subs: {
        home: [],
        away: [],
      },
    },

    venue: { name: "Cívitas Metropolitano", city: "Madrid" },
  },

  // 🇮🇹 Serie A
  {
    fixture: {
      id: 403,
      date: "21:45",
      status: { short: "LIVE", elapsed: 61 },
      lead:"AC Milan"
    },

    league: {
      id: 135,
      name: "Serie A",
      season: "2025-26",
      round: "Matchday 21",
    },

    teams: {
      home: {
        id: 496,
        name: "Juventus",
        logo: "https://media.api-sports.io/football/teams/496.png",
      },
      away: {
        id: 489,
        name: "AC Milan",
        logo: "https://media.api-sports.io/football/teams/489.png",
      },
    },

    goals: { home: 0, away: 1 },

    events: {
      goals: {
        home: [],
        away: [{ minute: 49, player: "Modric" }],
      },
      cards: {
        home: [{ minute: 57, player: "Locatelli", detail: "Yellow Card" }],
        away: [],
      },
      subs: {
        home: [],
        away: [],
      },
    },

    venue: { name: "Allianz Stadium", city: "Turin" },
  },

  // 🇩🇪 Bundesliga
  {
    fixture: {
      id: 404,
      date: "21:30",
      status: { short: "LIVE", elapsed: 35 },
      lead: "Eintracht Frankfurt"
    },

    league: {
      id: 78,
      name: "Bundesliga",
      season: "2025-26",
      round: "Matchday 18",
    },

    teams: {
      home: {
        id: 168,
        name: "Eintracht Frankfurt",
        logo: "https://media.api-sports.io/football/teams/169.png",
      },
      away: {
        id: 160,
        name: "RB Leipzig",
        logo: "https://media.api-sports.io/football/teams/173.png",
      },
    },

    goals: { home: 1, away: 0 },

    events: {
      goals: {
        home: [{ minute: 29, player: "Götze" }],
        away: [],
      },
      cards: {
        home: [],
        away: [],
      },
      subs: {
        home: [],
        away: [],
      },
    },

    venue: { name: "Deutsche Bank Park", city: "Frankfurt" },
  },

  // 🇫🇷 Ligue 1
  {
    fixture: {
      id: 405,
      date: "22:15",
      status: { short: "LIVE", elapsed: 18 },
      lead: "Draw"
    },

    league: {
      id: 61,
      name: "Ligue 1",
      season: "2025-26",
      round: "Round 19",
    },
    teams: {
      home: {
        id: 79,
        name: "Lille",
        logo: "https://media.api-sports.io/football/teams/79.png",
      },
      away: {
        id: 93,
        name: "Nice",
        logo: "https://media.api-sports.io/football/teams/84.png",
      },
    },

    goals: { home: 0, away: 0 },

    events: {
      goals: { home: [], away: [] },
      cards: { home: [], away: [] },
      subs: { home: [], away: [] },
    },

    venue: { name: "Stade Pierre-Mauroy", city: "Lille" },
  },
];
