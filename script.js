const matchesCardsLiveDiv = document.querySelector(".matches-cards-live");
const matchesCardsTodayDiv = document.querySelector(".matches-cards-today");
const rankingDiv = document.querySelector(".ranking");
const switchBtns = document.querySelectorAll(".switch-btn");
const todayBtn = document.querySelector(".today-btn");
const liveBtn = document.querySelector(".live-btn");
const leaguesBtn = document.querySelector(".leagues-btn");
const btnTitle = document.querySelector(".btn-title");
const leaguesTableDiv = document.querySelector(".leagues-table");
const selectTable = document.querySelector("#select-table");
const leagueTableName = document.querySelector(".league-table-name");
const overlay = document.querySelector(".overlay");
const body = document.body;
const transferCardsModal = document.querySelector(".transfer-cards-modal");
const sortTransferPlayer = document.querySelector("#sort-transfer-player");
const modalBox = document.querySelector(".modal-box");
const playerTransfersDiv = document.querySelector(".player-transfers");
const TransfersBtn = document.querySelector(".Transfers-btn");
const transferPlayerSearchInput = document.querySelector(
  ".transfer-player-search"
);
const transferPlayersCardsDiv = document.querySelector(
  ".transfer-players-cards"
);
import { mockLiveMatches } from "./data/mock-live.js";
import { mockTransfers } from "./data/mock-transfers.js";
const liveMatches = mockLiveMatches;
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

setInterval(() => {
  if (!navigator.onLine) {
    matchesCardsLiveDiv.innerHTML = `<span class="error-loading-span">You Are Offline , Check Your Network</span>`;
    matchesCardsTodayDiv.innerHTML = `<span class="error-loading-span">You Are Offline , Check Your Network</span>`;
    leaguesTableDiv.innerHTML = `<span class="error-loading-span-league">You Are Offline , Check Your Network</span>`;
    playerTransfersDiv.innerHTML = `<span class="error-loading-span-league">You Are Offline , Check Your Network</span>`;
  }
});

liveBtn.addEventListener("click", () => {
  matchesCardsLiveDiv.style.display = "grid";
  matchesCardsTodayDiv.style.display = "none";
  leaguesTableDiv.style.display = "none";
  playerTransfersDiv.style.display = "none";
  switchBtns.forEach((switchBtn) => {
    switchBtn.classList.remove("active");
  });
  liveBtn.classList.add("active");
  btnTitle.textContent = "Football Live Scores";
});

window.addEventListener("load", () => {
  matchesCardsLiveDiv.style.display = "grid";
  matchesCardsTodayDiv.style.display = "none";
  leaguesTableDiv.style.display = "none";
  playerTransfersDiv.style.display = "none";
  switchBtns.forEach((switchBtn) => {
    switchBtn.classList.remove("active");
  });
  liveBtn.classList.add("active");
  btnTitle.textContent = "Football Live Scores";
});

todayBtn.addEventListener("click", () => {
  matchesCardsLiveDiv.style.display = "none";
  matchesCardsTodayDiv.style.display = "grid";
  leaguesTableDiv.style.display = "none";
  playerTransfersDiv.style.display = "none";
  switchBtns.forEach((switchBtn) => {
    switchBtn.classList.remove("active");
  });
  todayBtn.classList.add("active");
  btnTitle.textContent = "Today Football Matches";
});

TransfersBtn.addEventListener("click", () => {
  matchesCardsLiveDiv.style.display = "none";
  matchesCardsTodayDiv.style.display = "none";
  leaguesTableDiv.style.display = "none";
  playerTransfersDiv.style.display = "block";
  switchBtns.forEach((switchBtn) => {
    switchBtn.classList.remove("active");
  });
  TransfersBtn.classList.add("active");
  btnTitle.textContent = "Transfers";
});

leaguesBtn.addEventListener("click", () => {
  matchesCardsLiveDiv.style.display = "none";
  matchesCardsTodayDiv.style.display = "none";
  leaguesTableDiv.style.display = "block";
  playerTransfersDiv.style.display = "none";
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
      matchesCardsLiveDiv.innerHTML = `<span class="error-loading-span">Network Error !!</span>`;
    }
    const data = await res.json();
    return data.response;
  } catch (err) {
    console.log(err);
    return [];
  }
}

