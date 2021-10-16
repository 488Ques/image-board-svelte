<script>
    import { fetchAPI } from "@/static/js/helper";
    import { paths } from "@/static/js/paths";
    import { user } from "@/stores";
    import { onMount } from "svelte";

    export let params = {};
    let imageMetadata = {};
    let addTag = false;
    let tag = "";

    async function getImageMetadata() {
        return await fetchAPI(paths.ImageField(params.snowflake));
    }
    function imageTagAdd() {
        const options = {
            method: "PUT",
            headers: {
                secret: $user.secret,
            },
        };
        fetchAPI(paths.ImageTagField(params.snowflake, tag), options);
        tag = "";
    }

    onMount(async () => {
        imageMetadata = await getImageMetadata();
    });
</script>

<div class="flex flex-row space-x-12">
    <div class="pl-2">
        <ul>
            <li><strong>Snowflake: </strong> {imageMetadata.snowflake}</li>
            <li><strong>Source: </strong> {imageMetadata.source}</li>
            <li><strong>Image type: </strong> {imageMetadata.type}</li>
            <li><strong>Uploaded by: </strong> {imageMetadata.user}</li>
        </ul>
        <button on:click={() => (addTag = !addTag)}>Add tag</button>
        {#if addTag}
            <div class="space-x-2">
                <input type="text" placeholder="Add tag" bind:value={tag} />
                <button on:click={imageTagAdd}>Add</button>
            </div>
        {/if}
    </div>
    <img src={paths.ImageFile(params.snowflake)} alt="" class="max-w-2xl" />
</div>
