<script>
  export let result = '';
  export let close = () => {};
</script>

<div class="modal">
  <div class="modal-content">
    <h2>Result</h2>
    <p>{result}</p>
    <button on:click={close}>Close</button>
  </div>
</div>

<style>
  /* Add your styles here */
</style>