function renderLiveMatches(matches) {
  matchesCardsLiveDiv.innerHTML = "";
  if (matches.length === 0) {
    matchesCardsLiveDiv.innerHTML = `<span class="error-loading-span">No Live Matches Available</span>`;
  }

  matches.forEach((match) => {
    const home = match.teams.home;
    const away = match.teams.away;
    const goals = match.goals;
    const status = match.fixture.status;

    const card = document.createElement("div");
    card.classList.add("match-card");
    card.dataset.id = match.fixture.id;

    card.innerHTML = `
    <div class="home-team">
          <img src="${home.logo}" alt="" />
          <span class="home-team-name">${home.name}</span>
        </div>
        <div class="match-about">
          <span class="match-time live-match-time" >${status.elapsed}</span>
          <span class="match-scores">${goals.home} - ${goals.away}</span>
          <div class="live-bedge"><span class="live-status">${status.short}</span></div>
        </div>
        <div class="away-team">
          <img src="${away.logo}" alt="" />
          <span class="away-team-name">${away.name}</span>
        </div>
    `;

    matchesCardsLiveDiv.appendChild(card);
  });
}

async function fetchTodayMatches() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const res = await fetch(`${BASE_URL}/fixtures?date=${today}`, {
      headers: { "x-apisports-key": API_KEY },
    });
    if (!res.ok) {
      matchesCardsTodayDiv.innerHTML = `<span class="error-loading-span">Network Error !!</span>`;
    }
    const data = await res.json();
    return data.response;
  } catch (err) {
    console.log(err);
  }
}

function renderTodayMatches(matches) {
  matchesCardsTodayDiv.innerHTML = "";
  if (matches.length === 0) {
    matchesCardsTodayDiv.innerHTML = `<span class="error-loading-span">No Matches Available Today</span>`;
  }

  matches.forEach((match) => {
    const home = match.teams.home;
    const away = match.teams.away;
    const status = match.fixture.status;

    const card = document.createElement("div");
    card.classList.add("match-card");
    card.dataset.id = match.fixture.id;

    if (
      status.short === "FT" ||
      status.short === "HT" ||
      status.short === "LIVE"
    ) {
      card.innerHTML = `
        <div class="home-team">
          <img src="${home.logo}" alt="" />
          <span class="home-team-name">${home.name}</span>
        </div>
        <div class="match-about">
          <span class="match-time">'${match.fixture.date}</span>
          <span class="match-scores">${match.goals.home} - ${match.goals.away}</span>
          <span class="match-status">${status.short}</span>
        </div>
        <div class="away-team">
          <img src="${away.logo}" alt="" />
          <span class="away-team-name">${away.name}</span>
        </div>
    `;
    } else {
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
    }

    matchesCardsTodayDiv.appendChild(card);
  });
}

