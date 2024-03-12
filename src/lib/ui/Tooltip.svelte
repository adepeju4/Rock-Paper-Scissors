


<script>
  export let text = '';
  let isOpen = false;

  const openTooltip = () => {
    isOpen = true;
  };

  const closeTooltip = () => {
    isOpen = false;
  };
</script>

<span class="tooltip" role="tooltip" on:mouseover={openTooltip} on:mouseout={closeTooltip} on:focus={openTooltip} on:blur={closeTooltip}>
    <slot />
    {#if isOpen}
        <span class="tooltiptext">{text}</span>
    {/if}
</span>

<style>
  .tooltip {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    left: 100%; 
    top: 50%; 
    margin-top: -30px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
</style>