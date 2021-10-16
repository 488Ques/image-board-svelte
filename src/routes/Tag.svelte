<script>
    import { fetchAPI } from "@/static/js/helper";
    import { paths } from "@/static/js/paths";
    import { user } from "@/stores";

    const tagTypes = [
        "artist",
        "character",
        "copyright",
        "generic",
        "group",
        "meta",
    ];
    let tag = "";
    let tagType = tagTypes[0];
    $: validTag = checkTag(tag);

    function putTag() {
        const options = {
            method: "PUT",
            headers: {
                secret: $user.secret,
            },
        };
        return fetchAPI(paths.TagField(tag), options);
    }
    function patchTagType() {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                secret: $user.secret,
            },
            body: JSON.stringify({ type: tagType }),
        };
        return fetchAPI(paths.TagInfo(tag), options);
    }
    function addTag() {
        putTag()
            .then(() => patchTagType())
            .finally(() => {
                tag = "";
                tagType = tagTypes[0];
            });
    }
    function checkTag(tag) {
        const regex = /^[a-z0-9()_-]*$/g;
        return !tag.match(regex) || tag.length > 128;
    }
</script>

<div class="space-x-4 m-2">
    <input type="text" placeholder="Tag name" bind:value={tag} />
    <select bind:value={tagType}>
        <option disabled>Tag type</option>
        {#each tagTypes as type}
            <option value={type}>{type}</option>
        {/each}
    </select>
    <button on:click={addTag} disabled={validTag} class="disabled:opacity-50"
        >Add</button
    >
</div>
{#if validTag}
    <div>No space or capital letter in tag name allowed.</div>
{/if}
