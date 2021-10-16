import Home from '@/routes/Home.svelte';
import Upload from '@/routes/Upload.svelte';
import ImagePost from '@/routes/ImagePost.svelte';

export default {
    '/': Home,
    '/upload': Upload,
    '/image/:snowflake': ImagePost,
}