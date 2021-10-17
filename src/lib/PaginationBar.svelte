<script>
    import { push } from "svelte-spa-router";

    export let currentPage = 1;
    export let lastPage = 1;
    $: pushPageNumber(currentPage);

    function pagePrompt() {
        try {
            let promptedPage = parseInt(prompt("Enter page number"));
            if (
                promptedPage >= 1 &&
                promptedPage <= lastPage &&
                promptedPage !== NaN
            ) {
                currentPage = promptedPage;
            } else {
                throw new Error("Invalid page number!");
            }
        } catch (error) {
            alert(error);
        }
    }
    function pushPageNumber(currentPage) {
        push(`#/browse?p=${currentPage}`);
    }
</script>

<nav class="flex justify-center">
    <ul class="flex space-x-4">
        {#if currentPage > 2}
            <li><button on:click={() => (currentPage = 1)}>1</button></li>
        {/if}
        {#if currentPage > 3}
            <li><button on:click={pagePrompt}>...</button></li>
        {/if}
        {#if currentPage > 1}
            <li>
                <button on:click={() => currentPage--}>{currentPage - 1}</button
                >
            </li>
        {/if}
        <li><strong>{currentPage}</strong></li>
        {#if lastPage - currentPage > 1}
            <li>
                <button on:click={() => currentPage++}>{currentPage + 1}</button
                >
            </li>
        {/if}
        {#if lastPage - currentPage > 2}
            <li><button on:click={pagePrompt}>...</button></li>
        {/if}
        {#if lastPage > currentPage}
            <li>
                <button on:click={() => (currentPage = lastPage)}
                    >{lastPage}</button
                >
            </li>
        {/if}
    </ul>
</nav>
