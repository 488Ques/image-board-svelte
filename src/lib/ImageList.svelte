<script>
    export let snowflakes = [];
</script>

<div class="flex flex-row flex-wrap justify-center">
    {#each snowflakes as snowflake}
        <img src="/api/image/{snowflake}/preview" alt="" class="m-2"/>
    {/each}
</div>
