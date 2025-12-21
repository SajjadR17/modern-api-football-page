const matchesCardsLive = document.querySelector(".matches-cards-live");
const matchesCardsToday = document.querySelector(".matches-cards-today");
const ranking = document.querySelector(".ranking");
const switchBtns = document.querySelectorAll(".switch-btn");
const todayBtn = document.querySelector(".today-btn");
const liveBtn = document.querySelector(".live-btn");
const leaguesBtn = document.querySelector(".leagues-btn");
const btnTitle = document.querySelector(".btn-title");
const leaguesTable = document.querySelector(".leagues-table");
const selectTable = document.querySelector("#select-table");
const leagueTableName = document.querySelector(".league-table-name");
import { mockLiveMatches } from "./data/mock-live.js";
import {
  mockPremierLeagueStandings,
  mockSerieAStandings,
  mockLaLigaStandings,
  mockBundesligaStandings,
  mockJapanStandings,
  mockFranceStandings,
} from "./data/mock-standings.js";
import { mockTodayMatches } from "./data/mock-today.js";
const USE_MOCK = true;
const API_KEY = "";
const BASE_URL = "https://v3.football.api-sports.io";

liveBtn.addEventListener("click", () => {
  matchesCardsLive.style.display = "grid";
  matchesCardsToday.style.display = "none";
  leaguesTable.style.display = "none";
  switchBtns.forEach((switchBtn) => {
    switchBtn.classList.remove("active");
  });
  liveBtn.classList.add("active");
  btnTitle.textContent = "Football Live Scores";
});

todayBtn.addEventListener("click", () => {
  matchesCardsLive.style.display = "none";
  matchesCardsToday.style.display = "grid";
  leaguesTable.style.display = "none";
  switchBtns.forEach((switchBtn) => {
    switchBtn.classList.remove("active");
  });
  todayBtn.classList.add("active");
  btnTitle.textContent = "Today Football Matches";
});

leaguesBtn.addEventListener("click", () => {
  matchesCardsLive.style.display = "none";
  matchesCardsToday.style.display = "none";
  leaguesTable.style.display = "block";
  switchBtns.forEach((switchBtn) => {
    switchBtn.classList.remove("active");
  });
  leaguesBtn.classList.add("active");
  btnTitle.textContent = "Leagues Tabels - Standing";
});

async function fetchLiveMatches() {
  try {
    const res = await fetch(
      `${BASE_URL}/fixtures?live=all&league=40-100-100-100-100`,
      {
        method: "GET",
        headers: {
          "x-apisports-key": API_KEY,
        },
      }
    );

    if (!res.ok) {
      matchesCardsToday.innerHTML = `<span class="error-loading-span">Network Error</span>`;
    }
    const data = await res.json();
    return data.response;
  } catch (err) {
    console.log(err);
    return [];
  }
}

function renderLiveMatches(matches) {
  matchesCardsLive.innerHTML = "";
  if (matches.length === 0) {
    matchesCardsLive.innerHTML = `<span class="error-loading-span">No Live Matches Available</span>`;
  }

  matches.forEach((match) => {
    const home = match.teams.home;
    const away = match.teams.away;
    const goals = match.goals;
    const status = match.fixture.status;

    const card = document.createElement("div");
    card.classList.add("match-card");

    card.innerHTML = `
    <div class="home-team">
          <img src="${home.logo}" alt="" />
          <span class="home-team-name">${home.name}</span>
        </div>
        <div class="match-about">
          <span class="match-time" style="color: green;border-color:green">${status.elapsed}</span>
          <span class="match-scores">${goals.home} - ${goals.away}</span>
          <span class="match-status">${status.short}</span>
        </div>
        <div class="away-team">
          <img src="${away.logo}" alt="" />
          <span class="away-team-name">${away.name}</span>
        </div>
    `;

    matchesCardsLive.appendChild(card);
  });
}

window.addEventListener("load", async () => {
  const matches = await getLiveMatches();
  renderLiveMatches(matches);
});

liveBtn.addEventListener("click", async () => {
  const matches = await getLiveMatches();
  renderLiveMatches(matches);
});

