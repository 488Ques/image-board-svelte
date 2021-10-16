import Home from '@/routes/Home.svelte';
import Upload from '@/routes/Upload.svelte';
import ImagePost from '@/routes/ImagePost.svelte';
import Tag from '@/routes/Tag.svelte';

export default {
    '/': Home,
    '/upload': Upload,
    '/image/:snowflake': ImagePost,
    '/tag': Tag,
}