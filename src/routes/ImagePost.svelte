<script>
    import { fetchAPI } from "@/static/js/helper";
    import { paths } from "@/static/js/paths";
    import { user } from "@/stores";
    import { push } from "svelte-spa-router";

    export let params = {};
    let imageMetadata = {};
    let addTag = false;
    let tag = "";
    let form;
    let edit = false;
    let imageFamily = [];

    $: originalComment = imageMetadata.commentary ? true : false;
    $: getImageMetadataHooks(params.snowflake);

    // Update other stuff whenever image metadata changes
    function getImageMetadataHooks(snowflake) {
        getImageMetadata(snowflake)
            .then((metadata) => {
                return (imageMetadata = metadata);
            })
            .then((metadata) => {
                imageFamily = [metadata.parent, metadata.child];
            });
    }
    async function getImageMetadata(snowflake) {
        return fetchAPI(paths.ImageField(snowflake));
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
    // Serialize image metada fields into JSON string that can be sent to API endpoints
    function serializeForm(form) {
        return JSON.stringify(Object.fromEntries(new FormData(form)));
    }
    async function updateImageMetadata(snowflake, metadata) {
        const options = {
            method: "PATCH",
            headers: {
                secret: $user.secret,
            },
            body: metadata,
        };
        fetchAPI(paths.ImageField(snowflake), options);
    }
    // Delete the image then reroute back to /browse?p=1
    async function deleteImage(snowflake) {
        if (confirm("Delete image?")) {
            const options = {
                method: "DELETE",
                headers: { secret: $user.secret },
            };
            // .finally is to cope with fetchAPI resolving to error when
            // an endpoint returns empty JSON
            fetchAPI(paths.ImageField(snowflake), options).finally(() =>
                push("#/browse?p=1")
            );
        }
    }
</script>

<svelte:head>
    <title>{params.snowflake}</title>
</svelte:head>

<div class="flex flex-row space-x-12">
    <!-- Image metatadata side -->
    <div class="pl-2">
        <ul>
            <li><strong>Snowflake: </strong> {imageMetadata.snowflake}</li>
            <li>
                <strong>Source: </strong>
                <a href={imageMetadata.source}>{imageMetadata.source}</a>
            </li>
            <li><strong>Image type: </strong> {imageMetadata.type}</li>
            <li><strong>Uploaded by: </strong> {imageMetadata.user}</li>
        </ul>
        <!-- Actions -->
        <div><button on:click={() => (edit = !edit)}>Edit</button></div>
        <div><button on:click={() => (addTag = !addTag)}>Add tag</button></div>
        {#if addTag}
            <div class="space-x-2">
                <input type="text" placeholder="Add tag" bind:value={tag} />
                <button on:click={imageTagAdd}>Add</button>
            </div>
        {/if}
        <div>
            <button
                on:click={() => {
                    deleteImage(params.snowflake);
                }}>Delete</button
            >
        </div>
    </div>
    <!-- Image side -->
    <!-- Image family -->
    <div class="w-full">
        <div class="flex flex-row flex-wrap m-4">
            {#each imageFamily as snowflake}
                <a href="#/image/{snowflake}"
                    ><img
                        src="/api/image/{snowflake}/preview"
                        alt=""
                        class="mx-auto"
                    /></a
                >
            {/each}
        </div>
        <img src={paths.ImageFile(params.snowflake)} alt="" class="max-w-2xl" />
        <!-- Commentary -->
        {#if imageMetadata.commentary || imageMetadata.commentary_translation}
            <div class="bg-gray-200 p-4 m-4">
                <div><strong>Artist's commentary</strong></div>
                {#if imageMetadata.commentary}
                    <button
                        on:click={() => (originalComment = true)}
                        class={originalComment ? "font-bold" : ""}
                        >Original</button
                    >
                {/if}
                {#if imageMetadata.commentary && imageMetadata.commentary_translation}
                    <span class="mx-0.5">|</span>
                {/if}
                {#if imageMetadata.commentary_translation}
                    <button
                        on:click={() => (originalComment = false)}
                        class={!originalComment ? "font-bold" : ""}
                        >Translation</button
                    >
                {/if}
                {#if originalComment}
                    <div>{imageMetadata.commentary}</div>
                {:else}
                    <div>{imageMetadata.commentary_translation}</div>
                {/if}
            </div>
        {/if}
    </div>
</div>
{#if edit}
    <form class="flex flex-col flex-1 mx-16 my-4 space-y-6" bind:this={form}>
        <input
            type="text"
            placeholder="Source"
            name="source"
            autocomplete="off"
            value={imageMetadata.source}
        />
        <input
            type="text"
            placeholder="Parent"
            name="parent"
            autocomplete="off"
            value={imageMetadata.parent}
        />
        <textarea
            type="text"
            placeholder="Commentary"
            name="commentary"
            autocomplete="off"
            class="max-h-full resize-none flex-1"
            value={imageMetadata.commentary}
        />
        <textarea
            type="text"
            placeholder="Commentary translation"
            name="commentary_translation"
            autocomplete="off"
            class="max-h-full resize-none flex-1"
            value={imageMetadata.commentary_translation}
        />
        <button
            on:click|preventDefault={async () => {
                await updateImageMetadata(
                    params.snowflake,
                    serializeForm(form)
                );
                getImageMetadataHooks(params.snowflake);
                edit = false;
            }}>Submit</button
        >
    </form>
{/if}
