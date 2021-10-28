<script>
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    let tips = [
        "When searching images by tags, delimit each tag by a whitespace to match them inclusively",
        "Good luck!",
        "Stay strong!",
        "A page includes at maximum 63 images",
    ];
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<div class="min-h-screen flex justify-center items-center text-2xl">
    <strong class="mr-2">Tip:</strong>
    {tips[getRandomInt(tips.length)]}
</div>
