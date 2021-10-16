<script>
    import { fetchAPI } from "@/static/js/helper";
    import { paths } from "@/static/js/paths";
    import { onMount } from "svelte";

    export let params = {};
    let imageMetadata = {};

    async function getImageMetadata() {
        return await fetchAPI(paths.ImageField(params.snowflake));
    }

    onMount(async () => {
        imageMetadata = await getImageMetadata();
    });
</script>

<div class="flex flex-row space-x-12">
    <ul class="pl-2">
        <li><strong>Snowflake: </strong> {imageMetadata.snowflake}</li>
        <li><strong>Source: </strong> {imageMetadata.source}</li>
        <li><strong>Image type: </strong> {imageMetadata.type}</li>
        <li><strong>Uploaded by: </strong> {imageMetadata.user}</li>
    </ul>
    <img src={paths.ImageFile(params.snowflake)} alt="" class="max-w-2xl" />
</div>