matchesCardsTodayDiv.addEventListener("click", (e) => {
  const card = e.target.closest(".match-card");
  if (!card) return;
  const matchId = Number(card.dataset.id);
  const match = mockTodayMatches.find((m) => m.fixture.id === matchId);
  overlay.style.display = "block";
  modalBox.classList.add("modal-box-open");
  body.classList.add("no-scroll");
  if (match.goals.home === null) {
    match.goals.home = 0;
    match.goals.away = 0;
  }
  modalBox.innerHTML = `
  <div class="modal-header">
        <span class="match-title">${match.league.name} - ${match.league.season}</span>
        <img class="close-modal"
          src="https://img.icons8.com/?size=100&id=8112&format=png&color=000000"
          alt=""
        />
      </div>
      <div class="modal-teams">
        <div class="modal-team modal-home-team">
          <img
            src="${match.teams.home.logo}"
            alt=""
            class="modal-home-team-img"
          />
          <span>${match.teams.home.name}</span>
        </div>
        <div class="modal-match-card-status">
          <span class="modal-match-time">${match.fixture.date}</span>
          <span class="vs-span">VS</span>
          <span class="modal-match-status">${match.fixture.status.short}</span>
        </div>
        <div class="modal-team modal-away-team">
          <img
            src="${match.teams.away.logo}"
            alt=""
            class="modal-away-team-img"
          />
          <span>${match.teams.away.name}</span>
        </div>
      </div>
      <div class="modal-match-score">
        <div class="modal-home-team-score">${match.goals.home}</div>
        <div class="modal-winner-team"><strong style="font-weight: 600;">Winner </strong>  = ${match.fixture.lead}</div>
        <div class="modal-away-team-score">${match.goals.away}</div>
      </div>
      <div class="modal-match-goals">
        <div class="modal-home-team-goals">
        </div>
        <div class="modal-away-team-goals">
        </div>
      </div>
      <div class="modal-match-cards">
        <div class="modal-home-team-cards">
        </div>
        <div class="modal-away-team-cards">
        </div>
      </div>
      <div class="modal-match-subs">
        <div class="modal-home-team-subs">
        </div>
        <div class="modal-away-team-subs">
        </div>
      </div>
      <div class="modal-match-about">
        <div class="venue">
          <span class="venue-name"><img src="https://img.icons8.com/?size=100&id=JlLTMd4NfTIp&format=png&color=000000" alt=""><strong>Stadium :</strong> ${match.venue.name}</span>
          <span class="city-name">- ${match.venue.city}</span>
        </div>
        <div class="modal-league-season">
          <span class="modal-match-round"><img src="https://img.icons8.com/?size=100&id=1RB8rU8iC753&format=png&color=000000" alt=""><strong>Round :</strong> ${match.league.round}</span>
        </div>
      </div>
  `;

  const modalHomeTeamGoals = document.querySelector(".modal-home-team-goals");
  const modalAwayTeamGoals = document.querySelector(".modal-away-team-goals");
  const modalHomeTeamCards = document.querySelector(".modal-home-team-cards");
  const modalAwayTeamCards = document.querySelector(".modal-away-team-cards");
  const modalHomeTeamSubs = document.querySelector(".modal-home-team-subs");
  const modalAwayTeamSubs = document.querySelector(".modal-away-team-subs");

  if (match.events.goals.home.length === 0) {
    modalHomeTeamGoals.innerHTML = `<div class="modal-home-team-goal"><img src="https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000" alt=""><span>No Goals</span></div>`;
  }

  match.events.goals.home.forEach((homeTeamGoal) => {
    let homeTeamGoalDiv = document.createElement("div");
    homeTeamGoalDiv.classList.add("modal-home-team-goal");
    homeTeamGoalDiv.innerHTML = `
            <img
              src="https://img.icons8.com/?size=100&id=61032&format=png&color=000000"
              alt=""
              class="goal-icon"
            />
            <span class="goal-scorer">${homeTeamGoal.player}</span>
            <span class="goal-time">- ${homeTeamGoal.minute}</span>
    `;

    modalHomeTeamGoals.appendChild(homeTeamGoalDiv);
  });

  if (match.events.goals.away.length === 0) {
    modalAwayTeamGoals.innerHTML = `<div class="modal-away-team-goal"><img src="https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000" alt=""><span>No Goals</span></div>`;
  }

  match.events.goals.away.forEach((awayTeamGoal) => {
    let awayTeamGoalDiv = document.createElement("div");
    awayTeamGoalDiv.classList.add("modal-away-team-goal");
    awayTeamGoalDiv.innerHTML = `
            <img
              src="https://img.icons8.com/?size=100&id=61032&format=png&color=000000"
              alt=""
              class="goal-icon"
            />
            <span class="goal-scorer">${awayTeamGoal.player}</span>
            <span class="goal-time">- ${awayTeamGoal.minute}</span>
    `;

    modalAwayTeamGoals.appendChild(awayTeamGoalDiv);
  });

  if (match.events.cards.home.length === 0) {
    modalHomeTeamCards.innerHTML = `<div class="modal-home-team-card"><img src="https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000" alt=""><span>No Cards</span></div>`;
  }

  match.events.cards.home.forEach((homeTeamCard) => {
    let cardImg = "";
    if (homeTeamCard.detail === "Yellow Card") {
      cardImg =
        "https://img.icons8.com/?size=100&id=M8VlcktD04OK&format=png&color=000000";
    }
    if (homeTeamCard.detail === "Red Card") {
      cardImg =
        "https://img.icons8.com/?size=100&id=t5lvbIuYCX66&format=png&color=000000";
    }
    let homeTeamCardDiv = document.createElement("div");
    homeTeamCardDiv.classList.add("modal-home-team-card");
    homeTeamCardDiv.innerHTML = `
            <img
              src="${cardImg}"
              alt=""
              class="card-icon"
            />
            <span class="player-name">${homeTeamCard.player}</span>
            <span class="card-time">- ${homeTeamCard.minute}</span>
    `;

    modalHomeTeamCards.appendChild(homeTeamCardDiv);
  });

  if (match.events.cards.away.length === 0) {
    modalAwayTeamCards.innerHTML = `<div class="modal-away-team-card"><img src="https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000" alt=""><span>No Cards</span></div>`;
  }

  match.events.cards.away.forEach((awayTeamCard) => {
    let cardImg = "";
    if (awayTeamCard.detail === "Yellow Card") {
      cardImg =
        "https://img.icons8.com/?size=100&id=M8VlcktD04OK&format=png&color=000000";
    }
    if (awayTeamCard.detail === "Red Card") {
      cardImg =
        "https://img.icons8.com/?size=100&id=t5lvbIuYCX66&format=png&color=000000";
    }
    let awayTeamCardDiv = document.createElement("div");
    awayTeamCardDiv.classList.add("modal-away-team-card");
    awayTeamCardDiv.innerHTML = `
            <img
              src="${cardImg}"
              alt=""
              class="card-icon"
            />
            <span class="player-name">${awayTeamCard.player}</span>
            <span class="card-time">- ${awayTeamCard.minute}</span>
    `;

    modalAwayTeamCards.appendChild(awayTeamCardDiv);
  });

  if (match.events.subs.home.length === 0) {
    modalHomeTeamSubs.innerHTML = `<div class="modal-home-team-sub"><img src="https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000" alt=""><span>No Subs</span></div>`;
  }

  match.events.subs.home.forEach((homeTeamSub) => {
    let homeTeamSubDiv = document.createElement("div");
    homeTeamSubDiv.classList.add("modal-home-team-sub");
    homeTeamSubDiv.innerHTML = `
            <img
              src="https://img.icons8.com/?size=100&id=74511&format=png&color=000000"
              alt=""
              class="goal-icon"
            />
            <span class="player-in">${homeTeamSub.player_in}</span>
            <span class="player-out">- ${homeTeamSub.player_out}</span>
            <span class="sub-time">- ${homeTeamSub.minute}</span>
    `;

    modalHomeTeamSubs.appendChild(homeTeamSubDiv);
  });

  if (match.events.subs.away.length === 0) {
    modalAwayTeamSubs.innerHTML = `<div class="modal-away-team-sub"><img src="https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000" alt=""><span>No Subs</span></div>`;
  }

  match.events.subs.away.forEach((awayTeamSub) => {
    let awayTeamSubDiv = document.createElement("div");
    awayTeamSubDiv.classList.add("modal-away-team-sub");
    awayTeamSubDiv.innerHTML = `
            <img
              src="https://img.icons8.com/?size=100&id=74511&format=png&color=000000"
              alt=""
              class="goal-icon"
            />
            <span class="player-in">${awayTeamSub.player_in}</span>
            <span class="player-out">- ${awayTeamSub.player_out}</span>
            <span class="sub-time">- ${awayTeamSub.minute}</span>
    `;

    modalAwayTeamSubs.appendChild(awayTeamSubDiv);
  });

  const closeModal = document.querySelector(".close-modal");

  closeModal.addEventListener("click", () => {
    overlay.style.display = "none";
    modalBox.classList.remove("modal-box-open");
    body.classList.remove("no-scroll");
  });
  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    modalBox.classList.remove("modal-box-open");
    body.classList.remove("no-scroll");
  });

  const modalMatchTime = document.querySelector(".modal-match-time");
  const modalMatchStatus = document.querySelector(".modal-match-status");

  if (
    match.fixture.status.short === "LIVE" ||
    match.fixture.status.short === "HT"
  ) {
    modalMatchStatus.style.border = "1px solid red";
    modalMatchStatus.style.color = "red";
    modalMatchTime.style.border = "1px solid green";
    modalMatchTime.style.color = "green";
  }
});

