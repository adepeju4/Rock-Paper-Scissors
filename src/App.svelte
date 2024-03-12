<script lang="ts">
  import { onMount } from "svelte";
  import Game from "./Components/Game.svelte";
  import StartGame from "./Components/StartGame.svelte";
  import hero_image from "./assets/rockpaperscissors.png";
  import background_audio from "./assets/game_background.mp3"

  let started_game: boolean = false;

  let audio = new Audio(background_audio);

  function startGame() {
    audio.loop = true;
    audio.play().catch((error) => console.error("Error playing audio:", error));
    started_game = true;
  }

  function stopGame(): void {
    started_game = false;
    audio.pause()
    audio.currentTime = 0;
  }


  onMount(() => {
    return () => {
      audio.pause();
    };
  });
</script>

<main>
  <header>
    <img src={hero_image} alt="Rock, Paper, Scissors" />
  </header>

  <section>
    {#if started_game}
      <Game {stopGame} />
    {:else}
      <StartGame {startGame} />
    {/if}
  </section>
</main>

<style>
  header {
    height: 20%;
  }
  img {
    width: 100%;
    height: 100%;
  }
  main {
    width: 500px;
    height: 100%;
    padding: 2rem;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80%;
  }


</style>
