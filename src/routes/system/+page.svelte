<script>
  /** @type {import('./$types').PageData} */  
  import SystemInfo from "../../lib/SystemInfo.svelte";
  export let data;
</script>

<SystemInfo data={data} />