function renderStandings(ranks) {
  rankingDiv.innerHTML = "";

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

    rankingDiv.appendChild(teamRankDiv);
  });
}

async function getStandings() {
  if (selectTable.value === "Premier League") {
    leagueTableName.innerHTML = `<img src="assets/premier-league-icon.jpg" alt=""><span>Premier League </span>`;
    return mockPremierLeagueStandings;
  }
  if (selectTable.value === "Laliga") {
    leagueTableName.innerHTML = `<img src="assets/laliga-icon.jpg" alt=""><span>Laliga </span>`;
    return mockLaLigaStandings;
  }
  if (selectTable.value === "Bundesliga") {
    leagueTableName.innerHTML = `<img src="assets/bundesliga-icon.jpg" alt=""><span>Bundesliga </span>`;
    return mockBundesligaStandings;
  }
  if (selectTable.value === "Serie A") {
    leagueTableName.innerHTML = `<img src="assets/serie-a-icon.jpg" alt=""><span>Serie A </span>`;
    return mockSerieAStandings;
  }
  if (selectTable.value === "Japan") {
    leagueTableName.textContent = "Japan ";
    return mockJapanStandings;
  }
  if (selectTable.value === "Ligue 1") {
    leagueTableName.innerHTML = `<img src="assets/ligue-1-icon.jpg" alt=""><span>Ligue 1 </span>`;
    return mockFranceStandings;
  }
}

