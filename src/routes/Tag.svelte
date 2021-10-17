<script>
    import ImageList from "@/lib/ImageList.svelte";
    import { fetchAPI, getQueryValue } from "@/static/js/helper";
    import { paths } from "@/static/js/paths";
    import { user } from "@/stores";
    import { push, querystring } from "svelte-spa-router";

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
    let searchTags = "";
    $: queryValue = getQueryValue($querystring, "search") || "";
    let searchSnowflakes = [];
    $: if (queryValue.length > 0)
        searchImagesByTags(queryValue).then(
            (result) => (searchSnowflakes = result)
        );

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
    async function searchImagesByTags(searchTags) {
        return (
            (await fetchAPI(paths.SearchField(parseSearchTags(searchTags)))) ||
            []
        );
    }
    function parseSearchTags(searchTags) {
        return searchTags.split(" ").join("!");
    }
    function pushSearchTags() {
        push(`#/tag?search=${parseSearchTags(searchTags)}`);
    }
</script>

<section class="m-2 space-y-4">
    <div class="space-x-4">
        <input type="text" placeholder="Tag name" bind:value={tag} />
        <select bind:value={tagType}>
            <option disabled>Tag type</option>
            {#each tagTypes as type}
                <option value={type}>{type}</option>
            {/each}
        </select>
        <button
            on:click={addTag}
            disabled={validTag}
            class="disabled:opacity-50">Add</button
        >
        {#if validTag}
            <div>No space or capital letter in tag name allowed.</div>
        {/if}
    </div>

    <div class="space-x-4">
        <input type="text" placeholder="Search tag" bind:value={searchTags} />
        <button
            disabled={searchTags === ""}
            class="disabled:opacity-50"
            on:click={pushSearchTags}>Search</button
        >
        <div>Delimit tags by space to search multiple</div>
    </div>
</section>
<ImageList snowflakes={searchSnowflakes} />
