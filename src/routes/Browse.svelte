<script>
    import { onMount } from "svelte";
    import { paths } from "@/static/js/paths";
    import { fetchAPI, getQueryValue } from "@/static/js/helper";
    import ImageList from "@/lib/ImageList.svelte";
    import PaginationBar from "@/lib/PaginationBar.svelte";
    import { querystring } from "svelte-spa-router";

    let pageSnowflakes = [];
    let currentPage;
    let lastPage;
    $: if ($querystring !== "")
        currentPage = parseInt(getQueryValue($querystring, "p"));
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

<svelte:head>
    <title>Browse</title>
</svelte:head>

<PaginationBar bind:currentPage bind:lastPage />
<ImageList snowflakes={pageSnowflakes} />
<PaginationBar bind:currentPage bind:lastPage />