async function getLiveMatches() {
  return USE_MOCK ? mockLiveMatches : fetchLiveMatches();
}

async function getTodayMatches() {
  return USE_MOCK ? mockTodayMatches : fetchTodayMatches();
}

selectTable.addEventListener("change", async () => {
  const ranks = await getStandings();
  renderStandings(ranks);
});

window.addEventListener("load", async () => {
  const ranks = await getStandings();
  renderStandings(ranks);
});

todayBtn.addEventListener("click", async () => {
  const matches = await getTodayMatches();
  renderTodayMatches(matches);
});

window.addEventListener("load", async () => {
  const matches = await getTodayMatches();
  renderTodayMatches(matches);
});

window.addEventListener("load", async () => {
  const matches = await getLiveMatches();
  renderLiveMatches(matches);
});

liveBtn.addEventListener("click", async () => {
  const matches = await getLiveMatches();
  renderLiveMatches(matches);
});

matchesCardsLiveDiv.addEventListener("click", (e) => {
  const card = e.target.closest(".match-card");
  if (!card) return;
  const matchId = Number(card.dataset.id);
  const match = mockLiveMatches.find((m) => m.fixture.id === matchId);
  overlay.style.display = "block";
  modalBox.classList.add("modal-box-open");
  body.classList.add("no-scroll");
  modalBox.innerHTML = `
  <div class="modal-header">
        <span class="match-title">${match.league.name} - ${match.league.season}</span>
        <img class="close-modal"
          src="https://img.icons8.com/?size=100&id=8112&format=png&color=000000"
          alt=""
        />
      </div>
      <div class="modal-teams">
        <div class="modal-team modal-home-team">
          <img
            src="${match.teams.home.logo}"
            alt=""
            class="modal-home-team-img"
          />
          <span>${match.teams.home.name}</span>
        </div>
        <div class="modal-match-card-status">
          <span class="live-match-time">'${match.fixture.status.elapsed}</span>
          <span class="vs-span">VS</span>
          <span class="live-bedge">${match.fixture.status.short}</span>
        </div>
        <div class="modal-team modal-away-team">
          <img
            src="${match.teams.away.logo}"
            alt=""
            class="modal-away-team-img"
          />
          <span>${match.teams.away.name}</span>
        </div>
      </div>
      <div class="modal-match-score">
        <div class="modal-home-team-score">${match.goals.home}</div>
        <div class="modal-winner-team"><strong style="font-weight: 600;">Leading </strong>  = ${match.fixture.lead}</div>
        <div class="modal-away-team-score">${match.goals.away}</div>
      </div>
      <div class="modal-match-goals">
        <div class="modal-home-team-goals">
        </div>
        <div class="modal-away-team-goals">
        </div>
      </div>
      <div class="modal-match-cards">
        <div class="modal-home-team-cards">
        </div>
        <div class="modal-away-team-cards">
        </div>
      </div>
      <div class="modal-match-subs">
        <div class="modal-home-team-subs">
        </div>
        <div class="modal-away-team-subs">
        </div>
      </div>
      <div class="modal-match-about">
        <div class="venue">
          <span class="venue-name"><img src="https://img.icons8.com/?size=100&id=JlLTMd4NfTIp&format=png&color=000000" alt=""><strong>Stadium :</strong> ${match.venue.name}</span>
          <span class="city-name">- ${match.venue.city}</span>
        </div>
        <div class="modal-league-season">
          <span class="modal-match-round"><img src="https://img.icons8.com/?size=100&id=1RB8rU8iC753&format=png&color=000000" alt=""><strong>Round :</strong> ${match.league.round}</span>
        </div>
      </div>
  `;

  const modalHomeTeamGoals = document.querySelector(".modal-home-team-goals");
  const modalAwayTeamGoals = document.querySelector(".modal-away-team-goals");
  const modalHomeTeamCards = document.querySelector(".modal-home-team-cards");
  const modalAwayTeamCards = document.querySelector(".modal-away-team-cards");
  const modalHomeTeamSubs = document.querySelector(".modal-home-team-subs");
  const modalAwayTeamSubs = document.querySelector(".modal-away-team-subs");

  if (match.events.goals.home.length === 0) {
    modalHomeTeamGoals.innerHTML = `<div class="modal-home-team-goal"><img src="https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000" alt=""><span>No Goals</span></div>`;
  }

  match.events.goals.home.forEach((homeTeamGoal) => {
    let homeTeamGoalDiv = document.createElement("div");
    homeTeamGoalDiv.classList.add("modal-home-team-goal");
    homeTeamGoalDiv.innerHTML = `
            <img
              src="https://img.icons8.com/?size=100&id=61032&format=png&color=000000"
              alt=""
              class="goal-icon"
            />
            <span class="goal-scorer">${homeTeamGoal.player}</span>
            <span class="goal-time">- ${homeTeamGoal.minute}</span>
    `;

    modalHomeTeamGoals.appendChild(homeTeamGoalDiv);
  });

  if (match.events.goals.away.length === 0) {
    modalAwayTeamGoals.innerHTML = `<div class="modal-away-team-goal"><img src="https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000" alt=""><span>No Goals</span></div>`;
  }

  match.events.goals.away.forEach((awayTeamGoal) => {
    let awayTeamGoalDiv = document.createElement("div");
    awayTeamGoalDiv.classList.add("modal-away-team-goal");
    awayTeamGoalDiv.innerHTML = `
            <img
              src="https://img.icons8.com/?size=100&id=61032&format=png&color=000000"
              alt=""
              class="goal-icon"
            />
            <span class="goal-scorer">${awayTeamGoal.player}</span>
            <span class="goal-time">- ${awayTeamGoal.minute}</span>
    `;

    modalAwayTeamGoals.appendChild(awayTeamGoalDiv);
  });

  if (match.events.cards.home.length === 0) {
    modalHomeTeamCards.innerHTML = `<div class="modal-home-team-card"><img src="https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000" alt=""><span>No Cards</span></div>`;
  }

  match.events.cards.home.forEach((homeTeamCard) => {
    let cardImg = "";
    if (homeTeamCard.detail === "Yellow Card") {
      cardImg =
        "https://img.icons8.com/?size=100&id=M8VlcktD04OK&format=png&color=000000";
    }
    if (homeTeamCard.detail === "Red Card") {
      cardImg =
        "https://img.icons8.com/?size=100&id=t5lvbIuYCX66&format=png&color=000000";
    }
    let homeTeamCardDiv = document.createElement("div");
    homeTeamCardDiv.classList.add("modal-home-team-card");
    homeTeamCardDiv.innerHTML = `
            <img
              src="${cardImg}"
              alt=""
              class="card-icon"
            />
            <span class="player-name">${homeTeamCard.player}</span>
            <span class="card-time">- ${homeTeamCard.minute}</span>
    `;

    modalHomeTeamCards.appendChild(homeTeamCardDiv);
  });

  if (match.events.cards.away.length === 0) {
    modalAwayTeamCards.innerHTML = `<div class="modal-away-team-card"><img src="https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000" alt=""><span>No Cards</span></div>`;
  }

  match.events.cards.away.forEach((awayTeamCard) => {
    let cardImg = "";
    if (awayTeamCard.detail === "Yellow Card") {
      cardImg =
        "https://img.icons8.com/?size=100&id=M8VlcktD04OK&format=png&color=000000";
    }
    if (awayTeamCard.detail === "Red Card") {
      cardImg =
        "https://img.icons8.com/?size=100&id=t5lvbIuYCX66&format=png&color=000000";
    }
    let awayTeamCardDiv = document.createElement("div");
    awayTeamCardDiv.classList.add("modal-away-team-card");
    awayTeamCardDiv.innerHTML = `
            <img
              src="${cardImg}"
              alt=""
              class="card-icon"
            />
            <span class="player-name">${awayTeamCard.player}</span>
            <span class="card-time">- ${awayTeamCard.minute}</span>
    `;

    modalAwayTeamCards.appendChild(awayTeamCardDiv);
  });

  if (match.events.subs.home.length === 0) {
    modalHomeTeamSubs.innerHTML = `<div class="modal-home-team-sub"><img src="https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000" alt=""><span>No Subs</span></div>`;
  }

  match.events.subs.home.forEach((homeTeamSub) => {
    let homeTeamSubDiv = document.createElement("div");
    homeTeamSubDiv.classList.add("modal-home-team-sub");
    homeTeamSubDiv.innerHTML = `
            <img
              src="https://img.icons8.com/?size=100&id=74511&format=png&color=000000"
              alt=""
              class="goal-icon"
            />
            <span class="player-in">${homeTeamSub.player_in}</span>
            <span class="player-out">- ${homeTeamSub.player_out}</span>
            <span class="sub-time">- ${homeTeamSub.minute}</span>
    `;

    modalHomeTeamSubs.appendChild(homeTeamSubDiv);
  });

  if (match.events.subs.away.length === 0) {
    modalAwayTeamSubs.innerHTML = `<div class="modal-away-team-sub"><img src="https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000" alt=""><span>No Subs</span></div>`;
  }

  match.events.subs.away.forEach((awayTeamSub) => {
    let awayTeamSubDiv = document.createElement("div");
    awayTeamSubDiv.classList.add("modal-away-team-sub");
    awayTeamSubDiv.innerHTML = `
            <img
              src="https://img.icons8.com/?size=100&id=74511&format=png&color=000000"
              alt=""
              class="goal-icon"
            />
            <span class="player-in">${awayTeamSub.player_in}</span>
            <span class="player-out">- ${awayTeamSub.player_out}</span>
            <span class="sub-time">- ${awayTeamSub.minute}</span>
    `;

    modalAwayTeamSubs.appendChild(awayTeamSubDiv);
  });

  const closeModal = document.querySelector(".close-modal");
  body.addEventListener("keydown", (e) => {
    console.log(e.key);
  });
  closeModal.addEventListener("click", () => {
    overlay.style.display = "none";
    modalBox.classList.remove("modal-box-open");
    body.classList.remove("no-scroll");
  });
  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    modalBox.classList.remove("modal-box-open");
    body.classList.remove("no-scroll");
  });

  const modalMatchTime = document.querySelector(".modal-match-time");
  const modalMatchStatus = document.querySelector(".modal-match-status");

  modalMatchStatus.style.border = "1px solid red";
  modalMatchStatus.style.color = "red";
  modalMatchTime.style.border = "1px solid green";
  modalMatchTime.style.color = "green";
});

