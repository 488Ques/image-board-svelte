<script>
    import { onMount } from "svelte";
    import { paths } from "@/static/js/paths";
    import { fetchAPI } from "@/static/js/helper";
    import ImageList from "@/lib/ImageList.svelte";
    import PaginationBar from "@/lib/PaginationBar.svelte";

    let pageSnowflakes = [];
    let currentPage = 1;
    let lastPage = 1;
    $: getPageSnowflakes(currentPage - 1).then(
        (snowflakes) => (pageSnowflakes = snowflakes || [])
    );

    async function getPageSnowflakes(pageNumber) {
        return await fetchAPI(paths.ImagePageField(pageNumber));
    }
    async function getTotalPages() {
        return await fetchAPI(paths.ImagePage);
    }

    onMount(async () => {
        lastPage = await getTotalPages();
    });
</script>

<PaginationBar bind:currentPage {lastPage} />
<ImageList snowflakes={pageSnowflakes} />
<PaginationBar bind:currentPage {lastPage} />