async function fetchTodayMatches() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const res = await fetch(`${BASE_URL}/fixtures?date=${today}`, {
      headers: { "x-apisports-key": API_KEY },
    });
    if (!res.ok) {
      matchesCardsToday.innerHTML = `<span class="error-loading-span">Network Error</span>`;
    }
    const data = await res.json();
    return data.response;
  } catch (err) {
    console.log(err);
  }
}

function renderTodayMatches(matches) {
  matchesCardsToday.innerHTML = "";
  if (matches.length === 0) {
    matchesCardsToday.innerHTML = `<span class="error-loading-span">No Matches Available Today</span>`;
  }

  matches.forEach((match) => {
    const home = match.teams.home;
    const away = match.teams.away;
    const status = match.fixture.status;

    const card = document.createElement("div");
    card.classList.add("match-card");

    card.innerHTML = `
    <div class="home-team">
          <img src="${home.logo}" alt="" />
          <span class="home-team-name">${home.name}</span>
        </div>
        <div class="match-about">
          <span class="match-time">${match.fixture.date}</span>
          <span class="match-scores">VS</span>
          <span class="match-status">${status.short}</span>
        </div>
        <div class="away-team">
          <img src="${away.logo}" alt="" />
          <span class="away-team-name">${away.name}</span>
        </div>
    `;

    matchesCardsToday.appendChild(card);
  });
}

todayBtn.addEventListener("click", async () => {
  const matches = await getTodayMatches();
  renderTodayMatches(matches);
});

window.addEventListener("load", async () => {
  const matches = await getTodayMatches();
  renderTodayMatches(matches);
});

async function getLiveMatches() {
  return USE_MOCK ? mockLiveMatches : fetchLiveMatches();
}

async function getTodayMatches() {
  return USE_MOCK ? mockTodayMatches : fetchTodayMatches();
}

function renderStandings(ranks) {
  ranking.innerHTML = "";

  ranks.forEach((rank) => {
    const teamRanks = ranks.length;
    const teamRank = rank.rank;
    const team = rank.team;
    const played = rank.played;
    const win = rank.win;
    const draw = rank.draw;
    const lose = rank.lose;
    const goalsDiff = rank.goalsDiff;
    const points = rank.points;

    const teamRankDiv = document.createElement("div");
    teamRankDiv.classList.add("rank");
    if (teamRank > teamRanks - 3) {
      teamRankDiv.classList.add("redStandings");
    }

    teamRankDiv.innerHTML = `
            <div class="table-left">
              <span class="team-rank">${teamRank}</span>
              <img class="team-img" src="${team.logo}" alt="" />
              <span class="team-name">${team.name}</span>
            </div>
            <div class="table-right">
              <div><span>${played}</span></div>
              <div><span>${win}</span></div>
              <div><span>${draw}</span></div>
              <div><span>${lose}</span></div>
              <div><span>${goalsDiff}</span></div>
              <div><span class="points">${points}</span></div>
            </div>
    `;

    ranking.appendChild(teamRankDiv);
  });
}

async function getStandings() {
  if (selectTable.value === "Premier League") {
    leagueTableName.textContent = "Premier League ";
    return mockPremierLeagueStandings;
  }
  if (selectTable.value === "Laliga") {
    leagueTableName.textContent = "Laliga ";
    return mockLaLigaStandings;
  }
  if (selectTable.value === "Bundesliga") {
    leagueTableName.textContent = "Bundesliga ";
    return mockBundesligaStandings;
  }
  if (selectTable.value === "Serie A") {
    leagueTableName.textContent = "Serie A ";
    return mockSerieAStandings;
  }
  if (selectTable.value === "Japan") {
    leagueTableName.textContent = "Japan ";
    return mockJapanStandings;
  }
  if (selectTable.value === "Ligue 1") {
    leagueTableName.textContent = "Ligue 1 France ";
    return mockFranceStandings;
  }
}

selectTable.addEventListener("change", async () => {
  const ranks = await getStandings();
  renderStandings(ranks);
});

window.addEventListener("load", async () => {
  const ranks = await getStandings();
  renderStandings(ranks);
});