async function getTransfers() {
  return mockTransfers;
}

function renderTransfers(transfers) {
  transferPlayersCardsDiv.innerHTML = "";

  transfers.forEach((transfer) => {
    let transferPlayersCardDiv = document.createElement("div");
    transferPlayersCardDiv.classList.add("player-transfer-card");
    transferPlayersCardDiv.dataset.id = transfer.id;
    transferPlayersCardDiv.innerHTML = `
          <img src="${
            transfer.assets.playerImageLocal
          }" alt="" class="player-transfer-card-img" />
          <div>
            <img src="${
              transfer.player.flag
            }" alt="" class="nationality-flag" />
            <span class="player-transfer-card-name">${
              transfer.player.name
            }</span>
          </div>
          <span class="player-transfer-card-time">${transfer.move.transferDate.slice(
            0,
            4
          )} to ${transfer.move.contractUntil.slice(0, 4)}</span>
          <div class="transfer-teams">
            <img
              src="${transfer.assets.fromTeamLogo}"
              alt=""
              class="from-team"
            />
            <img class="teams-arrow" src="https://img.icons8.com/?size=100&id=86086&format=png&color=000000" alt="">
            <img
              src="${transfer.assets.toTeamLogo}"
              alt=""
              class="to-team"
            />
          </div>
          <span class="player-transfer-card-detail-span">Tap For More Details</span>
    `;

    transferPlayersCardsDiv.appendChild(transferPlayersCardDiv);
  });
}

