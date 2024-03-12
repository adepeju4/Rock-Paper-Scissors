<script lang="ts">
  export let startGame: () => void;
</script>

<div class="rules">
  <h3>Rules</h3>


  <p>
    Choose a Move: Rock, Paper, Scissors. The Computer will also pick a move and
    then we will compare and find the winner! Rock beats Scissors Scissors beats
    Paper Paper beats Rock
  </p>

  <button on:click={startGame}>Start Game</button>


</div>

<style>
  .rules {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--black);
    padding: 2rem;
    border-radius: 25px;
  }

  button{
    background-color: var(--black);
   
  }
  h3 {
    font-size: 2rem;
  }
  p {
    font-size: 1.2rem;
  }
</style>
