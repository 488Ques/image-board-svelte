<script>
    import { fetchAPI } from "@/static/js/helper";
    import { paths } from "@/static/js/paths";
    import { user } from "@/stores";

    let imageUpload;
    let previews = [];
    let forms = [];
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
    async function postImages() {
        let formData = new FormData();
        let i = 0;
        for (const file of imageUpload.files) {
            formData.set("image", file);
            const imageMetadata = await post1Image(formData);
            updateImageMetadata(
                imageMetadata.snowflake,
                serializeForm(forms[i])
            );
            i++;
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
    // Serialize image metada fields into JSON string that can be sent to API endpoints
    function serializeForm(form) {
        return JSON.stringify(Object.fromEntries(new FormData(form)));
    }
    function updateImageMetadata(snowflake, metadata) {
        const options = {
            method: "PATCH",
            headers: {
                secret: $user.secret,
            },
            body: metadata,
        };
        fetchAPI(paths.ImageField(snowflake), options);
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
    {#each previews as preview, i}
        <div class="flex flex-row space-x-6 m-4">
            <form class="flex flex-col flex-1 space-y-6" bind:this={forms[i]}>
                <input
                    type="text"
                    placeholder="Source"
                    name="source"
                    autocomplete="off"
                />
                <input
                    type="text"
                    placeholder="Parent"
                    name="parent"
                    autocomplete="off"
                />
                <textarea
                    type="text"
                    placeholder="Commentary"
                    name="commentary"
                    autocomplete="off"
                    class="max-h-full resize-none flex-1"
                />
                <textarea
                    type="text"
                    placeholder="Commentary translation"
                    name="commentary_translation"
                    autocomplete="off"
                    class="max-h-full resize-none flex-1"
                />
            </form>
            <img src={preview} alt="" class="max-w-xs" />
        </div>
    {/each}
</main>