TransfersBtn.addEventListener("click", async () => {
  const transfers = await getTransfers();
  renderTransfers(transfers);
});

window.addEventListener("load", async () => {
  const transfers = await getTransfers();
  renderTransfers(transfers);
});

let allTransfers = [];
async function fetchTransfers() {
  allTransfers = await getTransfers();
}

fetchTransfers();

function sortAndSearch(allTransfers, searchValue, selectValue) {
  let result = [...allTransfers];
  console.log(result);

  result = result.filter((transfer) => {
    return transfer.player.name
      .toLocaleLowerCase()
      .includes(searchValue.toLowerCase());
  });

  if (selectValue === "newest") {
    result.sort((a, b) => {
      return (
        Number(b.move.transferDate.slice(0, 4)) -
        Number(a.move.transferDate.slice(0, 4))
      );
    });
  }
  if (selectValue === "oldest") {
    result.sort((a, b) => {
      return (
        Number(a.move.transferDate.slice(0, 4)) -
        Number(b.move.transferDate.slice(0, 4))
      );
    });
  }
  if (selectValue === "highest") {
    result.sort((a, b) => {
      return b.move.fee - a.move.fee;
    });
  }
  if (selectValue === "lowest") {
    result.sort((a, b) => {
      return a.move.fee - b.move.fee;
    });
  }
  return result;
}

function updateUI() {
  const selectValue = sortTransferPlayer.value;
  const searchValue = transferPlayerSearchInput.value;
  const filteredTransfers = sortAndSearch(
    allTransfers,
    searchValue,
    selectValue
  );

  renderTransfers(filteredTransfers);
  if (filteredTransfers.length === 0) {
    transferPlayersCardsDiv.innerHTML = `<span class="error-loading-span">Player not found !!</span>`;
  }
}

transferPlayerSearchInput.addEventListener("input", updateUI);
sortTransferPlayer.addEventListener("change", updateUI);

// transferPlayersCardsDiv.addEventListener("click", (e) => {
//   const transferPlayersCardDiv = e.target.closest(".player-transfer-card");
//   const transferCardId = Number(transferPlayersCardDiv.dataset.id);
//   const transferCard = mockTransfers.find((t) => t.id === transferCardId);
//   overlay.style.display = "block";
//   transferCardsModal.style.display = "block";
//   transferCardsModal.classList.add("modal-box-open");
//   body.classList.add("no-scroll");
// });
