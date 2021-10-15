<script>
    import { fetchAPI } from "@/static/js/helper";
    import { paths } from "@/static/js/paths";
    import { user } from "@/stores";

    let imageUpload;
    let previews = [];

    const acceptedTypes = ["image/png", "image/jpeg", "image/gif"];

    function validImageTypes(file) {
        return acceptedTypes.includes(file.type);
    }

    function updatePreviews() {
        previews = [];
        for (const file of imageUpload.files) {
            if (validImageTypes(file)) {
                previews = [...previews, URL.createObjectURL(file)];
            }
        }
    }

    function postImages() {
        let formData = new FormData();
        for (const file of imageUpload.files) {
            formData.set("image", file);
            post1Image(formData);
        }
        imageUpload.value = null;
        previews = [];
    }

    async function post1Image(formData) {
        const options = {
            method: "POST",
            headers: {
                secret: $user.secret,
            },
            body: formData,
        };
        const imageMetadata = await fetchAPI(paths.Image, options);
        return imageMetadata;
    }
</script>

<main class="flex flex-col items-center mx-auto max-w-4xl">
    <div>
        <input
            type="file"
            accept={acceptedTypes.join(",")}
            multiple
            bind:this={imageUpload}
            on:change={updatePreviews}
        />
        <button on:click={postImages}>Submit</button>
    </div>

    {#each previews as preview}
        <img src={preview} alt="" class="max-w-md" />
    {/each}
</main>
