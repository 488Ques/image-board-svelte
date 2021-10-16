<script>
    export let snowflakes = [];
</script>

<div class="flex flex-row flex-wrap justify-center">
    {#each snowflakes as snowflake}
        <a href="#/image/{snowflake}"
            ><img src="/api/image/{snowflake}/preview" alt="" class="m-2" /></a
        >
    {/each}
</div>
