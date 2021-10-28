<script>
    export let snowflakes = [];
</script>

<div class="grid grid-cols-7 gap-4 mx-8">
    {#each snowflakes as snowflake}
        <a href="#/image/{snowflake}"
            ><img src="/api/image/{snowflake}/preview" alt="" class="mx-auto" /></a
        >
    {/each}
</div>
