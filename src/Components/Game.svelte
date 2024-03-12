<script lang="ts">
  import { onMount } from "svelte";
  import confetti from "canvas-confetti";
  import playerAvatar from "../assets/rukia.jpeg";
  import rivalAvatar from "../assets/ichigo.jpeg";

  export let stopGame: () => void;

  type Choice = "rock" | "paper" | "scissors";

  let choices: Choice[] = ["rock", "paper", "scissors"];
  let userChoice: string = "";
  let computerChoice: string = "";
  let result: string = "";
  let wins: number = 0;
  let losses: number = 0;
  let draws: number = 0;
  let timer: number = 5;
  let intervalId: number;
 

  onMount(() => {
    reset();
    callTime();
  });

  function reset(): void {
    clearInterval(intervalId);
    userChoice = "";
    computerChoice = "";
    result = "";
    timer = 5;
    wins = 0;
    losses = 0;
    draws = 0;
    callTime();
  }

  function callTime(): void {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (timer > 0) {
        timer--;
      } else {
        timer = 0;
        if (!userChoice) {
          play(choices[Math.floor(Math.random() * choices.length)]);
        }
        clearInterval(intervalId);
      }
    }, 1000);
  }
  function play(choice: string): void {
    clearInterval(intervalId);
    userChoice = choice;
    computerChoice = choices[Math.floor(Math.random() * choices.length)];

    if (userChoice === computerChoice) {
      result = "It's a draw!";
      draws++;
    } else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "scissors" && computerChoice === "paper") ||
      (userChoice === "paper" && computerChoice === "rock")
    ) {
      result = "You win!";
      wins++;
    } else {
      result = "You lose!";
      losses++;
    }
  }

  function handleStop(): void {
    clearInterval(intervalId);
    stopGame();
  }

  $: console.log(userChoice, result);

  $: if (result === "You win!") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    result = "";
  }
</script>

<h4>Choose a Move</h4>

<div class="game-container">
  <div class="player">
    <div class="avatar">
      <img src={playerAvatar} alt="Player Avatar" />
    </div>

    <p class={!userChoice ? "time" : ""}>
      You: {userChoice || `Choose a move before the timer runs out! ${timer}`}
    </p>

    <div class="choices">
      {#each choices as choice}
        <button
          class={`choice ${choice} ${userChoice === choice && "picked"}`}
          on:click={() => play(choice)}
        >
        </button>
      {/each}
    </div>
  </div>
  <div class="results">
    <p>Wins: {wins}</p>
    <p>Losses: {losses}</p>
    <p>Draws: {draws}</p>
  </div>
  <div class="actions">
    <button on:click={reset}>Reset</button>
    <button on:click={handleStop}> Stop Game </button>
  </div>

  <div class="player">
    <div class="choice">
      {#if computerChoice}
        <button
          class={`choice ${computerChoice} ${userChoice === computerChoice && "picked"}`}
        ></button>
      {:else}
        <p>computer is choosing...</p>
      {/if}
    </div>
    <p>Rival: {computerChoice || "Let's Gooooo"}</p>
    <div class="avatar">
      <img src={rivalAvatar} alt="Rival Avatar" />
    </div>
  </div>
</div>

<style>
  .game-container {
    height: 100%;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: space-between;
  }
  .choice {
    min-height: 90px;
    margin: 0;
    padding: 0;
    background-color: transparent;
  }

  .choices {
    display: flex;
    gap: 10px;
    justify-content: space-around;
  }

  .choice.rock {
    width: 100px;
    height: 90px;
    background: url(../assets/rock.png) no-repeat center center;

    cursor: pointer;
  }
  .choice.paper {
    width: 100px;
    height: 90px;
    background: url(../assets/paper.png) no-repeat center center;

    cursor: pointer;
  }
  .choice.scissors {
    width: 100px;
    height: 90px;
    background: url(../assets/scissors.png) no-repeat center center;

    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .time {
    color: red;
  }

  p {
    text-align: center;
  }

  .results {
    display: flex;
    gap: 16px;
  }

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
  }

  .avatar img {
    width: 100%;
    height: auto;
  }

  .player {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .picked {
    border: 2px solid greenyellow;
  }
</style>
